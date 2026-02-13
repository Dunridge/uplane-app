export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export function validateFileSize(file: File, maxMB = 5) {
  const maxBytes = maxMB * 1024 * 1024;
  return file.size <= maxBytes;
}

export function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}
