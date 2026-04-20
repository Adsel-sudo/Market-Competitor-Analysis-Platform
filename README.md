# Market Competitor Analysis Platform (MVP)

本项目是一个**市场/竞品分析平台**的内部 MVP（最小可行版本）。
当前阶段重点是**竞品分析模块**，已打通“任务创建 → BSR 文件上传 → 自动解析 → 竞品快照入库”链路。

## 当前阶段

- 阶段：内部工具 MVP 验证阶段
- 重点模块：竞品分析（Competitor Analysis）
- 开发运行方式：
  - 本地 Python + FastAPI
  - Docker Compose（开发环境）
- 当前开发数据库：SQLite（`test.db`）
- 生产规划：后续可切换 PostgreSQL（当前仓库未提供生产级部署方案）

## 当前能力（MVP）

- 创建分析任务（`analysis_task`）
- 写入任务输入（`task_input`）
- 支持任务输入类型：`asin` / `product_url` / `keyword` / `bsr_url` / `shop_url`
- 上传 `.xlsx` 文件并写入 `imported_file`
- 文件名包含 `BSR`（大小写不敏感）时，自动解析 Excel
- 解析后批量写入 `competitor_snapshot`
- 更新 `imported_file.parse_status`（`pending` / `parsed` / `failed`）
- 提供基础健康检查接口

## 技术栈

- FastAPI
- SQLAlchemy（同步）
- Pydantic / pydantic-settings
- Uvicorn
- 数据库策略：
  - **开发环境：SQLite（当前默认，便于快速联调）**
  - **生产环境：后续可切 PostgreSQL**

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
      tasks.py          # 任务创建/详情接口
      uploads.py        # 文件上传与解析接口
    schemas/
      task.py           # Pydantic 请求/响应模型
    services/
      parser_sellersprite_bsr.py  # 卖家精灵 BSR Excel 解析
      competitor_service.py       # 竞品快照批量入库
    main.py             # FastAPI 应用入口
  requirements.txt
  Dockerfile
  .dockerignore

docker-compose.yml      # 开发环境编排（仅 backend）
```

## Docker 开发启动方式（推荐）

> 说明：当前 Docker 配置仅用于**本地开发与联调**，用于提升启动一致性与热更新体验。  
> **这不是生产部署方案**（未包含生产级进程管理、安全加固、反向代理、监控等）。

1. 准备环境变量

```powershell
Copy-Item backend/.env.example backend/.env
```

2. 启动开发环境

```powershell
docker compose up --build
```

3. 访问服务

- API: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`
- 健康检查：`GET /health`

4. 停止服务

```powershell
docker compose down
```

### Compose 挂载说明（开发用途）

- `./backend:/app`：挂载源码，支持 `uvicorn --reload` 热更新
- `api_uploads:/app/uploads`：持久化上传文件，避免容器重建后丢失
- `api_sqlite_data:/app/data`：持久化 SQLite 数据目录，数据库文件位于 `/app/data/test.db`

## 本地 Python 启动方式

1. 创建并激活虚拟环境

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. 安装依赖

```powershell
pip install -r requirements.txt
```

3. 准备环境变量

```powershell
Copy-Item .env.example .env
# 默认使用 SQLite（sqlite:///./test.db）
# 生产环境可后续切换 PostgreSQL
```

4. 启动服务

```powershell
uvicorn app.main:app --reload
```

5. 访问接口

- 健康检查：`GET /health`
- 创建任务：`POST /api/tasks`
- 上传 BSR Excel：`POST /api/tasks/{task_id}/upload`
- Swagger 文档：`/docs`

## 环境变量

`backend/.env.example` 中提供了基础配置项：

- `APP_NAME`
- `DEBUG`
- `DATABASE_URL`（当前开发默认 SQLite）
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

## BSR 上传解析说明

- 上传接口：`POST /api/tasks/{task_id}/upload`
- 文件名包含 `BSR`（大小写不敏感）时：
  1. 解析第一个有效 sheet（必须包含 `asin` 和 `title` 列，支持中英文列名）
  2. 自动清洗数值字段（price / rating / review_count）
  3. 批量写入 `competitor_snapshot`（`asin` 为空会跳过）
  4. 更新 `imported_file.parse_status`

## 下一步（MVP 后续）

1. 增加 Alembic 管理数据库迁移
2. 增加单元测试 / API 集成测试（如 `pytest + httpx`）
3. 增加任务处理链路（抓取/清洗/分析）与状态流转
4. 补充报表与可视化能力
5. 规划生产环境部署（PostgreSQL、反向代理、监控与日志）
