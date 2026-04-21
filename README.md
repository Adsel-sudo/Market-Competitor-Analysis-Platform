# Market Competitor Analysis Platform (MVP)

本项目是一个面向内部研发联调的**市场/竞品分析平台 MVP（最小可行版本）**。
当前重点是打通“任务创建 → 文件上传 → BSR 解析 → 分析展示”链路。

## 项目现状（MVP）

- 后端：FastAPI + Docker Compose + SQLite
- 前端：Next.js 本地开发模式（`npm run dev`）
- 当前为 MVP：分析结果为 **mock + 部分真实数据（BSR 解析入库）**
- 暂未提供生产级部署方案（后续可扩展 PostgreSQL / 监控 / 网关）

## 当前功能进度

- ✅ 前端：已支持竞品分析详情页（`/competitor-analysis/[id]`，含 API 请求 + 本地 fallback）
- ✅ 前端：已支持数据准备页（`/data-prep`）一体化纵向步骤流（页面主滚动、Step rail 与内容卡片同流）
- ✅ 后端：已支持任务创建（`/api/tasks`）
- ✅ 后端：已支持文件上传 + BSR 解析（`/api/tasks/{task_id}/upload`）
- ✅ 后端：已支持竞品分析 mock 接口（`/api/competitor-analysis/{task_id}`）

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

## 开发环境启动方式

### 1) 后端（Docker Compose）

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

3. 停止服务

```powershell
docker compose down
```

### 2) 前端（Next.js 本地运行）

> 说明：当前 Docker Compose 仅包含后端服务，前端使用本地 Node 环境启动。

```powershell
cd frontend
npm install
npm run dev
```

建议新增 `frontend/.env.local`：

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```


## Tailwind 样式规范（`@apply` 与毛玻璃）

1. `@apply` 中**禁止**使用 slash opacity 写法：如 `bg-white/72`、`text-black/80`、`border-white/20`。  
2. `@apply` 中**禁止**使用任意值颜色表达式：如 `text-[color:var(--text-primary)]`、`bg-[rgba(...)]`。  
3. `@apply` 中**禁止**引用自定义类名（仅允许 Tailwind 官方 utility）；例如不要 `@apply text-primary`。  
4. 透明背景请改用原生 CSS：`background-color: rgba(...)`；边框透明度用 `border-color: rgba(...)`。  
5. 文本透明度/主题色优先用 CSS 变量：`color: var(--text-primary)`；避免在 `@apply` 中混入复杂颜色逻辑。  
6. 毛玻璃建议采用“分层写法”：`@apply ... backdrop-blur-*` + `background-color: rgba(...)` + `box-shadow`。  
7. 基础组件类按语义收敛到 `@layer components`：如 `.btn-*`、`.glass-card`、`.surface-card`、`.ui-input`。  
8. 组件类职责拆分：`@apply` 负责布局/间距/圆角/排版，原生 CSS 负责颜色、渐变、透明度与阴影。  
9. 新增基础样式前，先复用现有组件类；确需新增时保持命名统一（`btn-` / `ui-` / `*-card`）。

## 访问地址说明

- 前端首页：`http://localhost:3000`
- 数据准备页：`http://localhost:3000/data-prep`
- 竞品分析页：`http://localhost:3000/competitor-analysis/demo`
- 后端 API：`http://127.0.0.1:8000`
- Swagger：`http://127.0.0.1:8000/docs`

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
