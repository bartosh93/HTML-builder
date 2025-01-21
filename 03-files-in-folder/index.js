const fs = require('fs');
const path = require('path');

const dir = '03-files-in-folder';
const directoryPath = path.join(dir, 'secret-folder');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Ошибка при чтении директории: ' + err);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.log('Ошибка при получении информации о файле: ' + err);
      }
      if (stats.isFile()) {
        console.log(
          `${file.slice(0, file.indexOf('.'))} - ${file.slice(
            file.indexOf('.') + 1,
          )} - ${(stats.size / 1024).toFixed(3)}kb`,
        );
      }
    });
  });
});
