export function* bubbleSort(arr) {
  let len = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        yield { array: [...arr], comparing: [i, i + 1] };
      }
    }
    len--;
  } while (swapped);
  return arr;
}
