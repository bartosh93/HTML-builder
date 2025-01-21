const fs = require('fs').promises;
const path = require('path');

const dir = '04-copy-directory';
const sourceDir = path.join(dir, 'files');
const targetDir = path.join(dir, 'new-folder');

async function copyFiles() {
  try {
    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const srcFilePath = path.join(sourceDir, file);
      const destFilePath = path.join(targetDir, file);
      await fs.copyFile(srcFilePath, destFilePath);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
copyFiles();
