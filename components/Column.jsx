// components/Column.jsx
"use client";
import React, { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { FaEdit, FaTrash, FaSave, FaGripLines } from "react-icons/fa";

export default function Column({
  column,
  tasks,
  onDeleteColumn,
  onEditColumn,
  onAddTask,
  onDeleteTask,
  onEditTask,
  dragHandleProps, // received from SortableColumn wrapper
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleEditSave = () => {
    if (title.trim() && title !== column.title) {
      onEditColumn(column.id, title);
    }
    setIsEditing(false);
  };

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(column.id, newTaskContent);
      setNewTaskContent("");
    }
  };

  return (
    <div className="w-80 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Column drag handle */}
          <div {...dragHandleProps} className="cursor-move mr-3 text-gray-500 dark:text-gray-400">
            <FaGripLines />
          </div>
          {isEditing ? (
            <input
              className="border border-blue-200 dark:border-blue-600 p-1 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{column.title}</h2>
          )}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleEditSave}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <FaSave />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaEdit />
            </button>
          )}
          <button
            onClick={() => onDeleteColumn(column.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </SortableContext>
      {/* Add New Task */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
