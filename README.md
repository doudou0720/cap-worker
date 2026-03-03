# CAP Worker Service | CAP 验证码服务

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xyTom/cap-worker)

[English](#english) | [中文](#中文)

---

## English

CAP Worker is a next-generation CAPTCHA service powered by Cloudflare Workers, utilizing SHA-256 Proof of Work (PoW) algorithms for robust bot protection.

### 🚀 Features

- **Ultra Performance**: Edge-deployed across 250+ cities worldwide with sub-100ms response times
- **Proof of Work**: SHA-256 PoW algorithm for computational challenge verification
- **Developer First**: RESTful API design with comprehensive SDKs
- **Global CDN**: Built on Cloudflare's edge infrastructure
- **Privacy Focused**: No tracking, no data collection
- **Easy Integration**: 5-minute setup with minimal code changes

### 🏗️ Architecture Design

CAP Worker leverages Cloudflare's cutting-edge infrastructure to deliver a robust and scalable CAPTCHA solution:

#### Distributed Architecture

- **Durable Objects (DO)**: Challenge state management with strong consistency guarantees
- **Edge Workers**: Computational verification distributed across 250+ global locations
- **Automatic Scaling**: Seamless horizontal scaling based on traffic demand

#### Performance & Concurrency

- **Conflict Prevention**: Durable Objects ensure atomic operations and prevent race conditions
- **Load Distribution**: Multiple Worker instances handle verification workload in parallel
- **Zero Cold Start**: Edge-optimized deployment minimizes latency spikes

#### Proof of Work Pipeline

1. **Challenge Generation**: Cryptographically secure challenges created via Durable Objects
2. **Distributed Verification**: SHA-256 PoW computation handled by auto-scaling Workers
3. **State Synchronization**: Challenge lifecycle managed with strong consistency

### 🌐 Live Demo

Visit [https://captcha.gurl.eu.org/](https://captcha.gurl.eu.org/) to see CAP Worker in action and explore the interactive documentation.

### 📦 Quick Start

#### 1. Installation

Add the CAP Worker script to your HTML:

```html
<script src="https://captcha.gurl.eu.org/cap.min.js"></script>
```

#### 2. HTML Setup

Add the CAPTCHA widget to your form:

```html
<cap-widget id="cap" data-cap-api-endpoint="https://captcha.gurl.eu.org/api/"> </cap-widget>
```

#### 3. JavaScript Integration

Handle CAPTCHA events:

```javascript
const widget = document.querySelector("#cap");

widget.addEventListener("solve", async function (e) {
	const token = e.detail.token;

	// Validate the token server-side
	const result = await fetch("https://captcha.gurl.eu.org/api/validate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: token,
			keepToken: false,
		}),
	});

	const validation = await result.json();
	if (validation.success) {
		// CAPTCHA verified successfully
		console.log("CAPTCHA solved!");
	}
});
```

#### 4. Server-side Validation

Example Node.js server-side validation:

```javascript
app.post("/protected-endpoint", async (req, res) => {
	const { captchaToken } = req.body;

	try {
		const validation = await fetch("https://captcha.gurl.eu.org/api/validate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				token: captchaToken,
				keepToken: false,
			}),
		});

		const result = await validation.json();

		if (result.success) {
			// CAPTCHA verified, proceed with protected operation
			res.json({ message: "Access granted" });
		} else {
			res.status(400).json({ error: "CAPTCHA verification failed" });
		}
	} catch (error) {
		res.status(500).json({ error: "Validation error" });
	}
});
```

### 🔌 API Reference

#### Generate Challenge

```http
POST /api/challenge
Content-Type: application/json
```

**Response:**

```json
{
	"token": "785975238a3c4f0c1b0c39ed75e6e4cc152436cc0d94363de6",
	"challenge": "{ \"c\": 50, \"s\": 32, \"d\": 4 }",
	"expires": 1753924498818
}
```

#### Verify Solution

```http
POST /api/redeem
Content-Type: application/json

{
  "token": "c6bd7fd0bea728b5405f0e3637dca6d1b88aaf33589809a103",
  "solutions": [1, 3, 7]
}
```

**Response:**

```json
{
	"success": true,
	"token": "785975238a3c4f0c1b0c39:ed75e6e4cc152436cc0d94363de6"
}
```

#### Validate Token

```http
POST /api/validate
Content-Type: application/json

{
  "token": "785975238a3c4f0c1b0c39:ed75e6e4cc152436cc0d94363de6",
  "keepToken": false
}
```

**Response:**

```json
{
	"success": true
}
```

### 🛠️ Development Setup

#### Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/cap-worker.git
cd cap-worker
```

2. Install dependencies:

```bash
npm install
```

3. Configure Wrangler:

```bash
wrangler auth login
```

4. Start development server:

```bash
npm run dev
```

#### Scripts

- `npm run dev` - Start development server
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run start` - Alias for dev
- `npm run cf-typegen` - Generate TypeScript types

### 🚀 Deployment

1. Update `wrangler.jsonc` with your domain:

```json
{
	"route": "your-domain.com/*"
}
```

2. Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### 📁 Project Structure

```
cap-worker/
├── src/
│   └── index.ts          # Main Worker script
├── public/
│   └── index.html        # Documentation site
├── package.json          # Dependencies and scripts
├── wrangler.jsonc        # Cloudflare Workers config
├── tsconfig.json         # TypeScript config
└── README.md            # This file
```

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### 📄 License

This project is licensed under the MIT License.

### 🔗 Links

- [Live Demo](https://captcha.gurl.eu.org/)
- [Documentation](https://captcha.gurl.eu.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [@cap.js/server](https://www.npmjs.com/package/@cap.js/server)

---

## 中文

CAP Worker 是基于 Cloudflare Workers 构建的下一代验证码服务，采用 SHA-256 工作量证明算法提供强大的机器人防护能力。

### 🚀 功能特性

- **超高性能**: 在全球 250+ 个城市边缘部署，响应时间低于 100ms
- **工作量证明**: 采用 SHA-256 PoW 算法进行计算挑战验证
- **开发者友好**: RESTful API 设计，提供完整的 SDK
- **全球 CDN**: 基于 Cloudflare 边缘基础设施构建
- **隐私优先**: 无跟踪，无数据收集
- **简易集成**: 5 分钟设置，代码改动最少

### 🏗️ 系统架构设计

CAP Worker 基于 Cloudflare 尖端基础设施，提供稳健且可扩展的验证码解决方案：

#### 分布式架构

- **持久化对象 (DO)**: 挑战状态管理，具备强一致性保证
- **边缘 Workers**: 计算验证分布在全球 250+ 个位置
- **自动扩缩容**: 根据流量需求无缝水平扩展

#### 性能与并发控制

- **冲突防护**: 持久化对象确保原子操作，防止竞态条件
- **负载分发**: 多个 Worker 实例并行处理验证工作负载
- **零冷启动**: 边缘优化部署，最小化延迟峰值

#### 工作量证明流水线

1. **挑战生成**: 通过持久化对象创建密码学安全的挑战
2. **分布式验证**: 自动扩展的 Workers 处理 SHA-256 PoW 计算
3. **状态同步**: 通过强一致性管理挑战生命周期

### 🌐 在线演示

访问 [https://captcha.gurl.eu.org/](https://captcha.gurl.eu.org/) 体验 CAP Worker 并查看交互式文档。

### 📦 快速开始

#### 1. 安装

在您的 HTML 中添加 CAP Worker 脚本：

```html
<script src="https://captcha.gurl.eu.org/cap.min.js"></script>
```

#### 2. HTML 设置

在表单中添加验证码组件：

```html
<cap-widget id="cap" data-cap-api-endpoint="https://captcha.gurl.eu.org/api/"> </cap-widget>
```

#### 3. JavaScript 集成

处理验证码事件：

```javascript
const widget = document.querySelector("#cap");

widget.addEventListener("solve", async function (e) {
	const token = e.detail.token;

	// 服务端验证令牌
	const result = await fetch("https://captcha.gurl.eu.org/api/validate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: token,
			keepToken: false,
		}),
	});

	const validation = await result.json();
	if (validation.success) {
		// 验证码验证成功
		console.log("验证码通过！");
	}
});
```

#### 4. 服务端验证

Node.js 服务端验证示例：

```javascript
app.post("/protected-endpoint", async (req, res) => {
	const { captchaToken } = req.body;

	try {
		const validation = await fetch("https://captcha.gurl.eu.org/api/validate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				token: captchaToken,
				keepToken: false,
			}),
		});

		const result = await validation.json();

		if (result.success) {
			// 验证码通过，执行受保护的操作
			res.json({ message: "访问授权" });
		} else {
			res.status(400).json({ error: "验证码验证失败" });
		}
	} catch (error) {
		res.status(500).json({ error: "验证错误" });
	}
});
```

### 🔌 API 参考

#### 生成挑战

```http
POST /api/challenge
Content-Type: application/json
```

**响应:**

```json
{
	"token": "785975238a3c4f0c1b0c39ed75e6e4cc152436cc0d94363de6",
	"challenge": "{ \"c\": 50, \"s\": 32, \"d\": 4 }",
	"expires": 1753924498818
}
```

#### 验证解答

```http
POST /api/redeem
Content-Type: application/json

{
  "token": "c6bd7fd0bea728b5405f0e3637dca6d1b88aaf33589809a103",
  "solutions": [1, 3, 7]
}
```

**响应:**

```json
{
	"success": true,
	"token": "785975238a3c4f0c1b0c39:ed75e6e4cc152436cc0d94363de6"
}
```

#### 验证令牌

```http
POST /api/validate
Content-Type: application/json

{
  "token": "785975238a3c4f0c1b0c39:ed75e6e4cc152436cc0d94363de6",
  "keepToken": false
}
```

**响应:**

```json
{
	"success": true
}
```

### 🛠️ 开发设置

#### 环境要求

- Node.js 18+
- Cloudflare 账户
- Wrangler CLI

#### 安装步骤

1. 克隆仓库：

```bash
git clone https://github.com/your-username/cap-worker.git
cd cap-worker
```

2. 安装依赖：

```bash
pnpm install
```

3. 配置 Wrangler：

```bash
wrangler auth login
```

4. 启动开发服务器：

```bash
pnpm run dev
```

#### 脚本命令

- `pnpm run dev` - 启动开发服务器
- `pnpm run deploy` - 部署到 Cloudflare Workers
- `pnpm run start` - dev 命令的别名
- `pnpm run cf-typegen` - 生成 TypeScript 类型

### 🚀 部署

1. 在 `wrangler.jsonc` 中更新您的域名：

```json
{
	"route": "your-domain.com/*"
}
```

2. 部署到 Cloudflare Workers：

```bash
pnpm run deploy
```

### 📁 项目结构

```
cap-worker/
├── src/
│   └── index.ts          # 主 Worker 脚本
├── public/
│   └── index.html        # 文档站点
├── package.json          # 依赖和脚本
├── wrangler.jsonc        # Cloudflare Workers 配置
├── tsconfig.json         # TypeScript 配置
└── README.md            # 本文件
```

### 🤝 贡献

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 提交 Pull Request

### 🔗 相关链接

- [在线演示](https://captcha.gurl.eu.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [@cap.js/server](https://www.npmjs.com/package/@cap.js/server)
- [@cap.js/client](https://www.npmjs.com/package/@cap.js/client)
