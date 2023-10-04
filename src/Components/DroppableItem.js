import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd"; // Import useDrag
import "../Styles/DroppableComponent.css";

const DroppableComponent = ({ data }) => {
  const [droppedItemIds, setDroppedItemIds] = useState([]);

  // Define useDrag to make DroppableComponent a drag source
  const [{ isDragging }, drag] = useDrag({
    type: "DROPPABLE_COMPONENT_TYPE", // Define a unique type for the drag source
    item: { id: "DroppableComponent" }, // Include an ID for the drag source
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["DROPPABLE_COMPONENT_TYPE", "DRAGGABLE_ITEM_TYPE"], // Accept both DroppableComponent and DraggableItem types
    drop: (item) => {
      // Handle the drop event
      if (item.id === "DroppableComponent") {
        // Handle drop of DroppableComponent itself
        // You can add your custom logic here
      } else {
        // Handle drop of DraggableItem onto DroppableComponent
        setDroppedItemIds([...droppedItemIds, item.id]); // Allow the same item to be dropped multiple times
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
    border: isOver && canDrop ? "2px dashed #ccc" : "2px dashed transparent",
    padding: "8px",
  };

  const gridItemStyles = {
    backgroundColor: "#f0f0f0",
    border: isOver && canDrop ? "5px dashed  #ccc" : "1px solid transparent",
    padding: "8px",
  };

  return (
    <div
      ref={(node) => {
        drag(drop(node)); // Combine drag and drop refs
      }}
      style={{
        border: "2px dashed #ccc",
        padding: "16px",
        opacity: isDragging ? 0.5 : 1, // Adjust opacity when dragging
      }}
    >
      <h2>Container</h2>
      <div className="grid" style={gridStyles}>
        {droppedItemIds?.map((itemId) => {
          const item = data?.find((item) => item.id === itemId);
          if (item) {
            return (
              <div
                className="grid-item"
                key={itemId}
                style={gridItemStyles}
                draggable={true} // Make grid items draggable
              >
                <h3>{item.title}</h3>
                <ul>
                  {item?.name?.map((name, nameIndex) => (
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

export default DroppableComponent;
