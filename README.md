# Eagle AI Auto Tagging Plugin (AI 智能注释)

![Eagle Plugin](https://img.shields.io/badge/Eagle-Plugin-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green)

[English Version Below](#-eagle-ai-auto-tagging-plugin)

一个为 [Eagle 素材管理软件](https://eagle.cool/) 开发的效率插件。它利用大语言模型（LLM）的多模态能力，自动识别图片内容并生成精准的注释/描述，写入 Eagle 的“注释”字段，让素材搜索变得无比轻松。

## ✨ 功能特性

* **⚡️ 广泛兼容**：支持 OpenAI 格式的所有 API（如 OpenAI GPT-4o, Claude 3.5, 阿里云通义千问 Qwen-VL, Google Gemini 等）。
* **🖼️ 智能压缩**：内置图片压缩算法，自动将大图压缩至指定尺寸（如 1024px）后再上传，大幅节省 Token 消耗并提升响应速度。
* **🛠️ 高度自定义**：
    * 支持自定义 API Base URL 和 API Key。
    * 可自定义 System Prompt（系统提示词），控制 AI 的输出风格（如“简短关键词”或“详细描述”）。
    * 支持调节 Temperature（创造性）和 Token 上限。
* **🧠 推理模式支持**：适配 o1/o3 等具备推理能力的模型（自动屏蔽不支持的参数）。
* **🔒 数据隐私**：所有配置均存储在本地（LocalStorage），直接与大模型厂商通信，不经过第三方中转服务器。

## 📸 预览 (Preview)

<div align="center">
  <img width="32%" alt="Running" src="https://github.com/user-attachments/assets/6f8b0dfa-4961-4fc7-a4b8-ff2d7e6b49cc" />
  <img width="32%" alt="Settings" src="https://github.com/user-attachments/assets/5bd9597b-b81b-4070-a67d-102d622b6213" />
  <img width="32%" alt="Result" src="https://github.com/user-attachments/assets/d41379e6-10f7-4f66-a4aa-599db8fbab56" />
</div>

## 🚀 安装指南

1.  在本项目右侧的 **Releases** 页面下载最新版本的 `.eagleplugin` 文件。
2.  双击下载好的文件。
3.  Eagle 软件会自动唤起，点击弹窗中的 **“安装插件”** 即可。
4.  安装完成后，建议重启或刷新 Eagle (Ctrl+R)。

## ⚙️ 使用说明

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

## 🔌 常见模型配置示例

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

## 🛠️ 开发与调试

如果你想修改此插件源码：
1.  开启 Eagle 的 **开发者模式**：`插件` > `开发者选项` > `开启开发者模式`。
2.  下载本项目源码并解压。
3.  在插件管理中选择“导入插件” -> “从本地加载”。
4.  修改代码后，按 `Ctrl+R` (Windows) 或 `Cmd+R` (Mac) 即可重载插件。

---

# 🇺🇸 Eagle AI Auto Tagging Plugin

A productivity plugin developed for [Eagle](https://eagle.cool/). It utilizes the multimodal capabilities of Large Language Models (LLMs) to automatically recognize image content and generate accurate annotations/descriptions, writing them directly into Eagle's "Annotation" field, making asset search effortless.

## ✨ Features

* **⚡️ Broad Compatibility**: Supports all OpenAI-format APIs (e.g., OpenAI GPT-4o, Claude 3.5, Aliyun Qwen-VL, Google Gemini, etc.).
* **🖼️ Smart Compression**: Built-in image compression algorithm automatically resizes large images (e.g., to 1024px) before upload, significantly saving tokens and improving response speed.
* **🛠️ Highly Customizable**:
    * Customizable API Base URL and API Key.
    * Customizable System Prompt to control AI output style (e.g., "short keywords" or "detailed description").
    * Adjustable Temperature (creativity) and Token limits.
* **🧠 Reasoning Mode Support**: Adapted for reasoning models like o1/o3 (automatically masks unsupported parameters).
* **🔒 Data Privacy**: All configurations are stored locally (LocalStorage) and communicate directly with LLM providers without passing through third-party relay servers.

## 🚀 Installation

1.  Download the latest `.eagleplugin` file from the **Releases** page on the right.
2.  Double-click the downloaded file.
3.  Eagle will automatically prompt you to install the plugin. Click **"Install Plugin"**.
4.  After installation, it is recommended to restart or refresh Eagle (Ctrl+R).

## ⚙️ Usage

1.  **Configure Plugin**:
    * Click the icon in the Eagle plugin list to open the plugin.
    * Switch to the **"Settings"** tab.
    * Enter your LLM API information.
    * Click "Save Settings".

2.  **Start Tagging**:
    * **Select** one or more images in your Eagle asset list.
    * Return to the plugin's **"Run"** tab.
    * Click **"Start Annotation"**.
    * Wait a moment; the AI-generated content will automatically fill the "Annotation" field of the selected images.

## 🔌 Configuration Examples

This project supports standard OpenAI interface formats.

* **OpenAI**: URL: `https://api.openai.com/v1`, Model: `gpt-4o`
* **Aliyun Qwen-VL**: URL: `https://dashscope.aliyuncs.com/compatible-mode/v1`, Model: `qwen-vl-max`
* **Other Providers**: Any provider that supports the OpenAI `/v1/chat/completions` format with image input.

## 📄 License

MIT License. Feel free to Fork and submit PRs!
