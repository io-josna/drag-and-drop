import React from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import { COLUMN, COMPONENT, ROW, SIDEBAR_ITEM } from "../Utils/Constants";

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN];

const DropZone = ({ data, onDrop, isLast, className }) => {
  console.log("data in dropzone is .....!!!!!", data);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      console.log("item is .............!!", item);
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath?.split("-");
      const itemPath = item.path;

      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        // if (data.childrenCount >= 3) {
        //  return false;
        // }
        return true;
        //Using !itemPath ensures that only null, undefined, and an empty string allow the drop operation.
      }

      const splitItemPath = itemPath?.split("-");

      // limit columns when dragging from one row to another row
      const dropZonePathRowIndex = splitDropZonePath[0];

      const itemPathRowIndex = splitItemPath[0];

      const diffRow = dropZonePathRowIndex !== itemPathRowIndex;
      if (
        diffRow &&
        splitDropZonePath.length === 2 &&
        data.childrenCount >= 4
      ) {
        return false;
      }

      // Invalid (Can't drop a parent element (row) into a child (column))
      const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
      if (parentDropInChild) return false;

      // Current item can't possible move to it's own location
      if (itemPath === dropZonePath) return false;

      // Current area
      if (splitItemPath.length === splitDropZonePath?.length) {
        const pathToItem = splitItemPath?.slice(0, -1)?.join("-");
        const currentItemIndex = Number(splitItemPath?.slice(-1)[0]);

        const pathToDropZone = splitDropZonePath?.slice(0, -1)?.join("-");
        const currentDropZoneIndex = Number(splitDropZonePath?.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return false;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      id={`dropZone-${data.path}`}
      className={classNames(
        "dropZone",
        { active: isActive, isLast },
        className
      )}
      ref={drop}
    >
      {" "}
      {isOver && <div>Drop Here!</div>}
    </div>
  );
};
export default DropZone;
