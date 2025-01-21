const fs = require('fs').promises;
const path = require('path');

const dir = '06-build-page';

const templateFilePath = path.join(dir, 'template.html');
const componentsDirPath = path.join(dir, 'components');
const outputFilePath = path.join(dir, 'project-dist', 'index.html');

async function buildHTML() {
    try {
        const template = await fs.readFile(templateFilePath, 'utf-8');

        const tagPattern = /{{(.*?)}}/g;
        const tags = [...new Set(template.match(tagPattern))];

        let modifiedTemplate = template;

        for (const tag of tags) {
            const tagName = tag.replace(/{{|}}/g, '').trim();
            const componentFilePath = path.join(componentsDirPath, `${tagName}.html`);
            
            try {
                const componentContent = await fs.readFile(componentFilePath, 'utf-8');
                modifiedTemplate = modifiedTemplate.replace(tag, componentContent);
            } catch (error) {
                console.error(`Ошибка: компонент ${tagName} не найден.`);
            }
        }

        await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
        await fs.writeFile(outputFilePath, modifiedTemplate);

    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}



const sourceCSSDir = path.join(dir, 'styles');
const targetDir = path.join(dir, 'project-dist');
const targetFile = path.join(targetDir, 'style.css');

async function copyCSS() {
    try {
        await fs.mkdir(targetDir, { recursive: true });

        const files = await fs.readdir(sourceCSSDir);

        await fs.writeFile(targetFile, '', 'utf-8');

        for (const file of files) {
            if (path.extname(file) === '.css') {
                const filePath = path.join(sourceCSSDir, file);
                const data = await fs.readFile(filePath, 'utf-8');
                await fs.appendFile(targetFile, data + '\n', 'utf-8');
            }
        }

        console.log('Копирование завершено!');
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}



const sourceAssetsDir = path.join(dir, 'assets');
const targetAssetsDir = path.join(dir,'project-dist', 'assets');



async function copyFiles() {
  try {
    await fs.rm(targetAssetsDir, { recursive: true, force: true });
    await fs.mkdir(targetAssetsDir, { recursive: true });

    const items = await fs.readdir(sourceAssetsDir);

    for (const item of items) {
      const srcItemPath = path.join(sourceAssetsDir, item);
      const destItemPath = path.join(targetAssetsDir, item);

      const stats = await fs.stat(srcItemPath);

      if (stats.isDirectory()) {
        await copyFilesRecursively(srcItemPath, destItemPath);
      } else {
        await fs.copyFile(srcItemPath, destItemPath);
      }
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function copyFilesRecursively(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });

  const items = await fs.readdir(srcDir);

  for (const item of items) {
    const srcItemPath = path.join(srcDir, item);
    const destItemPath = path.join(destDir, item);

    const stats = await fs.stat(srcItemPath);

    if (stats.isDirectory()) {
      await copyFilesRecursively(srcItemPath, destItemPath);
    } else {
      await fs.copyFile(srcItemPath, destItemPath);
    }
  }
}

buildHTML();
copyCSS();
copyFiles();
