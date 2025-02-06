// components/Task.jsx
"use client";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaSave, FaGripLines } from "react-icons/fa";

export default function Task({ task, columnId, onDeleteTask, onEditTask }) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } =
    useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);

  const handleEditSave = () => {
    if (content.trim() && content !== task.content) {
      onEditTask(columnId, task.id, content);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm mb-3 flex items-center transition-transform duration-150 hover:shadow-lg"
    >
      {/* Drag handle */}
      <div {...attributes} {...listeners} className="cursor-move mr-3 text-gray-500 dark:text-gray-400">
        <FaGripLines />
      </div>
      {/* Task content */}
      <div className="flex-1">
        {isEditing ? (
          <input
            className="border border-blue-200 dark:border-blue-600 p-1 rounded w-full focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-gray-800 dark:text-gray-100">{task.content}</span>
        )}
      </div>
      {/* Action buttons */}
      <div className="flex space-x-2 ml-3">
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditSave();
            }}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <FaSave />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaEdit />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(columnId, task.id);
          }}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
