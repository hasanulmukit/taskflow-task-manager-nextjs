// components/SortableColumn.jsx
"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "./Column";

export default function SortableColumn(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.column.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Pass drag handle props to the Column.
  const dragHandleProps = { ...attributes, ...listeners };

  return (
    <div ref={setNodeRef} style={style}>
      <Column {...props} dragHandleProps={dragHandleProps} />
    </div>
  );
}
