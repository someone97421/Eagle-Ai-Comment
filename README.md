# Eagle AI Auto Tagging Plugin (AI 智能注释)

![Eagle Plugin](https://img.shields.io/badge/Eagle-Plugin-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green)

一个为 [Eagle 素材管理软件](https://eagle.cool/) 开发的效率插件。它利用大语言模型（LLM）的多模态能力，自动识别图片内容并生成精准的注释/描述，写入 Eagle 的“注释”字段，让素材搜索变得无比轻松。

## ✨ 功能特性 (Features)

* **⚡️ 广泛兼容**：支持 OpenAI 格式的所有 API（如 OpenAI GPT-4o, Claude 3.5, 阿里云通义千问 Qwen-VL, Google Gemini 等）。
* **🖼️ 智能压缩**：内置图片压缩算法，自动将大图压缩至指定尺寸（如 1024px）后再上传，大幅节省 Token 消耗并提升响应速度。
* **🛠️ 高度自定义**：
    * 支持自定义 API Base URL 和 API Key。
    * 可自定义 System Prompt（系统提示词），控制 AI 的输出风格（如“简短关键词”或“详细描述”）。
    * 支持调节 Temperature（创造性）和 Token 上限。
* **🧠 推理模式支持**：适配 o1/o3 等具备推理能力的模型（自动屏蔽不支持的参数）。
* **🔒 数据隐私**：所有配置均存储在本地（LocalStorage），直接与大模型厂商通信，不经过第三方中转服务器。

## 📸 预览 (Preview)

<img width="382" height="505" alt="image" src="https://github.com/user-attachments/assets/6f8b0dfa-4961-4fc7-a4b8-ff2d7e6b49cc" />
<img width="547" height="827" alt="image" src="https://github.com/user-attachments/assets/5bd9597b-b81b-4070-a67d-102d622b6213" />
<img width="756" height="537" alt="image" src="https://github.com/user-attachments/assets/d41379e6-10f7-4f66-a4aa-599db8fbab56" />


## 🚀 安装指南 (Installation)

1.  下载本项目源代码（或点击右上角 `Code` -> `Download ZIP`）。
2.  解压到一个文件夹中，例如 `EagleAIComment`。
3.  打开 Eagle 软件。
4.  点击顶部菜单栏的 **插件 (Plugins)** > **插件管理 (Manage Plugins)**。
5.  在右上角点击 **导入插件 (Import Plugin)** > **从本地导入 (Load from Local)**。
6.  选择第 2 步解压的文件夹。
7.  安装完成！

## ⚙️ 使用说明 (Usage)

1.  **配置插件**：
    * 在 Eagle 插件列表中点击图标打开插件。
    * 切换到 **“设置”** 选项卡。
    * 填入你的 LLM API 信息（见下文常见模型配置）。
    * 点击“保存设置”。

2.  **开始运行**：
    * 在 Eagle 的素材列表中**选中**一张或多张图片。
    * 回到插件的 **“运行”** 选项卡。
    * 点击 **“开始生成注释”**。
    * 稍等片刻，AI 生成的内容会自动填充到图片的“注释”字段中。

## 🔌 常见模型配置示例 (Configuration Examples)

本项目支持标准的 OpenAI 接口格式。

### 1. OpenAI (官方)
* **API URL**: `https://api.openai.com/v1`
* **Model**: `gpt-4o` 或 `gpt-4-turbo`

### 2. 阿里云百炼 (通义千问 Qwen-VL)
* **API URL**: `https://dashscope.aliyuncs.com/compatible-mode/v1`
* **Model**: `qwen-vl-max` 或 `qwen-vl-plus`
* **获取 Key**: [阿里云百炼控制台](https://bailian.console.aliyun.com/)

### 3. Google Gemini (通过 API 兼容层)
* **API URL**: `https://generativelanguage.googleapis.com/v1beta/openai` (需使用兼容代理或官方兼容接口)
* **Model**: `gemini-1.5-flash`

### 4. SiliconFlow / DeepSeek / 其他中转
* **API URL**: 根据服务商文档填写（通常以 `/v1` 结尾）。

## 🛠️ 开发与调试 (Development)

如果你想修改此插件：
1.  开启 Eagle 的 **开发者模式**：`插件` > `开发者选项` > `开启开发者模式`。
2.  修改代码后，按 `Ctrl+R` (Windows) 或 `Cmd+R` (Mac) 即可重载插件。
3.  右键点击插件界面选择 `Inspect` 可查看控制台日志。

## 📄 许可证 (License)

MIT License. 欢迎 Fork 和提交 PR！
