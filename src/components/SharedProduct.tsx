import { Grid } from "@mui/material";
import Product from "./Product";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { getProduct } from "../features/product/productActions";
import { useParams } from "react-router-dom";

const SharedProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = useAppSelector((state) => state.products.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct(productId ? productId : ""));
  }, [productId]);

  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      justifyContent={"center"}
    >
      <Grid container item direction={"column"} alignItems={"center"}>
        <Product
          selectedStone={product.stone ? product.stone : null}
          items={product.symbols ? product.symbols : null}
          textOnPlate={product.textOnPlate ? product.textOnPlate : null}
          dateOnPlate={product.dateOnPlate ? product.dateOnPlate : null}
          birthdayOnPlate={product.birthdayOnPlate ? product.birthdayOnPlate : null}
        />
      </Grid>
    </Grid>
  );
};

export default SharedProduct;
