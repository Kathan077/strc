const sharp = require('sharp');
const path = require('path');

async function makeCleanCircle() {
  const refPath = 'C:/Users/SLIM 5/.gemini/antigravity/brain/1a797962-86a2-43d2-8ccb-cb4d5f076f7a/.user_uploaded/media_1794810215711_4b67c7cc.jpg';
  const outPng = path.join(__dirname, '../public/images/values/truck-circle-clean.png');
  const outJpg = path.join(__dirname, '../public/images/values/truck-circle-clean.jpg');

  // In media_1794810215711_4b67c7cc.jpg (1024 x 682):
  // The truck circle is at cx = 512, cy = 389, radius ≈ 120
  // Left: 512 - 120 = 392, Top: 389 - 120 = 269, Width: 240, Height: 240
  const maskSvg = Buffer.from(
    '<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">' +
    '  <circle cx="250" cy="250" r="248" fill="white" />' +
    '</svg>'
  );

  await sharp(refPath)
    .extract({ left: 387, top: 264, width: 250, height: 250 })
    .resize(500, 500)
    .sharpen()
    .composite([{
      input: maskSvg,
      blend: 'dest-in'
    }])
    .png()
    .toFile(outPng);

  await sharp(refPath)
    .extract({ left: 387, top: 264, width: 250, height: 250 })
    .resize(500, 500)
    .sharpen()
    .jpeg({ quality: 96 })
    .toFile(outJpg);

  console.log('Saved truck-circle-clean.png and truck-circle-clean.jpg (500x500 retina)');
}

makeCleanCircle().catch(console.error);

