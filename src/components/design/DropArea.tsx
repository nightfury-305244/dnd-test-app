import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "../../types/types";
import IconItem from "./IconItem";
import PlateItem from "./PlateItem";
import { Box, Button, Grid, Typography } from "@mui/material";
import useLocalStorage from "../../store/useLocalStorage";

interface DropAreaProps {
  children: React.ReactNode;
  textOnPlate: string;
  dateOnPlate: string;
  droppedItems: DraggableItem[];
  setDroppedItems: React.Dispatch<React.SetStateAction<DraggableItem[]>>;
  initialShirtPrice: number; // Pass the initial shirt price as a prop
}

const DropArea: React.FC<DropAreaProps> = ({
  children,
  textOnPlate,
  dateOnPlate,
  droppedItems,
  setDroppedItems,
  initialShirtPrice
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const PLATE_SIZE = { width: 100, height: 100 };
  const ICON_SIZE = { width: 50, height: 50 };
  const [currentPrice, setCurrentPrice] = useLocalStorage<number>("currentPrice");
  const [price, setPrice] = useState<number>(currentPrice || initialShirtPrice);

  useEffect(() => {
    if (droppedItems.length > 0) {
      const newPrice = droppedItems.reduce((acc, item) => acc + item.price, initialShirtPrice);
      setPrice(newPrice);
      setCurrentPrice(newPrice);
    } else {
      setPrice(initialShirtPrice);
      setCurrentPrice(initialShirtPrice);
    }
  }, [droppedItems, setCurrentPrice, initialShirtPrice]);

  const [, drop] = useDrop(() => ({
    accept: ["icon", "plate"],
    drop: (item: DraggableItem, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset && dropRef.current) {
        const dropAreaRect = dropRef.current.getBoundingClientRect();
        let itemSize = item.type === "plate" ? PLATE_SIZE : ICON_SIZE;
        const x = clientOffset.x - dropAreaRect.left - itemSize.width / 2;
        const y = clientOffset.y - dropAreaRect.top - itemSize.height / 2;

        setDroppedItems((prevItems) => {
          const existingIndex = prevItems.findIndex(di => di._id === item._id && di.type === item.type);
  
          if (item.type === "plate") {
            const filteredItems = prevItems.filter(di => di.type !== "plate");
            return [...filteredItems, { ...item, position: { x, y } }];
          } else {
            if (existingIndex !== -1) {
              return prevItems.map(di => di._id === item._id ? { ...di, position: { x, y } } : di);
            } else {
              return [...prevItems, { ...item, position: { x, y } }];
            }
          }
        });      
      }
    },
  }));

  drop(dropRef);

  const moveItem = (itemId: string, x: number, y: number) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, position: { x, y } } : item
      )
    );
  };
  
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
        <Button variant="outlined" size="small" color="error" onClick={() => setDroppedItems(prev => prev.filter(item => item.type !== "icon"))}>Delete Icons</Button>
        <Button variant="outlined" size="small" color="error" onClick={() => setDroppedItems(prev => prev.filter(item => item.type !== "plate"))}>Delete Plate</Button>
      </Grid>
      <Grid item>
        <Typography variant="body1">Current Price: {price}</Typography>
      </Grid>
    </Grid>
  );
};

export default DropArea;
