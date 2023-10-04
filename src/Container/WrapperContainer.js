import React from "react";
import DraggableItem from "../Components/DraggableItem";
import DroppableComponent from "../Components/DroppableComponent";
import DroppableContainer from "../Components/DroppableContainer";
import DragDropwithSort from "../Components/DragDropwithSort";
import DroppableItemComponent from "../Components/DroppableItem";
import DroppableComponent1 from "../Components/GridDrop";
import DragDropSort from "../Components/DragDropSort";
import DroppableComponent2 from "../Components/DroppableComponent2";
import DroppableComponent3 from "../Components/DroppableComponent3";

const WrapperContainer = () => {
  const data = [
    { id: 1, title: "Books", name: ["Hindi", "kannada", "English"] },
    { id: 2, title: "Pen", name: ["Ball Pen", "Ink Pen", "Pencil"] },
    { id: 3, title: "Capital", name: ["Ball Pen", "Ink Pen", "Pencil"] },
    { id: 4, title: "States", name: ["Ball Pen", "Ink Pen", "Pencil"] },
    { id: 5, title: "Cities", name: ["Ball Pen", "Ink Pen", "Pencil"] },
  ];

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div>
          <h2>Draggable Items</h2>
          {data.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {/* <DroppableComponent data={data} /> */}
          {/* <DroppableContainer data={data} /> implemented sorting */}
          {/* <DragDropwithSort data={data} /> */}
          {/* <DroppableItemComponent data={data} /> */}
          <DroppableComponent1 data={data} />
          {/* <DroppableComponent2 data={data} /> */}
          {/* <DroppableComponent3 data={data} /> */}
          {/* <DragDropSort /> */}
        </div>
      </div>
    </div>
  );
};

export default WrapperContainer;
