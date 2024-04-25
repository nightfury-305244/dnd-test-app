import { useDrag } from "react-dnd";

const DraggableItem = ({
  id,
  url,
  type,
}: {
  id: string;
  url: string;
  type: string;
}) => {
  const [{ }, drag] = useDrag(() => ({
    type: type,
    item: { id, type, url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const className =
    type === "icon"
      ? "icon-image cursor-grab hover:cursor-grabbing w-20 h-20 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      : "plate-image cursor-grab hover:cursor-grabbing w-20 h-20 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300";

  return (
    <img ref={drag} src={url} alt={`Draggable ${type}`} className={className} />
  );
};

export default DraggableItem;
