const fs = require('fs');
const path = require('path');

// Путь к директории сборки и целевой папке
const buildDir = path.join(__dirname, 'build');
const targetDir = path.join(buildDir, 'react-stellar-burger');

// Переменная окружения SERVE_BUILD
const isServeBuild = process.env.SERVE_BUILD === 'true';

if (isServeBuild) {
  // Создаем папку react-stellar-burger если она не существует
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  // Перемещаем папку static внутрь react-stellar-burger
  const srcDir = path.join(buildDir, 'static');
  const destDir = path.join(targetDir, 'static');
  if (fs.existsSync(srcDir) && !fs.existsSync(destDir)) {
    fs.renameSync(srcDir, destDir);
  } else {
    console.error('Directory not found or already moved:', srcDir);
  }
}
