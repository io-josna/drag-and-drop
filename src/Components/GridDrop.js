import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DroppableComponent1 = ({ data }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    drop: (item) => {
      setDroppedItems([...droppedItems, item.id]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const maxColumns = 2;

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.min(
      maxColumns,
      droppedItems.length
    )}, 1fr)`,
    gap: "8px",
    border: isOver && canDrop ? "2px dashed #ccc" : "2px dashed transparent",
    padding: "8px",
  };

  const gridItemStyles = {
    backgroundColor: "#f0f0f0",
    border: isOver && canDrop ? "5px dashed #ccc" : "1px solid transparent",
    padding: "8px",
  };

  return (
    <div ref={drop} style={{ border: "2px dashed #ccc", padding: "16px" }}>
      <h2>Container</h2>
      <div className="grid" style={gridStyles}>
        {droppedItems.map((itemId, index) => {
          const item = data.find((item) => item.id === itemId);
          if (item) {
            return (
              <div
                className="grid-item"
                key={index}
                style={{
                  ...gridItemStyles,
                }}
              >
                <h3>{item.title}</h3>
                <ul>
                  {item.name?.map((name, nameIndex) => (
                    <li key={nameIndex}>{name}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default DroppableComponent1;
