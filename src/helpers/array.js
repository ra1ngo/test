export function toFlatMap(arr, childrenLabel = 'children') {
  const flattend = [];

  (function flat(array) {
    array.forEach((el) => {
      if (Array.isArray(el[childrenLabel]) && el[childrenLabel].length) flat(el[childrenLabel]);
      flattend.push(el);
    });
  }(arr));

  return flattend;
}

export function findParent(arr, parentId, idLabel = 'id', childrenLabel = 'children') {
  let parent = null;
  for (const item of arr) {
    if (item[idLabel] === parentId) return item;

    if (Array.isArray(item[childrenLabel]) && item[childrenLabel].length) {
      parent = findParent(item[childrenLabel], parentId, idLabel, childrenLabel);
      if (parent) return parent;
    }
  }

  return parent;
}
