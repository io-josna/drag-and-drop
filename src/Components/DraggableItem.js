import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE_ITEM_TYPE",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "8px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        backgroundColor: "grey",
      }}
    >
      {item.title}
    </div>
  );
};

export default DraggableItem;
