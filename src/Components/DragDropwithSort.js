import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DragDropItem from "./DragDropItem";

const DragDropwithSort = ({ data }) => {
  const [items, setItems] = useState([]);

  const [, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    drop: (draggedItem) => {
      setItems((prevItems) => [
        ...prevItems,
        { id: draggedItem.id, title: draggedItem.title },
      ]);
    },
  });

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const movedItem = updatedItems.splice(fromIndex, 1)[0];
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div
      ref={(node) => drop(node)}
      style={{ border: "2px dashed #ccc", padding: "16px" }}
    >
      <h2>Draggable and Droppable Container</h2>
      <div className="grid">
        {items.map((item, index) => (
          <DragDropItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default DragDropwithSort;
