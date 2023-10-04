import React, { useCallback, useState } from "react";
import initialData from "../Utils/initial-data";
import { COMPONENT, SIDEBAR_ITEM, SIDEBAR_ITEMS } from "../Utils/Constants";
import SideBarItem from "./SideBarItem";
import "../Styles/style.css";
import {
  handleMoveSidebarComponentIntoParent,
  handleMoveToDifferentParent,
  handleMoveWithinParent,
} from "./helpers";
import Row from "./Row";
import DropZone from "./DropZone";
import shortid from "shortid";

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log("dropZone", dropZone);
      console.log("item", item);

      const splitDropZonePath = dropZone.path?.split("-");
      const pathToDropZone = splitDropZonePath?.slice(0, -1)?.join("-");

      const newItem = { id: item.id, type: item.type };
      // if (item.type === COLUMN) {
      //   newItem.children = item.children;
      // }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path?.split("-");
      const pathToItem = splitItemPath?.slice(0, -1)?.join("-");
      console.log("splitItemPath is :", splitItemPath);
      console.log("Item path is :", item.path);
      // 2. Pure move (no create)
      if (splitItemPath?.length === splitDropZonePath?.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS)?.map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout?.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout?.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        {/* <TrashDropZone
          data={{
            layout
          }}
          onDrop={handleDropToTrashBin}
        /> */}
      </div>
    </div>
  );
};
export default Container;