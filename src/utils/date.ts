/** Generates a unique, filesystem-safe file name, e.g. Lensor_20260710_143012_482.jpg */
export const buildExportFileName = (): string => {
  const now = new Date();
  const pad = (value: number, length = 2): string => String(value).padStart(length, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `Lensor_${date}_${time}_${pad(now.getMilliseconds(), 3)}.jpg`;
};
