# Algorithm Visualizer

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Architecture](#project-architecture)
5. [Setup Instructions](#setup-instructions)
6. [Usage Guidelines](#usage-guidelines)
7. [Development Process](#development-process)
8. [Key Achievements](#key-achievements)

## Project Overview

Algorithm Visualizer is a web application that provides an interactive platform for visualizing various sorting and searching algorithms. This project aims to reinforce data structure and algorithm concepts while showcasing the power of React for building dynamic user interfaces.

## Tech Stack

- JavaScript (React)
- HTML
- CSS (Tailwind CSS)
- Vite (Build tool)

## Features

- Visualize different sorting algorithms:
  - Bubble Sort
  - Quick Sort
  - Merge Sort
- Visualize searching algorithms:
  - Linear Search
  - Binary Search
- Filter between types of algorithms (sorting/searching)
- Responsive design for optimal viewing on various devices
- Adjustable visualization speed
- Generate new random arrays
- Step-by-step visualization with color-coded elements

## Project Architecture

The project follows a component-based architecture using React. Here's an overview of the main components and their responsibilities:

- `App.jsx`: The root component that sets up the overall layout and routing.
- `Header.jsx`: Displays the application title.
- `Footer.jsx`: Shows copyright information.
- `AlgorithmVisualizer.jsx`: The main component that handles the visualization logic, including:
  - State management for the array, algorithm selection, and visualization controls
  - Rendering of the array visualization
  - Implementation of sorting and searching algorithms
  - User interface for controls and settings

Key utilities and algorithm implementations:

- `utils/arrayUtils.js`: Contains functions for generating random arrays.
- `algorithms/bubbleSort.js`: Implements the Bubble Sort algorithm.
- `algorithms/quickSort.js`: Implements the Quick Sort algorithm.
- `algorithms/mergeSort.js`: Implements the Merge Sort algorithm.
- `algorithms/linearSearch.js`: Implements the Linear Search algorithm.
- `algorithms/binarySearch.js`: Implements the Binary Search algorithm.

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/thomas-x-69/ALX_Algorithm_Visualizer.git
   cd algorithm-visualizer
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console).

## Usage Guidelines

1. **Select Algorithm Type**: Choose between "Sorting" and "Searching" algorithms using the dropdown menu.

2. **Choose Specific Algorithm**: Select the desired algorithm (e.g., Bubble Sort, Quick Sort, Linear Search) from the second dropdown menu.

3. **Generate New Array**: Click the "Generate New Array" button to create a new random array for visualization.

4. **Adjust Speed**: Use the speed slider to control the visualization speed.

5. **Run Algorithm**: Click the "Run Algorithm" button to start the visualization.

6. **Stop Visualization**: If needed, use the "Stop" button to halt the ongoing visualization.

7. **Searching**: For search algorithms, enter a value in the input field before running the algorithm.

8. **Responsive Design**: The application adapts to different screen sizes. On mobile devices, it uses a smaller array size for better visualization.

## Development Process

1. **Initial Setup**: Set up the project using Vite and React, configuring Tailwind CSS for styling.

2. **Component Structure**: Created basic components for the header, footer, and main visualization area.

3. **Algorithm Implementation**: Implemented sorting and searching algorithms using generator functions for step-by-step visualization.

4. **Visualization Logic**: Developed the core visualization logic in the AlgorithmVisualizer component, including array rendering and animation controls.

5. **User Interface**: Designed and implemented a user-friendly interface with controls for algorithm selection, speed adjustment, and array generation.

6. **Responsiveness**: Adapted the layout and functionality for various screen sizes, including a specialized mobile view with a smaller array size.

7. **Testing and Refinement**: Conducted thorough testing across different devices and browsers, refining the user experience and fixing bugs.

## Key Achievements

- Successful implementation of multiple sorting and searching algorithms with real-time visualization.
- Creation of a responsive design that works well on both desktop and mobile devices.
- Development of an intuitive user interface that allows easy control and understanding of algorithm behavior.
- Efficient use of React hooks and state management for smooth animations and updates.
- Implementation of a dynamic array size based on device type, enhancing mobile user experience.

---

This project was developed as part of the ALX Software Engineering program, demonstrating proficiency in front-end development, algorithm implementation, and responsive web design.
