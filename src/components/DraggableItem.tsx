import { useDrag } from "react-dnd";
import { styled } from "@mui/material";

const OverlayContainer = styled("div")(() => ({
  position: "relative",
  margin: "0 10px",
  cursor: "grab",
  transition: "all 0.3s",
  "&:hover .hover-overlay": {
    opacity: 1,
  },
  "&:hover img": {
    filter: "blur(3px)",
    transform: "scale(1.05)",
  },
}));

const Overlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s",
  borderRadius: "8px",
  padding: "5px",
  textAlign: "center",
}));

const DraggableItem = ({
  _id,
  url,
  type,
  price,
}: {
  _id: string;
  url: string;
  type: string;
  price: number;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { _id, type, url, price },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const imgStyle = {
    filter: isDragging ? "none" : "blur(0)",
    transform: isDragging ? "none" : "scale(1)",
  };

  const className =
    type === "icon"
      ? "icon-image mx-2 cursor-grab hover:cursor-grabbing w-30 h-30 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      : "plate-image mx-2 cursor-grab hover:cursor-grabbing w-30 h-30 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300";

  return (
    <OverlayContainer ref={drag} className={className}>
      <img
        src={url}
        alt={`Draggable ${type}`}
        className="object-cover rounded-lg shadow-lg w-full h-full"
        style={imgStyle}
      />
      {!isDragging && (
        <Overlay className="hover-overlay">
          <div>{`Price: €${price}`}</div>
          <div>{`Type: ${type}`}</div>
        </Overlay>
      )}
    </OverlayContainer>
  );
};

export default DraggableItem;
