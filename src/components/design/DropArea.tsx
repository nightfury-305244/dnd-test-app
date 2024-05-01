import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "../../types";
import IconItem from "./IconItem";
import PlateItem from "./PlateItem";
import { Box, Button, Grid } from "@mui/material";

interface DropAreaProps {
  children: React.ReactNode;
  textOnPlate: string;
  dateOnPlate: string;
  droppedItems: DraggableItem[];
  setDroppedItems: React.Dispatch<React.SetStateAction<DraggableItem[]>>;
}

const DropArea: React.FC<DropAreaProps> = ({
  children,
  textOnPlate,
  dateOnPlate,
  droppedItems,
  setDroppedItems,
}) => {
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
              newItems[existingDuplicateIndex] = {
                ...item,
                position: { x, y },
              };
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
    <Grid container direction={"row"} justifyContent={"center"} spacing={3}>
      <Grid item>
        <Box ref={dropRef} className="relative dropArea-size text-center">
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
        </Box>
      </Grid>
      <Grid item container spacing={3} justifyContent={"center"}>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={deleteAllIcons}
          >
            Delete Icons
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={deleteAllPlates}
          >
            Delete Plate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DropArea;
