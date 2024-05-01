import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableItem } from "../../types";

type MoveItemFunction = (id: string, x: number, y: number) => void;

const PlateItem = ({
  item,
  moveItem,
  textOnPlate,
  dateOnPlate,
}: {
  item: DraggableItem;
  moveItem: MoveItemFunction;
  textOnPlate: string;
  dateOnPlate: string;
}) => {
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: item.type, // 'plate'
    item: item,
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.position.x + delta.x);
        const y = Math.round(item.position.y + delta.y);
        moveItem(item.id, x, y);
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
        src={item.url}
        alt={`Dropped ${item.type}`}
        style={{ width: "100px", height: "100px" }}
      />
      <div
        className="plate-text"
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {textOnPlate}
        <br />
        {dateOnPlate}
      </div>
    </div>
  );
};

export default PlateItem;
