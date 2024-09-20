from flask import Blueprint, jsonify, request, Response
import os
import subprocess
import dashscope
from dashscope.audio.tts_v2 import *
import glob  # 导入 glob 模块

main = Blueprint('main', __name__)

upload_folder = 'uploads'
output_folder = 'output'

@main.route('/data')
def get_data():
    return jsonify({"message": "This is some data from the server"})

@main.route('/generate_video', methods=['POST'])
def generate_video():
    if 'files' not in request.files:
        return jsonify({"error": "No files uploaded."}), 400

    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "No files uploaded."}), 400
    # 保存上传的文件
    os.makedirs(upload_folder, exist_ok=True)
    for file in files:
        file.save(os.path.join(upload_folder, file.filename))

    # 生成视频的输出路径
    os.makedirs(output_folder, exist_ok=True)  # 确保输出目录存在
    output_video_path = os.path.join(output_folder, 'video.mp4')
    output_audio_path = os.path.join(output_folder, 'audio.mp3')

     # 获取文本字段
    dashscope.api_key = os.environ.get("API_KEY")  # 从环境变量中获取 API 密钥
    text = request.form.get('text', '')
    synthesizer = SpeechSynthesizer(model=os.environ.get('MODEL'), voice=os.environ.get('VOICE'))
    audio = synthesizer.call(text)
    with open(output_audio_path, 'wb') as f:
        f.write(audio)


    image_type = request.form.get('image_type')
    # FFmpeg 命令
    ffmpeg_command = [
        'ffmpeg',
        '-framerate', '1',
        # TODO:
        '-i', os.path.join(upload_folder, image_type),  # 使用格式化的文件名
        '-i', output_audio_path,
        '-c:v', 'libx264',
        '-r', '30',
        '-pix_fmt', 'yuv420p',
        '-shortest',  # 确保视频在最短的输入文件结束时停止
        output_video_path,
        '-y'  # 强制覆盖输出文件
    ]

    # 执行 FFmpeg 命令
    try:
        subprocess.run(ffmpeg_command, check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error generating video: {str(e)}"}), 500
    # 检查视频文件是否存在
    if not os.path.exists(output_video_path):
        return jsonify({"error": "Video file was not created."}), 500

    # 删除上传的图片
    for file in files:
        os.remove(os.path.join(upload_folder, file.filename))

    # 获取文件大小
    file_size = os.path.getsize(output_video_path)

    # 定义一个生成器函数来流式传输文件
    def generate():
        with open(output_video_path, "rb") as video_file:
            data = video_file.read(1024)
            while data:
                yield data
                data = video_file.read(1024)

    # 返回流式响应
    return Response(
        generate(),
        mimetype="video/mp4",
        content_type="video/mp4",
        headers={
            "Content-Disposition": "attachment; filename=video.mp4",
            "Content-Length": str(file_size),
        }
    )