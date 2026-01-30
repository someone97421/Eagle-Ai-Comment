// 全局配置默认值
let appConfig = {
	apiUrl: "https://api.openai.com/v1",
	apiKey: "",
	model: "gpt-4o",
	resizeLimit: 1024,
	systemPrompt: "你是一个专业的视觉设计师。请简短地描述这张图片的视觉元素、风格、颜色和潜在用途。",
	temperature: 0.7,
	maxTokens: 300,
	useReasoning: false
};

// ---------------- 1. Eagle 生命周期 ----------------

eagle.onPluginCreate(async (plugin) => {
	console.log('Eagle AI Plugin Created');

	// 1. 先绑定按钮事件（确保无论如何按钮都能点）
	bindUiEvents();

	// 2. 初始化 Tab 切换
	initTabs();

	// 3. 加载配置 (使用 localStorage)
	loadConfig();

	// 4. 首次获取选中状态
	refreshSelection();
});

// 当插件窗口显示时触发
eagle.onPluginShow(() => {
	console.log('Plugin Show');
	refreshSelection();
});

// 监听选区变化 (如果 Eagle 版本支持)
if (eagle.onSelectionChanged) {
	eagle.onSelectionChanged((items) => {
		updateCountUI(items.length);
	});
}

// ---------------- 2. 核心功能函数 ----------------

async function runTask() {
	// 再次获取选中，防止状态不一致
	const items = await eagle.item.getSelected();

	if (items.length === 0) {
		return alert("请先在 Eagle 列表中选中至少一张图片！");
	}
	if (!appConfig.apiKey) {
		alert("请先在设置页配置 API Key！");
		document.querySelector('.tab-item[data-target="view-settings"]').click();
		return;
	}

	const btn = document.getElementById('btn-run');
	btn.disabled = true;
	btn.innerText = "处理中...";
	appendLog("--- 开始任务 ---", "info");

	// 定义浏览器原生支持可以直接读取的图片格式
	const browserSupported = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'avif'];

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		appendLog(`[${i + 1}/${items.length}] 处理: ${item.name}`, "info");

		try {
			let base64;
			const ext = item.ext ? item.ext.toLowerCase() : "";

			// --- 核心修改逻辑开始 ---
			if (browserSupported.includes(ext)) {
				// 1. 对于浏览器支持的格式（jpg/png等）：直接读取原图
				base64 = await processImage(item.fileURL, appConfig.resizeLimit);
			} else {
				// 2. 对于不支持的格式（psd/ai/视频等）：调用 Eagle 原生能力获取缩略图
				// eagle.app.createThumbnailFromPath 会返回一个 NativeImage 对象
				appendLog(`ℹ️ 格式[${ext}]使用预览图模式`, "info");

				const nativeImage = await eagle.app.createThumbnailFromPath(item.filePath, {
					width: appConfig.resizeLimit,
					height: appConfig.resizeLimit
				});

				if (!nativeImage || nativeImage.isEmpty()) {
					throw new Error("无法生成该文件的预览图");
				}

				// 直接获取 Base64 (API 返回的 NativeImage 自带转 Base64 功能)
				base64 = nativeImage.toDataURL();
			}
			// --- 核心修改逻辑结束 ---

			// 3. 调用 API
			const comment = await callLLM(base64);

			// 4. 写入 Eagle 注释
			item.annotation = comment;
			await item.save();

			appendLog(`✅ 成功写入注释`, "success");
		} catch (err) {
			console.error(err);
			appendLog(`❌ 失败: ${err.message}`, "error");
		}
	}

	btn.disabled = false;
	btn.innerText = "开始生成注释";
	appendLog("--- 任务完成 ---", "info");
}

// ---------------- 3. 配置管理 (改为 localStorage) ----------------

function loadConfig() {
	try {
		const saved = localStorage.getItem('eagle_ai_config');
		if (saved) {
			const parsed = JSON.parse(saved);
			appConfig = { ...appConfig, ...parsed };
		}
	} catch (e) {
		console.error("读取配置出错", e);
	}

	// 填充到 UI
	document.getElementById('cfg-url').value = appConfig.apiUrl;
	document.getElementById('cfg-key').value = appConfig.apiKey;
	document.getElementById('cfg-model').value = appConfig.model;
	document.getElementById('cfg-resize').value = appConfig.resizeLimit;
	document.getElementById('cfg-prompt').value = appConfig.systemPrompt;
	document.getElementById('cfg-temp').value = appConfig.temperature;
	document.getElementById('cfg-tokens').value = appConfig.maxTokens;
	document.getElementById('cfg-reasoning').checked = appConfig.useReasoning;
}

