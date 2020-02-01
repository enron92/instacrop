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
  if (!ouput) {
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
    if (ratio > 1) { // Landscape
      pic.resize(1000, jimp.AUTO);
    } else if (ratio < 1) { // Portrait
      pic.resize(jimp.AUTO, 1000);
    } else { // Square
      pic.resize(1000, 1000);
    }
    const x = ratio >= 1 ? 40 : (1080 - pic.bitmap.width) / 2;
    const y = ratio >= 1 ? (1080 - pic.bitmap.height) / 2 : 40;
    bg.resize(insta.width, insta.height)
        .composite(pic, x, y)
        .quality(100)
        .write(output);
  });
});
