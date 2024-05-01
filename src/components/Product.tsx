import useLocalStorage from "../store/useLocalStorage";
import { DraggableItem, Shirt } from "../types";

const Product: React.FC = () => {
  const [selectedShirt] = useLocalStorage<Shirt>("selectedShirt");
  const [items] = useLocalStorage<DraggableItem[]>("items");
  return (
    <div className="relative dropArea-size text-center">
      <img
        src={selectedShirt?.url}
        alt={selectedShirt?.alt}
        className="workspace-size text-center"
      />
      {items?.map((item, index) =>
        item.type === "plate" ? (
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
              {item.textOnPlate}
              <br />
              {item.dateOnPlate}
            </div>
          </div>
        ) : (
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
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Product;
