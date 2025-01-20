const fs = require('fs');
const path = require('path');

const dir = '01-read-file';
const filePath = path.join(dir, 'text.txt');

fs.readFile(filePath, function (error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data.toString());
});
