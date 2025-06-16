// src/lib/extractPublicId.ts

export function extractPublicId(url: string) {
  const parts = url.split('/');
  const fileNameWithExtension = parts[parts.length - 1];
  const folderPath = parts.slice(parts.indexOf('upload') + 1, parts.length - 1).join('/');

  const fileName = fileNameWithExtension.split('.')[0];
  return `${folderPath}/${fileName}`;
}