function saveConfig() {
	const btn = document.getElementById('btn-save');
	const originalText = btn.innerText;

	try {
		// 从 UI 获取最新值
		appConfig.apiUrl = document.getElementById('cfg-url').value.replace(/\/+$/, "") || "https://api.openai.com/v1";
		appConfig.apiKey = document.getElementById('cfg-key').value.trim();
		appConfig.model = document.getElementById('cfg-model').value.trim();
		appConfig.resizeLimit = parseInt(document.getElementById('cfg-resize').value) || 1024;
		appConfig.systemPrompt = document.getElementById('cfg-prompt').value;
		appConfig.temperature = parseFloat(document.getElementById('cfg-temp').value);
		appConfig.maxTokens = parseInt(document.getElementById('cfg-tokens').value);
		appConfig.useReasoning = document.getElementById('cfg-reasoning').checked;

		// 保存到 localStorage
		localStorage.setItem('eagle_ai_config', JSON.stringify(appConfig));

		// 视觉反馈
		btn.innerText = "已保存！";
		btn.disabled = true;
		setTimeout(() => {
			btn.innerText = originalText;
			btn.disabled = false;
			// 自动跳回运行页
			document.querySelector('.tab-item[data-target="view-run"]').click();
		}, 800);

		appendLog("配置已更新", "success");

	} catch (e) {
		alert("保存失败: " + e.message);
	}
}

// ---------------- 4. 辅助函数 ----------------

function bindUiEvents() {
	document.getElementById('btn-save').onclick = saveConfig;
	document.getElementById('btn-run').onclick = runTask;
}

function initTabs() {
	const tabs = document.querySelectorAll('.tab-item');
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
			document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
			tab.classList.add('active');
			const targetId = tab.getAttribute('data-target');
			document.getElementById(targetId).classList.add('active');
		});
	});
}

async function refreshSelection() {
	try {
		const items = await eagle.item.getSelected();
		updateCountUI(items.length);
	} catch (e) {
		console.error(e);
	}
}

function updateCountUI(count) {
	const el = document.getElementById('selected-count');
	if (el) el.innerText = count;
}

function appendLog(msg, type = 'normal') {
	const logDiv = document.getElementById('console-log');
	if (!logDiv) return;
	const line = document.createElement('div');
	line.className = `log-line ${type}`;
	line.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
	logDiv.appendChild(line);
	logDiv.scrollTop = logDiv.scrollHeight;
}

// 图片压缩转Base64
function processImage(fileUrl, maxSize) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = fileUrl;
		img.onload = () => {
			let w = img.width, h = img.height;
			if (w > maxSize || h > maxSize) {
				const ratio = Math.min(maxSize / w, maxSize / h);
				w = Math.round(w * ratio);
				h = Math.round(h * ratio);
			}
			const canvas = document.createElement('canvas');
			canvas.width = w; canvas.height = h;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, w, h);
			resolve(canvas.toDataURL('image/jpeg', 0.8));
		};
		img.onerror = () => reject(new Error("无法加载图片"));
	});
}

// ---------------- API 调用函数 ----------------
async function callLLM(base64Image) {
	// 1. 自动清洗 URL
	let cleanUrl = appConfig.apiUrl.trim();
	cleanUrl = cleanUrl.replace(/\/chat\/completions\/?$/, "");
	cleanUrl = cleanUrl.replace(/\/+$/, "");

	// 2. 构造请求体
	const payload = {
		model: appConfig.model,
		messages: [
			{ role: "system", content: appConfig.systemPrompt },
			{ role: "user", content: [{ type: "image_url", image_url: { url: base64Image } }] }
		],
		max_tokens: appConfig.maxTokens
	};

	if (!appConfig.useReasoning) {
		payload.temperature = appConfig.temperature;
	}

	console.log("正在请求 URL:", `${cleanUrl}/chat/completions`);

	const resp = await fetch(`${cleanUrl}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${appConfig.apiKey.trim()}`
		},
		body: JSON.stringify(payload)
	});

	if (!resp.ok) {
		const errText = await resp.text();
		let errMsg = errText;
		try {
			const errJson = JSON.parse(errText);
			if (errJson.errors && errJson.errors.message) {
				errMsg = errJson.errors.message;
			} else if (errJson.message) {
				errMsg = errJson.message;
			}
		} catch (e) { }

		throw new Error(`API报错 (${resp.status}): ${errMsg}`);
	}

	const data = await resp.json();
	return data.choices?.[0]?.message?.content || "API返回内容为空";
}
