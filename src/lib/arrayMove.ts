/**
 * Array içinde bir elemanı başka bir indexe taşır
 * @param array - Taşıma yapılacak array
 * @param from - Kaynak index
 * @param to - Hedef index
 * @returns Yeni array (immutable)
 */
export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArr = array.slice();
  const startIndex = from < 0 ? newArr.length + from : from;

  if (startIndex >= 0 && startIndex < newArr.length) {
    const [item] = newArr.splice(from, 1);
    newArr.splice(to, 0, item);
  }

  return newArr;
}

