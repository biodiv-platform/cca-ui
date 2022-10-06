export const timeOut = async (ms = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const capitalize = (text) =>
  text.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());

export const toKey = (s = "") => s.split(" ").join("_").toUpperCase();

export const addOrRemoveArray = (arr, item) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

/**
 * Works similar to loadash's `_.get` to retrive value from nested objects
 * getByPath(input,path)
 * path input.0.name
 * input [{name:"text"}]
 * output "text"
 * @param {*} obj
 * @param {*} path
 * @returns
 */
export const getByPath = (obj, path) => {
  path.split(".").forEach(function (level) {
    if (!obj) {
      return;
    }
    obj = obj[level];
  });

  return obj;
};
