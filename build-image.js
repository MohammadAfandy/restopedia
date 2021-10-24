const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = `${target}/resized`;

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const [fileName, extension] = image.split('.');
  if (extension === 'png') return;
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(path.resolve(__dirname, `${destination}/${fileName}-large.${extension}`));

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(path.resolve(__dirname, `${destination}/${fileName}-small.${extension}`));
});
