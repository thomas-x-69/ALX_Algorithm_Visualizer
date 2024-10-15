export function* quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = yield* partition(arr, low, high);
    yield* quickSort(arr, low, pi - 1);
    yield* quickSort(arr, pi + 1, high);
  }
}

function* partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { array: [...arr], comparing: [i, j] };
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield { array: [...arr], comparing: [i + 1, high] };

  return i + 1;
}
