import { useDrag } from "react-dnd";
import { useRef } from "react";
import { DraggableItem } from "../../types/types";

type MoveItemFunction = (id: string, x: number, y: number) => void;

interface IconItemProps {
  item: DraggableItem;
  moveItem: MoveItemFunction;
}

const IconItem: React.FC<IconItemProps> = ({ item, moveItem }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drag] = useDrag({
    type: "symbol",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.position.x + delta.x);
        const y = Math.round(item.position.y + delta.y);
        moveItem(draggedItem.symbol._id, x, y);
      }
    },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: item.position.x,
        top: item.position.y,
        cursor: "move",
      }}
    >
      <img
        src={item.symbol.url}
        alt={`Dropped ${item.symbol.alt}`}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default IconItem;
