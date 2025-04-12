# 网页金句(Jinju) - Chrome 扩展

一个简单的 Chrome 浏览器扩展，可以将网页中的文字内容转换成精美的图片。

## 功能特性

### 基础版本 (v1.0)

#### 文本输入
- 用户手动从网页复制文字，粘贴到插件的输入框中
- 支持输入框文字预览和编辑
- 最大支持 500 字符的文本输入

#### 图片生成
- 默认生成竖版图片，宽度固定为 800px
- 图片高度根据文本内容自适应
- 提供 3 种基础背景样式:
  - 纯色背景 (白色、米色、浅灰)
  - 简约渐变背景
  - 极简线条装饰

#### 字体样式
- 默认提供 3 种中文字体:
  - 思源宋体
  - 阿里普惠体
  - 站酷快乐体
- 字体大小自适应，确保清晰可读
- 支持调整文字颜色 (黑色、深灰、棕色)

#### 图片导出
- 支持一键导出为 PNG 格式
- 图片质量默认为 300dpi，确保清晰度
- 自动生成文件名: jinju_年月日_时分秒.png

### 使用流程
1. 在网页中选中并复制想要保存的文字
2. 点击 Chrome 工具栏中的插件图标
3. 将文字粘贴到插件的输入框中
4. 选择喜欢的背景样式和字体
5. 点击生成按钮预览效果
6. 满意后点击下载按钮保存图片

## 技术规范
- 使用 Manifest V3 开发
- 采用响应式设计，确保插件界面在不同尺寸下正常显示
- 使用 Canvas API 进行图片生成
- 本地完成所有图片处理，不依赖外部服务
- 遵循 Chrome 扩展最佳实践和安全准则

## 后续优化方向 (未来版本)
1. 支持直接选中网页文字，右键快捷操作
2. 添加更多背景模板和字体选项
3. 支持自定义图片尺寸
4. 添加水印和图片编辑功能
5. 支持批量导出多种样式
6. 添加图片分享功能

## 安装说明
1. 下载本扩展的源代码
2. 打开 Chrome 浏览器，进入扩展管理页面 (chrome://extensions/)
3. 开启开发者模式
4. 点击"加载已解压的扩展程序"，选择源代码目录

## 开发环境
- Chrome 浏览器 (最新版本)
- Node.js >= 14.0.0
- npm >= 6.0.0

## 项目结构