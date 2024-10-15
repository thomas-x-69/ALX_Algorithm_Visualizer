import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../utils/arrayUtils";
import { bubbleSort } from "../algorithms/bubbleSort";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState([]);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = generateRandomArray(50, 5, 100);
    setArray(newArray);
    setComparing([]);
  };

  const runBubbleSort = async () => {
    setSorting(true);
    const sorter = bubbleSort([...array]);
    for (let step of sorter) {
      setArray(step.array);
      setComparing(step.comparing);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setComparing([]);
    setSorting(false);
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-semibold mb-4">Bubble Sort Visualizer</h2>
      <div className="mb-4">
        <button
          onClick={generateNewArray}
          disabled={sorting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Generate New Array
        </button>
        <button
          onClick={runBubbleSort}
          disabled={sorting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Bubble Sort
        </button>
      </div>
      <div className="h-64 flex items-end">
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
            }}
            className={`mr-px ${
              comparing.includes(index) ? "bg-red-500" : "bg-blue-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
