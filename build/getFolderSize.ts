import { readdir } from 'fs/promises';
import { join } from 'path';
import { stat } from 'fs/promises';

// 计算文件夹大小的函数
export async function getFolderSize(folderPath: string): Promise<string> {
  let totalSize = 0;

  async function getSize(filePath: string): Promise<void> {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      const files = await readdir(filePath);
      for (const file of files) {
        await getSize(join(filePath, file));
      }
    } else {
      totalSize += stats.size;
    }
  }

  await getSize(folderPath);
  return formatSize(totalSize);
}

// 格式化大小为易读的格式
function formatSize(size: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let formattedSize = size;
  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }
  return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
}
