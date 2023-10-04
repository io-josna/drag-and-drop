import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DragDropItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "DRAGGABLE_ITEM_TYPE",
    item: { id: item.id, index },
  });

  const [, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const itemStyles = {
    backgroundColor: "#f0f0f0",
    padding: "8px",
    margin: "1%",
  };

  return (
    <div ref={(node) => ref(drop(node))} style={itemStyles}>
      <h3>{item.title}</h3>
      <ul>
        {item.name?.map((name, nameIndex) => (
          <li key={nameIndex}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DragDropItem;
