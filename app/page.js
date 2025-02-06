// app/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import { FaMoon, FaSun } from "react-icons/fa";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, read dark mode preference from localStorage.
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newVal);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-700 transition-colors duration-300">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-gray-100">TaskFlow</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-300 dark:bg-gray-700 text-blue-800 dark:text-gray-100 transition-colors"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <Board />
      </div>
    </main>
  );
}
