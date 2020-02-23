'use strict';

const jimp = require('jimp');

const insta = {
  width: 1080,
  height: 1080,
};

const input = process.argv[2];
const output = process.argv[3];

if (input === '-h' || input === '--help') {
  console.log('Usage: instacrop <input.jpg> <output.jpg>');
  process.exit(0);
}

if (!input) {
  console.error('Specify an input file');
  if (!output) {
    console.error('Specify an output file');
  }
  process.exit(1);
}

console.log('Processing', input);

jimp.read(__dirname + '/img/white.png', (err, bg) => {
  if (err) {
    throw err;
  }
  jimp.read(input, (err, pic) => {
    if (err) {
      throw err;
    }
    const ratio = pic.bitmap.width / pic.bitmap.height;
    if (ratio >= 1) { // Landscape or square
      pic.resize(1000, jimp.AUTO);
    } else { // Portrait
      pic.resize(jimp.AUTO, 1000);
    }
    const x = (insta.width - pic.bitmap.width) / 2;
    const y = (insta.height - pic.bitmap.height) / 2;
    bg.resize(insta.width, insta.height)
        .composite(pic, x, y)
        .quality(100)
        .write(output);
  });
});
