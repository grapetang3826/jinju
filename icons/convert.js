const fs = require('fs');
const sharp = require('sharp');

async function convertSvgToPng() {
  try {
    // 读取SVG文件
    const svgBuffer = fs.readFileSync(__dirname + '/icon.svg');
    
    // 定义需要生成的尺寸
    const sizes = [16, 48, 128];
    
    // 为每个尺寸生成PNG
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(__dirname + `/icon${size}.png`);
      console.log(`Generated icon${size}.png`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

convertSvgToPng();