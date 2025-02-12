export function quickSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(auxiliaryArray, start, end, animations) {
    if (start < end) {
      const pivotIndex = partition(auxiliaryArray, start, end, animations);
      quickSortHelper(auxiliaryArray, start, pivotIndex - 1, animations);
      quickSortHelper(auxiliaryArray, pivotIndex + 1, end, animations);
    }
  }
  
  function partition(auxiliaryArray, start, end, animations) {
    const pivot = auxiliaryArray[end];
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
      if (auxiliaryArray[i] <= pivot) {
        animations.push([i, auxiliaryArray[pivotIndex]]);
        animations.push([pivotIndex, auxiliaryArray[i]]);
        [auxiliaryArray[i], auxiliaryArray[pivotIndex]] = [
          auxiliaryArray[pivotIndex],
          auxiliaryArray[i],
        ];
        pivotIndex++;
      }
    }
  
    animations.push([pivotIndex, auxiliaryArray[end]]);
    animations.push([end, auxiliaryArray[pivotIndex]]);
    [auxiliaryArray[pivotIndex], auxiliaryArray[end]] = [
      auxiliaryArray[end],
      auxiliaryArray[pivotIndex],
    ];
  
    return pivotIndex;
  }
  