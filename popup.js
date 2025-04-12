// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 获取DOM元素
  const textInput = document.getElementById('text-input');
  const backgroundStyles = document.getElementById('background-styles');
  const fontStyles = document.getElementById('font-styles');
  const fontColors = document.getElementById('font-colors');
  const preview = document.getElementById('preview');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const summarizeBtn = document.getElementById('summarize-btn');

  // 当前选中的样式
  let currentStyle = {
    background: 'plain-white',
    font: 'source-han-serif',
    color: '#000000'
  };

  // 背景样式配置
  const backgroundConfig = {
    'plain-white': { color: '#FFFFFF' },
    'plain-beige': { color: '#F5F5DC' },
    'plain-gray': { color: '#F0F0F0' }
  };

  // 字体配置
  const fontConfig = {
    'source-han-serif': '"Source Han Serif", serif',
    'alibaba': '"Alibaba PuHuiTi", sans-serif',
    'zcool': '"ZCOOL KuaiLe", cursive'
  };

  // 样式选择事件处理
  function handleStyleSelection(container, type) {
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('style-option')) {
        // 移除之前的选中状态
        container.querySelector('.active').classList.remove('active');
        // 添加新的选中状态
        e.target.classList.add('active');
        // 更新当前样式
        if (type === 'background') {
          currentStyle.background = e.target.dataset.style;
        } else if (type === 'font') {
          currentStyle.font = e.target.dataset.font;
        } else if (type === 'color') {
          currentStyle.color = e.target.dataset.color;
        }
      }
    });
  }

  // 初始化样式选择事件
  handleStyleSelection(backgroundStyles, 'background');
  handleStyleSelection(fontStyles, 'font');
  handleStyleSelection(fontColors, 'color');

  // 生成图片
  function generateImage() {
    const text = textInput.value.trim();
    if (!text) {
      alert('请输入文字内容');
      return;
    }
    if (text.length > 500) {
      alert('文字内容不能超过500字');
      return;
    }

    // 创建canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置画布尺寸
    canvas.width = 800;
    canvas.height = 1000; // 初始高度，后续会根据文本内容调整

    // 绘制背景
    ctx.fillStyle = backgroundConfig[currentStyle.background].color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 设置文字样式
    ctx.font = `24px ${fontConfig[currentStyle.font]}`;
    ctx.fillStyle = currentStyle.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // 文字换行处理
    const words = text.split('');
    const maxWidth = 700;
    const lineHeight = 36;
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // 调整画布高度
    const textHeight = lines.length * lineHeight;
    const padding = 50;
    canvas.height = textHeight + padding * 2;

    // 重新绘制背景（因为调整画布高度会清除内容）
    ctx.fillStyle = backgroundConfig[currentStyle.background].color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 重新设置文字样式
    ctx.font = `24px ${fontConfig[currentStyle.font]}`;
    ctx.fillStyle = currentStyle.color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // 绘制文字
    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + index * lineHeight);
    });

    // 更新预览
    preview.innerHTML = '';
    preview.appendChild(canvas);

    return canvas;
  }

  // 下载图片
  function downloadImage() {
    const canvas = generateImage();
    if (!canvas) return;

    // 生成文件名
    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    const filename = `jinju_${timestamp}.png`;

    // 转换为图片并下载
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  // 调用DeepSeek API进行文本总结
  async function summarizeText() {
    const text = textInput.value.trim();
    if (!text) {
      alert('请输入需要总结的文本内容');
      return;
    }

    try {
      summarizeBtn.disabled = true;
      summarizeBtn.textContent = '正在总结...';
      textInput.value = '';

      const response = await fetch('http://localhost:3000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      textInput.value = text + '\n\n总结：\n' + data.choices[0].message.content;
    } catch (error) {
      console.error('总结失败:', error);
      alert(`总结失败: ${error.message}`);
      textInput.value = text;
    } finally {
      summarizeBtn.disabled = false;
      summarizeBtn.textContent = 'DeepSeek R1总结';
    }
  }

  // 绑定按钮事件
  generateBtn.addEventListener('click', generateImage);
  downloadBtn.addEventListener('click', downloadImage);
  summarizeBtn.addEventListener('click', summarizeText);
});