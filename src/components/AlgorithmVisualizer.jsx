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
  const [speed, setSpeed] = useState(10);
  const [algorithmType, setAlgorithmType] = useState("sorting");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const algorithmRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    generateNewArray();
  }, [isMobile]);

  const generateNewArray = () => {
    const arraySize = isMobile ? 10 : 50;
    const newArray = generateRandomArray(arraySize, 5, 100);
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

      timeoutRef.current = setTimeout(step, 120 - speed);
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
    <div className="flex-1 p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-indigo-800 text-center">
        Algorithm Visualizer
      </h2>
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={generateNewArray}
          disabled={sorting || searching}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
          className="bg-white text-indigo-800 border-2 border-indigo-300 rounded-lg py-2 px-4 sm:py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-sm sm:text-base"
        >
          <option value="sorting">Sorting</option>
          <option value="searching">Searching</option>
        </select>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={sorting || searching}
          className="bg-white text-indigo-800 border-2 border-indigo-300 rounded-lg py-2 px-4 sm:py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-sm sm:text-base"
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
            className="border-2 border-indigo-300 rounded-lg py-2 px-4 sm:py-3 sm:px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-sm sm:text-base"
          />
        )}
        <button
          onClick={runAlgorithm}
          disabled={sorting || searching}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          Run Algorithm
        </button>
      </div>
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <label
          htmlFor="speed"
          className="mr-2 sm:mr-4 text-indigo-800 font-semibold text-base sm:text-lg"
        >
          Speed:
        </label>
        <input
          type="range"
          id="speed"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-48 sm:w-64 accent-indigo-600"
        />
        <span className="ml-2 sm:ml-4 text-indigo-800 font-semibold text-base sm:text-lg">
          {speed}
        </span>
      </div>
      {(sorting || searching) && (
        <div className="mb-6 sm:mb-8 flex justify-center">
          <button
            onClick={stopAlgorithm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
          >
            Stop
          </button>
        </div>
      )}
      {error && (
        <div className="mb-6 sm:mb-8 text-red-600 font-semibold text-center text-sm sm:text-base bg-red-100 py-2 px-4 rounded-lg">
          {error}
        </div>
      )}
      <div className="h-64 sm:h-96 flex items-end bg-white p-4 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {array.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end h-full"
            style={{ width: `${100 / array.length}%` }}
          >
            <div
              style={{
                height: `${value}%`,
                width: isMobile ? "60%" : "80%",
              }}
              className={`transition-all duration-300 ease-in-out rounded-t-lg ${
                comparing.includes(index)
                  ? "bg-red-500"
                  : sorting || searching
                  ? "bg-yellow-400"
                  : "bg-indigo-500"
              }`}
            ></div>
            <span className="text-xs mt-1 sm:mt-2 text-indigo-800 font-medium">
              {value}
            </span>
          </div>
        ))}
      </div>
      {algorithmType === "searching" && searchResult !== null && (
        <div className="mt-6 sm:mt-8 text-center bg-indigo-100 py-3 px-4 sm:py-4 sm:px-6 rounded-lg shadow-md">
          <p className="text-lg sm:text-xl font-bold text-indigo-800">
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
