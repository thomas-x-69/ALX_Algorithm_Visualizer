import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../utils/arrayUtils";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = generateRandomArray(50, 5, 100);
    setArray(newArray);
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-semibold mb-4">Algorithm Visualizer</h2>
      <button
        onClick={generateNewArray}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate New Array
      </button>
      <div className="mt-4 h-64 flex items-end">
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
            }}
            className="bg-blue-500 mr-px"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
