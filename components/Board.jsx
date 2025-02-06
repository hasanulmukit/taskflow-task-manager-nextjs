// components/Board.jsx
"use client";
import React, { useState, useEffect } from "react";
import SortableColumn from "./SortableColumn";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

const defaultColumns = {
  "col-todo": {
    id: "col-todo",
    title: "To Do",
    tasks: [
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
    ],
  },
  "col-inprogress": {
    id: "col-inprogress",
    title: "In Progress",
    tasks: [{ id: "task-3", content: "Task 3" }],
  },
  "col-done": {
    id: "col-done",
    title: "Done",
    tasks: [{ id: "task-4", content: "Task 4" }],
  },
};

export default function Board() {
  // Initialize state from localStorage if available.
  const initialData = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kanban-board");
      if (stored) return JSON.parse(stored);
    }
    return {
      columns: defaultColumns,
      columnOrder: Object.keys(defaultColumns),
    };
  };

  const [data, setData] = useState(initialData);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  // Track the active draggable task for the overlay.
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kanban-board", JSON.stringify(data));
    }
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    const { active } = event;
    // If a task is being dragged (id does not start with "col-"), record it.
    if (!active.id.startsWith("col-")) {
      // Find the task object.
      let foundTask = null;
      data.columnOrder.forEach((colId) => {
        const task = data.columns[colId].tasks.find((t) => t.id === active.id);
        if (task) foundTask = { ...task, columnId: colId };
      });
      setActiveTask(foundTask);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    // Handle column dragging.
    if (active.id.startsWith("col-") && over.id.startsWith("col-")) {
      const oldIndex = data.columnOrder.indexOf(active.id);
      const newIndex = data.columnOrder.indexOf(over.id);
      const newOrder = arrayMove(data.columnOrder, oldIndex, newIndex);
      setData({ ...data, columnOrder: newOrder });
      return;
    }

    // Handle task dragging.
    let sourceColumnId = null;
    let targetColumnId = null;
    let activeTaskIndex = -1;
    let overTaskIndex = -1;

    data.columnOrder.forEach((colId) => {
      const tasks = data.columns[colId].tasks;
      const aIndex = tasks.findIndex((task) => task.id === active.id);
      const oIndex = tasks.findIndex((task) => task.id === over.id);
      if (aIndex > -1) {
        sourceColumnId = colId;
        activeTaskIndex = aIndex;
      }
      if (oIndex > -1) {
        targetColumnId = colId;
        overTaskIndex = oIndex;
      }
    });

    if (sourceColumnId && targetColumnId) {
      if (sourceColumnId === targetColumnId) {
        // Reorder tasks within the same column.
        const newTasks = arrayMove(
          data.columns[sourceColumnId].tasks,
          activeTaskIndex,
          overTaskIndex
        );
        setData({
          ...data,
          columns: {
            ...data.columns,
            [sourceColumnId]: {
              ...data.columns[sourceColumnId],
              tasks: newTasks,
            },
          },
        });
      } else {
        // Move task between columns.
        const sourceTasks = [...data.columns[sourceColumnId].tasks];
        const targetTasks = [...data.columns[targetColumnId].tasks];
        const [movedTask] = sourceTasks.splice(activeTaskIndex, 1);
        targetTasks.splice(overTaskIndex, 0, movedTask);
        setData({
          ...data,
          columns: {
            ...data.columns,
            [sourceColumnId]: {
              ...data.columns[sourceColumnId],
              tasks: sourceTasks,
            },
            [targetColumnId]: {
              ...data.columns[targetColumnId],
              tasks: targetTasks,
            },
          },
        });
      }
    }
  };

  // Column functions.
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    const newId = "col-" + uuidv4();
    const newColumn = { id: newId, title: newColumnTitle, tasks: [] };
    setData({
      columns: { ...data.columns, [newId]: newColumn },
      columnOrder: [...data.columnOrder, newId],
    });
    setNewColumnTitle("");
  };

  const handleDeleteColumn = (columnId) => {
    const newColumns = { ...data.columns };
    delete newColumns[columnId];
    const newOrder = data.columnOrder.filter((id) => id !== columnId);
    setData({ columns: newColumns, columnOrder: newOrder });
  };

  const handleEditColumn = (columnId, newTitle) => {
    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: { ...data.columns[columnId], title: newTitle },
      },
    });
  };

  // Task functions.
  const handleAddTask = (columnId, taskContent) => {
    if (!taskContent.trim()) return;
    const newTask = { id: "task-" + uuidv4(), content: taskContent };
    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          tasks: [...data.columns[columnId].tasks, newTask],
        },
      },
    });
  };

  const handleDeleteTask = (columnId, taskId) => {
    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          tasks: data.columns[columnId].tasks.filter((task) => task.id !== taskId),
        },
      },
    });
  };

  const handleEditTask = (columnId, taskId, newContent) => {
    const newTasks = data.columns[columnId].tasks.map((task) =>
      task.id === taskId ? { ...task, content: newContent } : task
    );
    setData({
      ...data,
      columns: {
        ...data.columns,
        [columnId]: { ...data.columns[columnId], tasks: newTasks },
      },
    });
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={data.columnOrder} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-nowrap overflow-x-auto p-6 space-x-6 bg-blue-50 dark:bg-gray-800 rounded-lg">
            {data.columnOrder.map((columnId) => (
              <SortableColumn
                key={columnId}
                column={data.columns[columnId]}
                tasks={data.columns[columnId].tasks}
                onDeleteColumn={handleDeleteColumn}
                onEditColumn={handleEditColumn}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))}
            {/* Add Column UI */}
            <div className="w-80 flex-shrink-0 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 shadow-md flex flex-col">
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Add Column</h2>
              <input
                type="text"
                placeholder="Column title..."
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="w-full border border-green-200 dark:border-green-600 p-2 rounded focus:outline-none focus:ring focus:border-green-300 dark:focus:border-green-500 mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
              <button
                onClick={handleAddColumn}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
              >
                Add Column
              </button>
            </div>
          </div>
        </SortableContext>
        <DragOverlay>
          {activeTask ? (
            <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
              <span className="text-gray-800 dark:text-gray-100">{activeTask.content}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
