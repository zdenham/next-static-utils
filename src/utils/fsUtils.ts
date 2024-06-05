import fs from 'fs';
import path from 'path';

const blocklist = ['node_modules', '.git', '.next', '.vercel', 'out'];

export const findFolderPath = (
  directory: string,
  folderName = 'app'
): string | null => {
  try {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.lstatSync(filePath);

      if (!stat.isDirectory()) continue;
      if (blocklist.includes(file)) continue;

      if (file === folderName) {
        console.log(`Folder found: ${filePath}`);
        return filePath;
      }

      const result: string | null = findFolderPath(filePath, folderName);
      if (result) {
        return result;
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export function findAllFilesInFolder(
  dirPath: string,
  arrayOfFiles: string[] = []
) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = [...arrayOfFiles];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = findAllFilesInFolder(
        path.join(dirPath, file),
        arrayOfFiles
      );
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}
