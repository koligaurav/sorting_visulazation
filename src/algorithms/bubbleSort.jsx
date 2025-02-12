export function bubbleSort(array) {
    const animations = [];
    const n = array.length;
    const auxiliaryArray = array.slice();
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
          // Record the swap
          animations.push([j, auxiliaryArray[j + 1]]);
          animations.push([j + 1, auxiliaryArray[j]]);
          [auxiliaryArray[j], auxiliaryArray[j + 1]] = [
            auxiliaryArray[j + 1],
            auxiliaryArray[j],
          ];
        }
      }
    }
    return animations;
  }
  