import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "../types";
import IconItem from "./IconItem";
import PlateItem from "./PlateItem";
import { Grid } from "@mui/material";

const DropArea = ({
  children,
  textOnPlate,
  dateOnPlate,
}: {
  children: React.ReactNode;
  textOnPlate: string;
  dateOnPlate: string;
}) => {
  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  const PLATE_SIZE = { width: 100, height: 100 };
  const ICON_SIZE = { width: 50, height: 50 };

  const [, drop] = useDrop(() => ({
    accept: ["icon", "plate"],
    drop: (item: DraggableItem, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset && dropRef.current) {
        const dropAreaRect = dropRef.current.getBoundingClientRect();

        let itemSize = item.type === "plate" ? PLATE_SIZE : ICON_SIZE;

        const x = clientOffset.x - dropAreaRect.left - itemSize.width / 2;
        const y = clientOffset.y - dropAreaRect.top - itemSize.height / 2;

        console.log(item.id);
        setDroppedItems((prevItems) => {
          console.log(prevItems);
          const existingPlateIndex = prevItems.findIndex(
            (di) => di.type === "plate"
          );
          const existingDuplicateIndex = prevItems.findIndex(
            (di) => di.id === item.id
          );
          if (item.type === "plate") {
            if (existingPlateIndex !== -1) {
              const newItems = [...prevItems];
              newItems[existingPlateIndex] = { ...item, position: { x, y } };
              return newItems;
            } else {
              return [...prevItems, { ...item, position: { x, y } }];
            }
          } else {
            if (existingDuplicateIndex !== -1) {
              const newItems = [...prevItems];
              newItems[existingDuplicateIndex] = { ...item, position: { x, y } };
              return newItems;
            } else {
              return [...prevItems, { ...item, position: { x, y } }];
            }
          }
        });
      }
    },
  }));


  const moveItem = (id: string, x: number, y: number) => {
    setDroppedItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, position: { x, y } } : item
      )
    );
  };

  const deleteAllIcons = () => {
    setDroppedItems((prevItems) =>
      prevItems.filter((item) => item.type !== "icon")
    );
  };

  const deleteAllPlates = () => {
    setDroppedItems((prevItems) =>
      prevItems.filter((item) => item.type !== "plate")
    );
  };

  drop(dropRef);

  return (
    <Grid container
      ref={dropRef}
      justifyContent={"center"}
      className="relative w-full h-100 border-dashed border-4 border-gray-400"
    >
      {children}
      {droppedItems.map((item, index) =>
        item.type === "plate" ? (
          <PlateItem
            key={index}
            item={item}
            moveItem={moveItem}
            textOnPlate={textOnPlate}
            dateOnPlate={dateOnPlate}
          />
        ) : (
          <IconItem key={index} item={item} moveItem={moveItem} />
        )
      )}

      <button
        onClick={deleteAllIcons}
        className="absolute top-0 left-0 m-2 p-2 bg-red-500 text-white"
      >
        Delete Icons
      </button>
      <button
        onClick={deleteAllPlates}
        className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white"
      >
        Delete Plate
      </button>
    </Grid>
  );
};

export default DropArea;
