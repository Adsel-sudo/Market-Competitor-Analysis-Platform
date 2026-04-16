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
      tasks.py          # 任务相关接口
    schemas/
      task.py           # Pydantic 请求/响应模型
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


## 测试与验证方法（当前代码）

当前仓库还没有内置 `pytest` 等自动化测试用例（`backend/requirements.txt` 中也未包含测试依赖），因此建议采用「启动服务 + 接口回归」的方式进行验证。以下命令为 Windows PowerShell 友好写法。

### 1) 基础运行检查

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python app/init_db.py
uvicorn app.main:app --reload
```

预期：
- 服务正常启动且无导入错误
- SQLite 本地库可连接并成功建表（`test.db`）

### 2) 健康检查

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/health" -Method Get
```

预期返回：

```json
{"status":"ok"}
```

### 3) 任务创建接口（POST /api/tasks）

```powershell
$body = @{
  title = "竞品监测任务-示例"
  task_type = "competitor_analysis"
  inputs = @(
    @{ input_type = "keyword"; input_value = "AI 编程" }
    @{ input_type = "url"; input_value = "https://example.com" }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

预期：
- HTTP `201`
- 返回 `id` 和 `status`（通常为 `created`）

### 4) 任务详情接口（GET /api/tasks/{task_id}）

将上一步返回的 `id` 代入：

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks/1" -Method Get
```

预期：
- HTTP `200`
- 返回任务基础信息与 `inputs` 列表

### 5) 文件上传接口（POST /api/tasks/{task_id}/upload）

```powershell
curl.exe -X POST "http://127.0.0.1:8000/api/tasks/1/upload" `
  -F "file=@C:\absolute\path\to\sample.xlsx"
```

预期：
- HTTP `200`
- 返回 `file_id`、`file_name`、`parse_status`
- 物理文件保存到 `backend/uploads/<task_id>/` 下

### 6) 负向用例建议

可额外验证以下错误场景：
- 上传非 `.xlsx` 文件，应返回 `400`
- 上传到不存在的 `task_id`，应返回 `404`
- 查询不存在的任务详情，应返回 `404`
- 创建任务时 `inputs` 为空，应触发请求参数校验错误（`422`）

### 7) 下一步自动化测试建议

当前阶段建议后续补充：
- `pytest` + `fastapi.testclient` / `httpx` 的 API 集成测试
- 对数据库访问层进行事务回滚隔离测试
- 将上述核心与负向用例纳入 CI 执行

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
