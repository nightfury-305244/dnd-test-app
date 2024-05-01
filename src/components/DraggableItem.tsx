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
      ? "icon-image mx-2 cursor-grab hover:cursor-grabbing w-30 h-30 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      : "plate-image mx-2 cursor-grab hover:cursor-grabbing w-30 h-30 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300";

  return (
    <img ref={drag} src={url} alt={`Draggable ${type}`} className={className} />
  );
};

export default DraggableItem;
