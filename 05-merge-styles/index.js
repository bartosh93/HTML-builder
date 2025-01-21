const fs = require('fs').promises;
const path = require('path');

const dir = '05-merge-styles';
const sourceDir = path.join(dir, 'styles');
const targetDir = path.join(dir, 'project-dist');
const targetFile = path.join(targetDir, 'bundle.css');

async function copyCSS() {
    try {
        await fs.mkdir(targetDir, { recursive: true });

        const files = await fs.readdir(sourceDir);

        await fs.writeFile(targetFile, '', 'utf-8');

        for (const file of files) {
            if (path.extname(file) === '.css') {
                const filePath = path.join(sourceDir, file);
                const data = await fs.readFile(filePath, 'utf-8');
                await fs.appendFile(targetFile, data + '\n', 'utf-8');
            }
        }

        console.log('Копирование завершено!');
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

copyCSS();