// Service Worker 后台脚本

// 监听安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('网页金句(Jinju)扩展已安装');
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImage') {
    // 处理图片下载
    chrome.downloads.download({
      url: request.imageUrl,
      filename: request.filename,
      saveAs: false
    });
  }
});

// 监听扩展图标点击事件
chrome.action.onClicked.addListener((tab) => {
  // 打开popup页面
  chrome.action.openPopup();
});