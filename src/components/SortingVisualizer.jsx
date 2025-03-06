import React, { useState, useEffect } from "react";
import { mergeSort } from "../algorithms/mergeSort";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { heapSort } from "../algorithms/heapSort";
import { quickSort } from "../algorithms/quickSort";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [sortingSpeed, setSortingSpeed] = useState(10);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Choose an algorithm to start sorting!");

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    if (isSorting) return; // Prevent changing the array during sorting
    const newArr = Array.from({ length: arraySize }, () =>
      // Generates a random array of numbers between 0 and 500
      Math.floor(Math.random() * 500)
    );
    setArray(newArr);
    setStatusMessage("New array generated!");
  };
/*
-> animateSorting function is used to visually animate the proces of sorting an array
-> animateSorting function takes an array of animations as input. Each animation is an array containg three elements.
   1. barIndex: the index of the bar element in the DOM
   2. newHeight: The new height for the bar
   3. action: the type of action being performed( eg. 'compare', 'swap','shift', 'insert').
   eg. const animations = [
    [0, 100, 'compare'],
    [1, 150, 'swap'],
    [2, 200, 'insert']
];
-> after all animation have been processes, another setTimeout is used to update the status message and 
se "isSorting" to false after a total delay of "animations.length*sortingSpeed" milliseconds. This ensure that the sorting
completion message is dispalyed only after all animations have finsished.
*/
  const animateSorting = (animations) => {
    animations.forEach(([barIndex, newHeight, action], i) => {
      setTimeout(() => {
        const bar = document.getElementsByClassName("bar")[barIndex];
        if (action === 'compare') {
          bar.style.backgroundColor = "orange"; // Highlight the current bars
        } else if (action === 'swap' || action === 'shift') {
          bar.style.backgroundColor = "red";
        } else if (action === 'insert') {
          bar.style.backgroundColor = "green";
        }
        bar.style.height = `${newHeight}px`;

        setTimeout(() => {
          // after a delay of sortingSpeed milliseconds, it resets the bar's background color to blue
          bar.style.backgroundColor = "blue"; 
        }, sortingSpeed);

        // the loop uses setTimeout to delay each animation step by i*sortingSpeed milliseconds. 
        //This ensure that animation are excuted sequentially 
      }, i * sortingSpeed);
    });

    setTimeout(() => {
      setStatusMessage("Sorting completed!");
      setIsSorting(false);
    }, animations.length * sortingSpeed);
  };

  /*
  -> mainly this fetching animation from the slected algorithm
  -> paasing the animations to animateSorting for visualization.
  */
  const handleSort = () => {
    if (!selectedAlgorithm) {
      alert("Please select a sorting algorithm first!");
      return;
    }
    // setSorting(true): This ensures that while sorting is in progress, other actions like
    // generating a new array or selecting a different algorithm are disabled.
    setIsSorting(true);
    //  setStatusMessage("Sorting in progress..."): Updates 
    //the UI with a message indicating that sorting has started 
    setStatusMessage("Sorting in progress...");
    let animations = [];
    switch (selectedAlgorithm) {
      case "Merge Sort":
        animations = mergeSort(array);
        break;
      case "Bubble Sort":
        animations = bubbleSort(array);
        break;
      case "Selection Sort":
        animations = selectionSort(array);
        break;
      case "Insertion Sort":
        animations = insertionSort(array);
        break;
      case "Heap Sort":
        animations = heapSort(array);
        break;
      case "Quick Sort":
        animations = quickSort(array);
        break;
      default:
        alert("Algorithm not recognized");
        return;
    }
    // animateSorting(animations) function is called with the list of animations
    // obtained from the chosed sorting function.
    animateSorting(animations);
  };

  const resetArray = () => {
    generateNewArray(); // this creates a fresh array with randomly generated numbers and updates the array state
    setStatusMessage("Array reset!");
  };

  return (
    <div className="visualizer-container">
      <div className="navbar">
        <button onClick={generateNewArray} disabled={isSorting}>
          Generate New Array
        </button>
        <div className="slider-container">
          <label>Array Size</label>
          <input
            type="range"
            min="10"
            max="200"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="slider-container">
          <label>Sorting Speed</label>
          <input
            type="range"
            min="1"
            max="50"
            value={sortingSpeed}
            onChange={(e) => setSortingSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="dropdown-container">
          <label>Select Algorithm</label>
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={isSorting}
          >
            <option value="">Choose</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Heap Sort">Heap Sort</option>
            <option value="Quick Sort">Quick Sort</option>
          </select>
        </div>
        <button onClick={handleSort} disabled={isSorting}>
          Sort
        </button>
        <button onClick={resetArray} disabled={isSorting}>
          Reset
        </button>
      </div>
      <div className="status-container">
        <p>{statusMessage}</p>
      </div>
      <div className="bar-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
