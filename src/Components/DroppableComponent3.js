import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DroppableComponent3 = ({ data }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const maxColumns = 2;

  const [, drop] = useDrop({
    accept: "DRAGGABLE_ITEM_TYPE",
    drop: (item, monitor) => {
      const { id } = item;
      const { row, col } = monitor.getClientOffset();

      const newRow = Math.floor(row / 100);
      const newCol = Math.floor(
        (col - 16) / ((window.innerWidth - 32) / maxColumns)
      );

      const itemInSamePosition = droppedItems.find(
        (dItem) => dItem.row === newRow && dItem.col === newCol
      );

      if (!itemInSamePosition) {
        setDroppedItems([...droppedItems, { id, row: newRow, col: newCol }]);
      }
    },
  });

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
    gap: "8px",
    padding: "8px",
  };

  const gridItemStyles = {
    backgroundColor: "#f0f0f0",
    border: "1px solid transparent",
    padding: "8px",
  };

  return (
    <div ref={drop} style={{ border: "2px dashed #ccc", padding: "16px" }}>
      <h2>Container</h2>
      <div className="grid" style={gridStyles}>
        {data.map((dataItem) => {
          const { id } = dataItem;
          const droppedItem = droppedItems.find((item) => item.id === id);

          if (droppedItem) {
            const { row, col } = droppedItem;

            return (
              <div
                className="grid-item"
                key={id}
                style={{
                  ...gridItemStyles,
                  gridColumn: `span 1`,
                  gridRow: `span ${dataItem.name.length}`,
                  gridArea: `${row + 1} / ${col + 1} / span ${
                    dataItem.name.length
                  }`,
                }}
              >
                <h3>{dataItem.title}</h3>
                <ul>
                  {dataItem.name.map((nameItem, nameIndex) => (
                    <li key={nameIndex}>{nameItem}</li>
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

export default DroppableComponent3;
