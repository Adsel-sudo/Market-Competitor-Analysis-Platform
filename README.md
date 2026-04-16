# Market Competitor Analysis Platform (MVP)

本项目是一个**市场/竞品数据分析平台**的本地 MVP（最小可行版本），当前目标是快速验证“任务创建 + 数据入库 + 基础接口”链路。后续将逐步补齐容器化部署与服务器运行能力。

## 当前阶段

- 阶段：本地 MVP 验证
- 运行方式：本地 Python + FastAPI
- 数据库：PostgreSQL（通过 `.env` 配置）
- 后续规划：Docker 化、迁移到服务器、补齐任务执行和报表能力

## 技术栈

- FastAPI
- SQLAlchemy（同步）
- PostgreSQL（`psycopg2-binary`）
- Pydantic / pydantic-settings
- Uvicorn

## 目录结构

```text
backend/
  app/
    core/
      config.py         # 配置读取（.env）
      db.py             # engine / session / Base / create_all
    models/
      task_models.py    # ORM 模型（任务、输入、文件、快照、结果）
    routers/
      tasks.py          # 任务相关接口
    schemas/
      task.py           # Pydantic 请求/响应模型
    main.py             # FastAPI 应用入口
  requirements.txt
```

## 快速开始（本地）

> 说明：以下命令适用于本地开发环境。当前仓库处于 MVP 阶段，建议优先保证“可运行”。

1. 创建并激活虚拟环境

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
```

2. 安装依赖

```bash
pip install -r requirements.txt
```

3. 准备环境变量

```bash
cp .env.example .env
# 按本地 PostgreSQL 实际配置修改 .env
```

4. 启动服务

```bash
uvicorn app.main:app --reload
```

5. 访问接口

- 健康检查：`GET /health`
- 创建任务：`POST /api/tasks`
- Swagger 文档：`/docs`

## 环境变量

`backend/.env.example` 中提供了基础配置项：

- `APP_NAME`
- `DEBUG`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

## 已有能力（MVP）

- 创建分析任务（`analysis_task`）
- 写入任务输入（`task_input`）
- 基础健康检查

## 下一步建议（面向容器化与服务器迁移）

1. 增加 `Dockerfile` 和 `docker-compose.yml`（应用 + PostgreSQL）
2. 引入 Alembic 管理数据库迁移
3. 增加单元测试 / API 集成测试（如 `pytest + httpx`）
4. 增加任务处理链路（抓取/清洗/分析）与状态流转
5. 统一日志格式并接入集中式日志系统

---

如果你希望，我下一步可以直接为这个仓库补一版：
- `Dockerfile`
- `docker-compose.yml`
- Alembic 初始化脚手架
- 基础 CI（lint + test）
