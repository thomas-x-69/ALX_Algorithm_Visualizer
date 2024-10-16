import { useState, useEffect, useRef } from "react";
import { generateRandomArray } from "../utils/arrayUtils";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";
import { linearSearch } from "../algorithms/linearSearch";
import { binarySearch } from "../algorithms/binarySearch";

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(50);
  const [algorithmType, setAlgorithmType] = useState("sorting");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const algorithmRef = useRef(null);
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
    if (algorithmRef.current) {
      algorithmRef.current = null;
    }
    setSorting(false);
    setSearching(false);
    setSearchResult(null);
    setError("");
  };

  const runAlgorithm = async () => {
    if (sorting || searching) return;
    if (algorithmType === "sorting") {
      runSortingAlgorithm();
    } else {
      runSearchAlgorithm();
    }
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
    algorithmRef.current = sorter;
    await runAlgorithmSteps();
  };

  const runSearchAlgorithm = async () => {
    if (!searchValue) return;
    setSearching(true);
    setSearchResult(null);
    setError("");
    let searcher;
    const searchValueInt = parseInt(searchValue, 10);
    if (selectedAlgorithm === "linear") {
      searcher = linearSearch([...array], searchValueInt);
    } else {
      // Check if the array is sorted for binary search
      if (!isSorted(array)) {
        setError("Array must be sorted for binary search.");
        setSearching(false);
        return;
      }
      searcher = binarySearch([...array], searchValueInt);
    }
    algorithmRef.current = searcher;
    await runAlgorithmSteps();
  };

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const runAlgorithmSteps = async () => {
    if (!algorithmRef.current) return;

    const step = async () => {
      const { value, done } = algorithmRef.current.next();
      if (done) {
        setSorting(false);
        setSearching(false);
        setComparing([]);
        algorithmRef.current = null;
        if (algorithmType === "searching") {
          setSearchResult(value);
        }
        return;
      }

      if (algorithmType === "sorting") {
        setArray(value.array);
        setComparing(value.comparing);
      } else {
        setComparing(value.comparing);
      }

      timeoutRef.current = setTimeout(step, 101 - speed);
    };

    await step();
  };

  const stopAlgorithm = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSorting(false);
    setSearching(false);
    setComparing([]);
    algorithmRef.current = null;
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Algorithm Visualizer
      </h2>
      <div className="mb-6 flex flex-wrap items-center">
        <button
          onClick={generateNewArray}
          disabled={sorting || searching}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
        >
          Generate New Array
        </button>
        <select
          value={algorithmType}
          onChange={(e) => {
            setAlgorithmType(e.target.value);
            setSelectedAlgorithm(
              e.target.value === "sorting" ? "bubble" : "linear"
            );
          }}
          disabled={sorting || searching}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 mr-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="sorting">Sorting</option>
          <option value="searching">Searching</option>
        </select>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={sorting || searching}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 mr-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          {algorithmType === "sorting" ? (
            <>
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
            </>
          ) : (
            <>
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
            </>
          )}
        </select>
        {algorithmType === "searching" && (
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter search value"
            className="border border-gray-300 rounded-md py-2 px-4 mr-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
        )}
        <button
          onClick={runAlgorithm}
          disabled={sorting || searching}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
        >
          Run Algorithm
        </button>
        <div className="flex items-center mt-4 w-full">
          <label htmlFor="speed" className="mr-2 text-gray-700 font-semibold">
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
          <span className="ml-2 text-gray-700 font-semibold">{speed}</span>
        </div>
      </div>
      {(sorting || searching) && (
        <div className="mb-4">
          <button
            onClick={stopAlgorithm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Stop
          </button>
        </div>
      )}
      {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
      <div className="h-64 md:h-96 flex items-end bg-white p-4 rounded-lg shadow-lg relative">
        {array.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end h-full ml-1"
            style={{ width: `${100 / array.length}%` }}
          >
            <div
              style={{
                height: `${value}%`,
                width: "100%",
              }}
              className={`transition-all duration-300 ease-in-out ${
                comparing.includes(index)
                  ? "bg-red-500"
                  : sorting || searching
                  ? "bg-yellow-400"
                  : "bg-blue-500"
              }`}
            ></div>
            <span className="text-xs mt-1 text-gray-600">{value}</span>
          </div>
        ))}
      </div>
      {algorithmType === "searching" && searchResult !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            {searchResult !== -1
              ? `Value ${searchValue} found at index ${searchResult}`
              : `Value ${searchValue} not found in the array`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
