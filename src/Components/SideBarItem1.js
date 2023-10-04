import React from "react";

const SideBarItem1 = ({ data }) => {
  const [isDragging, drag] = useDrag({
    type: data.type,
    item: { id: data.id, data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      className="sideBarItem"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {data.component.type}
    </div>
  );
};

export default SideBarItem1;
