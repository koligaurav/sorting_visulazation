export function heapSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    const n = auxiliaryArray.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(auxiliaryArray, n, i, animations);
    }
  
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, auxiliaryArray[i]]);
      animations.push([i, auxiliaryArray[0]]);
      [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
      heapify(auxiliaryArray, i, 0, animations);
    }
  
    return animations;
  }
  
  function heapify(auxiliaryArray, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n && auxiliaryArray[left] > auxiliaryArray[largest]) {
      largest = left;
    }
  
    if (right < n && auxiliaryArray[right] > auxiliaryArray[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      animations.push([i, auxiliaryArray[largest]]);
      animations.push([largest, auxiliaryArray[i]]);
      [auxiliaryArray[i], auxiliaryArray[largest]] = [
        auxiliaryArray[largest],
        auxiliaryArray[i],
      ];
      heapify(auxiliaryArray, n, largest, animations);
    }
  }
  