import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Column = ({ width, onColumnDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { width },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        width: `${width}%`,
        border: "1px solid #ccc",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      Column (Width: {width}%)
    </div>
  );
};

const DropTarget = ({ onColumnDrop }) => {
  const [, drop] = useDrop({
    accept: "COLUMN",
    drop: (droppedColumn) => {
      // Handle the column drop logic here
      // Access droppedColumn.width to get the column width
      // For example, you can update a list of columns with the dropped column
      onColumnDrop(droppedColumn.width);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed #000",
        minHeight: "100px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="suggestion">Drop Here (12 columns)</div>
      <div className="suggestion">Drop Here (6 columns)</div>
    </div>
  );
};

const DragDropwitGrid = () => {
  const [columns, setColumns] = useState([]); // State to manage columns in your grid

  const handleColumnDrop = (width) => {
    // Update the grid layout with the dropped column width
    setColumns([...columns, width]);
  };
  return (
    <div>
      <h1>Grid System</h1>
      {columns.map((width, index) => (
        <Column key={index} width={width} onColumnDrop={handleColumnDrop} />
      ))}
      <DropTarget onColumnDrop={handleColumnDrop} />
    </div>
  );
};

export default DragDropwitGrid;
