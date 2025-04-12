// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    // 获取选中的文本
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});

// 添加右键菜单选择功能（未来版本）
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: 'jinju',
//     title: '生成金句图片',
//     contexts: ['selection']
//   });
// });