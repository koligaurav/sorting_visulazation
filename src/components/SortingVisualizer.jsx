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
      Math.floor(Math.random() * 500)
    );
    setArray(newArr);
    setStatusMessage("New array generated!");
  };

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
          bar.style.backgroundColor = "blue"; // Reset color after some time
        }, sortingSpeed);
      }, i * sortingSpeed);
    });

    setTimeout(() => {
      setStatusMessage("Sorting completed!");
      setIsSorting(false);
    }, animations.length * sortingSpeed);
  };

  const handleSort = () => {
    if (!selectedAlgorithm) {
      alert("Please select a sorting algorithm first!");
      return;
    }
    setIsSorting(true);
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
    animateSorting(animations);
  };

  const resetArray = () => {
    generateNewArray();
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
