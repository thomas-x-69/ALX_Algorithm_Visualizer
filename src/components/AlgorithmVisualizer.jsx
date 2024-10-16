import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../utils/arrayUtils";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = generateRandomArray(50, 5, 100);
    setArray(newArray);
    setComparing([]);
  };

  const runSortingAlgorithm = async () => {
    setSorting(true);
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
    for (let step of sorter) {
      setArray(step.array);
      setComparing(step.comparing);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setComparing([]);
    setSorting(false);
  };
  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Sorting Algorithm Visualizer
      </h2>
      <div className="mb-6 flex flex-wrap items-center">
        <button
          onClick={generateNewArray}
          disabled={sorting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          Generate New Array
        </button>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={sorting}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 mr-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <button
          onClick={runSortingAlgorithm}
          disabled={sorting}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          Run{" "}
          {selectedAlgorithm.charAt(0).toUpperCase() +
            selectedAlgorithm.slice(1)}{" "}
          Sort
        </button>
      </div>
      <div className="h-64 flex items-end bg-white p-4 rounded-lg shadow-lg">
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
