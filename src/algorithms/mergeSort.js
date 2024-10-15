export function* mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    yield* mergeSort(arr, start, mid);
    yield* mergeSort(arr, mid + 1, end);
    yield* merge(arr, start, mid, end);
  }
}

function* merge(arr, start, mid, end) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
    yield { array: [...arr], comparing: [start + i, mid + 1 + j] };
  }

  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
    yield { array: [...arr], comparing: [k] };
  }

  while (j < right.length) {
    arr[k] = right[j];
    j++;
    k++;
    yield { array: [...arr], comparing: [k] };
  }
}
