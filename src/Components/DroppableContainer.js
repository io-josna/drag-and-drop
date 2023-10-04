import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import "../Styles/DroppableComponent.css";

const DraggableDroppableItem = ({ item, index, moveItem, onHover }) => {
  const [, ref] = useDrag({
    type: "DRAGGABLE_ITEM_TYPE",
    item: { id: item.id, index },
  });

  const [, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    hover: (draggedItem) => {
      if (draggedItem.id !== item.id) {
        onHover(draggedItem.index, index);
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

const DroppableContainer = ({ data }) => {
  const [items, setItems] = useState(data);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div
      style={{
        border: "2px dashed #ccc",
        padding: "16px",
      }}
    >
      <h2>Draggable and Droppable Container</h2>
      <div className="grid">
        {items.map((item, index) => (
          <DraggableDroppableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            onHover={moveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default DroppableContainer;
