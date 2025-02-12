export function selectionSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
  
    for (let i = 0; i < auxiliaryArray.length - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < auxiliaryArray.length; j++) {
        if (auxiliaryArray[j] < auxiliaryArray[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        // Record the swap
        animations.push([i, auxiliaryArray[minIndex]]);
        animations.push([minIndex, auxiliaryArray[i]]);
        [auxiliaryArray[i], auxiliaryArray[minIndex]] = [
          auxiliaryArray[minIndex],
          auxiliaryArray[i],
        ];
      }
    }
  
    return animations;
  }
  