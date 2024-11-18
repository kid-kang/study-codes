/**
 * responseType: "blob"类型，文件下载
 * @param {blob} fileData
 * @param {string} [fileName]
 */
export const downloadFile = (fileData, fileName = "临时文件") => {
  const blob = new Blob([fileData]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * 判断是否为空（""|null|undefined|{}|[]|NaN|false）
 * @param {any} value
 */
export function isEmpty(value) {
  if ([null, undefined, "", false].includes(value)) {
    return true;
  } else if (Object.prototype.toString.call(value) === "[object Object]") {
    return Object.keys(value).length === 0 && Object.getOwnPropertySymbols(value).length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (Number.isNaN(value)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 根据时间戳+random生成的唯一id
 * @author 王政康
 * @returns {string}
 */
export function getUid() {
  return Date.now() + "" + Math.floor(Math.random() * 10000);
}