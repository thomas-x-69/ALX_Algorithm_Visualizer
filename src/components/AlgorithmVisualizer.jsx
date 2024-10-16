// src/components/AlgorithmVisualizer.jsx
import React, { useState, useEffect, useRef } from "react";
import { generateRandomArray } from "../utils/arrayUtils";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(50);
  const [paused, setPaused] = useState(false);
  const sorterRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    generateNewArray();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const generateNewArray = () => {
    const newArray = generateRandomArray(50, 5, 100);
    setArray(newArray);
    setComparing([]);
    if (sorterRef.current) {
      sorterRef.current = null;
    }
    setSorting(false);
    setPaused(false);
  };

  const runSortingAlgorithm = async () => {
    if (sorting) return;
    setSorting(true);
    setPaused(false);
    let sorter;
    switch (selectedAlgorithm) {
      case "bubble":
        sorter = bubbleSort([...array]);
        break;
      case "quick":
        sorter = quickSort([...array]);
        break;
      case "merge":
        sorter = mergeSort([...array]);
        break;
      default:
        sorter = bubbleSort([...array]);
    }
    sorterRef.current = sorter;
    await runSorter();
  };

  const runSorter = async () => {
    if (!sorterRef.current) return;

    const step = async () => {
      if (paused) return;

      const { value, done } = sorterRef.current.next();
      if (done) {
        setSorting(false);
        setComparing([]);
        sorterRef.current = null;
        return;
      }

      setArray(value.array);
      setComparing(value.comparing);

      timeoutRef.current = setTimeout(step, 101 - speed);
    };

    await step();
  };

  const pauseSorting = () => {
    setPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeSorting = () => {
    setPaused(false);
    runSorter();
  };

  const stepForward = async () => {
    if (sorterRef.current) {
      const { value, done } = sorterRef.current.next();
      if (!done) {
        setArray(value.array);
        setComparing(value.comparing);
      } else {
        setSorting(false);
        setComparing([]);
        sorterRef.current = null;
      }
    }
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Sorting Algorithm Visualizer
      </h2>
      <div className="mb-6 flex flex-wrap items-center">
        <button
          onClick={generateNewArray}
          disabled={sorting && !paused}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
        >
          Generate New Array
        </button>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={sorting && !paused}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 mr-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <button
          onClick={runSortingAlgorithm}
          disabled={sorting && !paused}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
        >
          Run{" "}
          {selectedAlgorithm.charAt(0).toUpperCase() +
            selectedAlgorithm.slice(1)}{" "}
          Sort
        </button>
        <div className="flex items-center mt-4 w-full">
          <label htmlFor="speed" className="mr-2">
            Speed:
          </label>
          <input
            type="range"
            id="speed"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full max-w-xs"
          />
        </div>
      </div>
      <div className="mb-4 flex space-x-2">
        {sorting && !paused ? (
          <button
            onClick={pauseSorting}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Pause
          </button>
        ) : sorting && paused ? (
          <button
            onClick={resumeSorting}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Resume
          </button>
        ) : null}
        {sorting && paused && (
          <button
            onClick={stepForward}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Step Forward
          </button>
        )}
      </div>
      <div className="h-64 md:h-96 flex items-end bg-white p-4 rounded-lg shadow-lg">
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
            }}
            className={`mr-px transition-all duration-300 ease-in-out ${
              comparing.includes(index)
                ? "bg-red-500"
                : sorting
                ? "bg-yellow-400"
                : "bg-blue-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
