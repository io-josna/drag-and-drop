import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "../Utils/Constants";

const style = {
  border: "1px dashed black",
  // padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path }) => {
  // const [{ isDragging }, drag] = useDrag({
  //   type: COMPONENT,
  //   item: { id: data.id, path },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });
  // const opacity = isDragging ? 0 : 1;
  const component = components[data.id];

  return (
    <div
      // ref={drag}
      style={{ ...style }}
      className="component draggable"
    >
      {component && component.content ? (
        <div>{component.content}</div>
      ) : (
        <div>Content not available</div>
      )}
    </div>
  );
};
export default Component;
