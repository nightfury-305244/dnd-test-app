import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { DraggableItem } from "../data/icons";

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
  const [plate, setPlate] = useState<DraggableItem | null>(null);
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

        if (item.type === "plate") {
          setPlate({ ...item, position: { x, y } });
        } else {
          const newItem = { ...item, position: { x, y } };
          setDroppedItems((currentItems) => [...currentItems, newItem]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const deleteAllIcons = () => {
    setDroppedItems([]);
  };

  const deletePlate = () => {
    setPlate(null);
  };

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className="relative w-full h-100 border-dashed border-4 border-gray-400"
    >
      {children}
      {plate && (
        <div
          style={{
            position: "absolute",
            left: plate.position.x,
            top: plate.position.y,
          }}
        >
          <img
            src={plate.url}
            alt={`Dropped ${plate.type}`}
            className="plate-image"
          />
          <span
            className="plate-text"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {textOnPlate}
            <br />
            {dateOnPlate}
          </span>
        </div>
      )}
      {droppedItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: item.position.x,
            top: item.position.y,
          }}
        >
          <img
            src={item.url}
            alt={`Dropped ${item.type}`}
            className="icon-image"
          />
        </div>
      ))}

      <button
        onClick={deleteAllIcons}
        className="absolute top-0 left-0 m-2 p-2 bg-red-500 text-white"
      >
        Delete Icons
      </button>
      <button
        onClick={deletePlate}
        className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white"
      >
        Delete Plate
      </button>
    </div>
  );
};

export default DropArea;
