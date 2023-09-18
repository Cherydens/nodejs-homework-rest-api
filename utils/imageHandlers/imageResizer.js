const Jimp = require('jimp');

const imageResizer = async (tempImage) => {
  const image = await Jimp.read(tempImage);
  await image
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempImage);
};

module.exports = imageResizer;
