import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "../Styles/DroppableComponent.css";

const DragDropSort = ({ data }) => {
  const [droppedItemIds, setDroppedItemIds] = useState([]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    drop: (item) => {
      setDroppedItemIds([...droppedItemIds, item.id]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "8px",
    border: isOver && canDrop ? "2px dashed #ccc" : "2px dashed transparent", // Apply dashed border when an item is being dragged and can be dropped
    padding: "8px",
  };
  const gridItemStyles = {
    backgroundColor: "#f0f0f0",
    border: isOver && canDrop ? "5px dashed  #ccc" : "1px solid transparent", // Apply solid border when an item is being dragged and can be dropped
    padding: "8px",
  };
  // const gridRowStyles = {
  //   // display: "grid",
  //   gridTemplateColumns: "repeat(3, 1fr)",
  //   gap: "8px",
  //   border: isOver && canDrop ? "2px dashed #ccc" : "2px dashed transparent", // Apply dashed border to the entire row
  //   padding: "8px",
  // };

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed #ccc",
        padding: "16px",
      }}
    >
      <h2>Container</h2>
      <div className="grid" style={gridStyles}>
        {droppedItemIds?.map((itemId) => {
          const item = data?.find((item) => item.id === itemId);
          if (item) {
            return (
              <div className="grid-item" key={itemId} style={gridItemStyles}>
                <h3>{item.title}</h3>
                <ul>
                  {item?.name?.map((name, nameIndex) => (
                    <li key={nameIndex}>{name}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null; // Item not found in the data
        })}
      </div>
    </div>
  );
};

export default DragDropSort;
