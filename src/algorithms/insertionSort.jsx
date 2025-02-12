export function insertionSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
  
    for (let i = 1; i < auxiliaryArray.length; i++) {
      let key = auxiliaryArray[i];
      let j = i - 1;
  
      while (j >= 0 && auxiliaryArray[j] > key) {
        animations.push([j + 1, auxiliaryArray[j]]);
        auxiliaryArray[j + 1] = auxiliaryArray[j];
        j--;
      }
  
      animations.push([j + 1, key]);
      auxiliaryArray[j + 1] = key;
    }
  
    return animations;
  }
  