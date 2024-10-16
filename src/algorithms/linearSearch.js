export function* linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    yield { comparing: [i] };
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
