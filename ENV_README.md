# 环境变量配置说明

## 📋 环境变量文件

本项目使用以下环境变量文件：

- `.env.local` - 开发环境配置（**不会提交到 Git**）
- `.env.example` - 配置示例文件（**会提交到 Git**）

## 🚀 快速设置

1. **复制示例文件**
   ```bash
   cp .env.example .env.local
   ```

2. **编辑 `.env.local` 文件**
   ```bash
   # 根据你的 MongoDB 设置修改以下配置
   NEXT_PUBLIC_MONGO_URL=mongodb://username:password@localhost:27017/database_name?authSource=admin
   MONGODB_URI=mongodb://username:password@localhost:27017/database_name?authSource=admin
   ```

## 🔧 环境变量说明

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_MONGO_URL` | MongoDB 连接 URL（客户端可访问） | `mongodb://user:pass@localhost:27017/db?authSource=admin` |
| `MONGODB_URI` | MongoDB 连接 URI（服务端） | `mongodb://user:pass@localhost:27017/db?authSource=admin` |
| `MONGO_DB_NAME` | 数据库名称 | `nextjsDB` |
| `MONGO_DB_USER` | 数据库用户名 | `yuexi` |
| `MONGO_DB_PASSWORD` | 数据库密码 | `yuexi` |

## 🐳 Docker MongoDB 配置

如果使用 Docker 运行 MongoDB：

1. **启动 MongoDB 容器**
   ```bash
   cd ../docker
   docker-compose up -d
   ```

2. **使用以下配置**
   ```bash
   NEXT_PUBLIC_MONGO_URL=mongodb://yuexi:yuexi@localhost:27017/nextjsDB?authSource=admin
   MONGODB_URI=mongodb://yuexi:yuexi@localhost:27017/nextjsDB?authSource=admin
   ```

## 🧪 测试环境变量

运行测试脚本检查环境变量是否正确配置：

```bash
node test-env.js
```

## ⚠️ 注意事项

1. **不要提交 `.env.local` 文件** - 它已被 `.gitignore` 排除
2. **NEXT_PUBLIC_ 前缀** - 这些变量可以在客户端访问
3. **其他变量** - 只能在服务器端访问
4. **密码安全** - 不要在代码中硬编码密码

## 🔍 故障排除

如果遇到连接问题：

1. 检查 MongoDB 是否运行
2. 验证用户名和密码
3. 确保数据库名称正确
4. 检查网络连接

```bash
# 测试 MongoDB 连接
mongosh "mongodb://yuexi:yuexi@localhost:27017/nextjsDB?authSource=admin"
```
