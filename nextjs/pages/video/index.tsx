import { useState } from 'react';
import { Button, Input, Typography, Form, Col, Row, Card } from 'antd';
import Upload from './components/upload';
import { map } from 'lodash';
import axios from 'axios'; // 导入 axios

const { Title } = Typography;

export default function Page() {
  const [form] = Form.useForm();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const { fileList, text, image_type } = await form.validateFields();
    setLoading(true);
    const files = map(fileList, (file) => file.originFileObj); // 获取原始文件对象
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file); // 添加文件到 FormData
    });
    formData.append('text', text); // 添加文本字段到 FormData
    formData.append('image_type', image_type);
    try {
      const response = await axios.post('/api/generate_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 设置请求头
        },
        responseType: 'blob', // 设置响应类型为 blob
      });

      // 创建一个 URL 对象��指向返回的 blob
      const videoUrl = URL.createObjectURL(response.data);
      setVideoUrl(videoUrl); // 设置视频 URL
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={16} className='page-container'>
      <Col span={12}>
        <Card title='生成视频' bordered={true} style={{ height: '100%' }}>
          <Form form={form} layout='vertical'>
            <Form.Item name='fileList' label='上传图片' required rules={[{ required: true, message: '请上传图片' }]}>
              <Upload />
            </Form.Item>
            <Form.Item
              name='image_type'
              label='图片匹配格式'
              required
              rules={[{ required: true, message: '图片匹配格式' }]}
              help='例如：image_01.jpg 对应 image_%02d.jpg; image_0001.png 对应 image_%04d.png'
            >
              <Input placeholder='请输入图片匹配格式' />
            </Form.Item>
            <Form.Item name='text' label='添加文字' required rules={[{ required: true, message: '请输入文字' }]}>
              <Input.TextArea placeholder='请输入文字' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={handleSubmit} loading={loading} block>
                生成视频
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={12}>
        <Card title='视频预览' bordered={true} style={{ height: '100%' }}>
          {videoUrl ? (
            <video controls width='100%'>
              <source src={videoUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='flex items-center justify-center h-full p-4'>
              <div className='text-center'>
                <div>视频显示区域</div>
                <div>请先上传图片和添加文字，然后点击生成视频按钮</div>
              </div>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}
