# Market Competitor Analysis Platform (MVP)

本项目是一个**市场/竞品数据分析平台**的本地 MVP（最小可行版本），当前目标是快速验证“任务创建 + 数据入库 + 基础接口”链路。后续将逐步补齐容器化部署与服务器运行能力。

## 当前阶段

- 阶段：本地 MVP 验证
- 运行方式：本地 Python + FastAPI
- 数据库：SQLite（本地开发默认）/ PostgreSQL（生产环境）
- 后续规划：Docker 化、迁移到服务器、补齐任务执行和报表能力

## 技术栈

- FastAPI
- SQLAlchemy（同步）
- SQLite（本地开发验证）+ PostgreSQL（生产）
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
      tasks.py          # 任务创建/详情接口
      uploads.py        # 文件上传与解析接口
    schemas/
      task.py           # Pydantic 请求/响应模型
    services/
      parser_sellersprite_bsr.py  # 卖家精灵 BSR Excel 解析
      competitor_service.py       # 竞品快照批量入库
    main.py             # FastAPI 应用入口
  requirements.txt
```

## 快速开始（本地）

> 说明：以下命令适用于本地开发环境。当前仓库处于 MVP 阶段，建议优先保证“可运行”。

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
# 默认使用 SQLite（sqlite:///./test.db）做本地验证
# 生产环境请改为 PostgreSQL DATABASE_URL 或 DB_* 参数
```

4. 启动服务

```powershell
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
- `DATABASE_URL`（本地默认 SQLite；生产建议 PostgreSQL）
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

> 注意：SQLite 仅用于本地开发验证与快速联调，不作为生产数据库。生产环境仍使用 PostgreSQL。

## 已有能力（MVP）

- 创建分析任务（`analysis_task`）
- 写入任务输入（`task_input`）
- 支持任务输入类型：`asin` / `product_url` / `keyword` / `bsr_url` / `shop_url`
- 上传 `.xlsx` 文件并写入 `imported_file`
- 文件名包含 `BSR` 时，同步解析 Excel 并批量写入 `competitor_snapshot`
- 基础健康检查

## BSR 上传解析说明

- 上传接口：`POST /api/tasks/{task_id}/upload`
- 文件名包含 `BSR`（大小写不敏感）时：
  1. 解析第一个有效 sheet（必须包含 `asin` 和 `title` 列，支持中英文列名）
  2. 自动清洗数值字段（price/rating/review_count）
  3. 批量写入 `competitor_snapshot`（`asin` 为空会跳过）
  4. 更新 `imported_file.parse_status` 为 `parsed`；解析失败则为 `failed`

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
