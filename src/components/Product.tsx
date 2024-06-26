import React from "react";
import { DraggableItemType, StoneType } from "../types/types";
import { getFullImageUrl } from "../utils/utils";

interface ProductProps {
  selectedStone: StoneType | null;
  items: DraggableItemType[] | null;
  textOnPlate: string | null;
  dateOnPlate: string | null;
  birthdayOnPlate: string | null;
}

const Product: React.FC<ProductProps> = ({
  selectedStone,
  items,
  textOnPlate,
  dateOnPlate,
  birthdayOnPlate,
}) => {
  return (
    <div className="relative dropArea-size text-center">
      <img
        src={getFullImageUrl(selectedStone ? selectedStone.url.frontUrl : "")}
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
              src={getFullImageUrl(item.symbol.url)}
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
              {birthdayOnPlate}
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
              src={getFullImageUrl(item.symbol.url)}
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
