from app import create_app
from dotenv import load_dotenv

load_dotenv()  # 加载 .env 文件中的环境变量

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)