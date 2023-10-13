import React from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import { COLUMN, COMPONENT, ROW, SIDEBAR_ITEM } from "../Utils/Constants";

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN];

const DropZone = ({ data, onDrop, isLast, className }) => {
  console.log("Data in dropzone component is:", data);
  console.log("isLast prop in dropzone component is:", isLast);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
      console.log(
        "item and data in on Drop with drop in DropZone component is:",
        data,
        item
      );
    },
    canDrop: (item, monitor) => {
      // if (
      //   data.path === undefined &&
      //   item.type === SIDEBAR_ITEM &&
      //   item.data.component.type === "Two-Column-Block"
      // ) {
      //   return true;
      // }
      console.log("item in dropZone component is :", item);
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath?.split("-");
      const itemPath = item.path;
      console.log("Item in dropzone###########################", item);
      console.log("dropZone path in dropZone component is :", dropZonePath);
      console.log("item path in dropZone component is :::", itemPath);
      console.log(
        "splitDropZonePath path in dropZone component is :",
        splitDropZonePath
      );
      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        // if (data.childrenCount >= 3) {
        //  return false;
        // }
        return true;
        //Using !itemPath ensures that only null, undefined, and an empty string allow the drop operation.
      }

      const splitItemPath = itemPath?.split("-");
      console.log(
        "splitItemPath in dropZone component is????????? :::",
        splitItemPath
      );
      // limit columns when dragging from one row to another row
      const dropZonePathRowIndex = splitDropZonePath[0];
      console.log(
        "dropZonePathRowIndex in dropZone component is@@@@@@@@@ :::",
        dropZonePathRowIndex
      );
      const itemPathRowIndex = splitItemPath[0];
      console.log(
        "itemPathRowIndex in dropZone component is@@@@ROW@@@@@ :::",
        itemPathRowIndex
      );
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
    />
  );
};
export default DropZone;
