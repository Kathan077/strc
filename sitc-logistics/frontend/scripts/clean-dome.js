const sharp = require('sharp');
const path = require('path');

async function generateCleanAssets() {
  const pureJpg = path.join(__dirname, '../public/images/values/pure-truck-clean.jpg');
  const outPng = path.join(__dirname, '../public/images/values/values-truck-dome.png');
  const outJpg = path.join(__dirname, '../public/images/values/values-truck.jpg');
  
  // Arch alpha mask (888 x 392)
  const maskSvg = Buffer.from(
    '<svg width="888" height="392" viewBox="0 0 888 392" xmlns="http://www.w3.org/2000/svg">' +
    '  <path d="M 0 392 A 444 392 0 0 1 888 392 Z" fill="white" />' +
    '</svg>'
  );
  
  await sharp(pureJpg)
    .ensureAlpha()
    .composite([{
      input: maskSvg,
      blend: 'dest-in'
    }])
    .png()
    .toFile(outPng);
    
  await sharp(pureJpg)
    .jpeg({ quality: 96 })
    .toFile(outJpg);
    
  console.log('values-truck-dome.png & values-truck.jpg generated clean without any baked-in arc/dots!');
}

generateCleanAssets().catch(console.error);
