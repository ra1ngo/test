/*
 * Сортирует поля объекта в указанном порядке.
 * Если для определенного поля не указан порядок, то оно уходит в конец объекта.
 * Все поля, для которых не указан порядок, сортируются между собой в алфавитном порядке.
 *
 * @param {array} keys - массив ключей, по которому нужно отсортировать поля.
 * @param {object} obj - сортируемый объект.
 */
export function sortObjectFields(obj, keys) {
  const arr = Object.entries(obj);

  arr.sort((field1, field2) => {
    if (!keys.includes(field1[0]) && keys.includes(field2[0])) return 1;
    if (keys.includes(field1[0]) && !keys.includes(field2[0])) return -1;
    if (!keys.includes(field1[0]) && !keys.includes(field2[0])) return field1[0] > field2[0] ? 1 : -1;

    return keys.indexOf(field1[0]) - keys.indexOf(field2[0]);
  });

  return arr.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
