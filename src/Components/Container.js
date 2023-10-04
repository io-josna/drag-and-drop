import React, { useCallback, useState } from "react";
import initialData from "../Utils/initial-data";
import { SIDEBAR_ITEMS } from "../Utils/Constants";
import SideBarItem1 from "../Components/SideBarItem1";

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDrop = useCallback(
    (dropZone, item)=>{
        const splitDropZonePath= dropZone.path.split("-");
        const pathToDropZone= splitDropZonePath.slice(0,-1).join("-")
    }
  );
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem1 key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;
            return (
              <React.Fragment>
                <DropZone1
                  data={{ path: currentPath, childrenCount: layout.length }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Container;
