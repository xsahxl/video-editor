# 前端项目

```bash
cd nextjs
pnpm install --registry=https://registry.npmmirror.com
pnpm dev
```

# 后端项目

```bash
cd api
# 设置虚拟环境虚拟环境可以帮助您管理项目依赖,避免与系统级Python包冲突。
python -m venv venv

# 激活虚拟环境:
source venv/bin/activate

# 安装依赖包
pip install -r requirements.txt

# 运行项目
python main.py
```
