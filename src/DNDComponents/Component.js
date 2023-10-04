import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "../Utils/Constants";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: { id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);
  console.log("components are", components);
  const component = components[data.id];
  console.log("component is ,", component);
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      {/* <div>{data.id}</div> */}
      {component && component.content ? (
        <div>{component.content}</div>
      ) : (
        <div>Content not available</div>
      )}
    </div>
  );
};
export default Component;
