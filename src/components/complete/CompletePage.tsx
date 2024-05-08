import { Button, Grid } from "@mui/material";
import Product from "../Product";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getProduct } from "../../features/product/productActions";
import useLocalStorage from "../../store/useLocalStorage";
import { Link } from "react-router-dom";
import theme from "../../theme";

interface CompletePageProps {
  onNavigateReturn: () => void;
}

const CompletePage: React.FC<CompletePageProps> = ({ onNavigateReturn }) => {
  const product = useAppSelector((state) => state.products.product);
  const [productId] = useLocalStorage<string>("productId");

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
      <Grid
        container
        item
        direction={"column"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid item>
          <Product
            selectedStone={product.stone ? product.stone : null}
            items={product.symbols ? product.symbols : null}
            textOnPlate={product.textOnPlate ? product.textOnPlate : null}
            dateOnPlate={product.dateOnPlate ? product.dateOnPlate : null}
            birthdayOnPlate={product.birthdayOnPlate ? product.birthdayOnPlate : null}
          />
        </Grid>
        <Grid item className="truncate !max-w-full">
          <Link
            to={`${window.location.origin}/product/${productId}`}
            style={{ color: `${theme.palette.primary.main}`, fontSize: "18px" }}
          >
            {`${window.location.origin}/product/${productId}`}
          </Link>
        </Grid>
      </Grid>
      {/* <Grid item>
        <Typography variant="h2" align="center">
          Congratulations!
        </Typography>
      </Grid> */}
      <Button
        variant="contained"
        onClick={onNavigateReturn}
        className="!mt-10 !mx-auto"
      >
        Return
      </Button>
    </Grid>
  );
};

export default CompletePage;
