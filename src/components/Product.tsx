import React from "react";
import { DraggableItem, Stone } from "../types/types";

interface ProductProps {
  selectedStone: Stone | null;
  items: DraggableItem[] | null;
  textOnPlate: string | null;
  dateOnPlate: string | null;
}

const Product: React.FC<ProductProps> = ({
  selectedStone,
  items,
  textOnPlate,
  dateOnPlate,
}) => {
  return (
    <div className="relative dropArea-size text-center">
      <img
        src={selectedStone?.url.frontUrl}
        alt={selectedStone?.alt}
        className="text-center"
        style={{ width: "auto", maxHeight: "400px" }}
      />
      {items?.map((item, index) =>
        item.symbol.type === 2 ? (
          <div
            key={index}
            style={{
              position: "absolute",
              left: item.position.x,
              top: item.position.y,
            }}
          >
            <img
              src={item.symbol.url}
              alt={`Dropped ${item.symbol.alt}`}
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
              src={item.symbol.url}
              alt={`Dropped ${item.symbol.type}`}
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Product;
