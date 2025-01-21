const fs = require('fs');
const path = require('path');

const dir = '01-read-file';
const filePath = path.join(dir, 'text.txt');
var stream = new fs.ReadStream(filePath, { encoding: 'utf-8' });

stream.on('readable', function () {
  const data = stream.read();
  console.log(data);
  return data;
});
