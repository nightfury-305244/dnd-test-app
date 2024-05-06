import { Button, Grid, Typography } from "@mui/material";
// import Product from "../Product";
// import { useAppSelector } from "../../hooks";
import { useEffect } from "react";

interface CompletePageProps {
  onNavigateReturn: () => void;
}

const CompletePage: React.FC<CompletePageProps> = ({ onNavigateReturn }) => {
  // const order = useAppSelector((state) => state.orders.order);
  // const shirts = useAppSelector((state) => state.shirts.items);

  useEffect(() => {});
  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      justifyContent={"center"}
    >
      <Grid item>
        {/* <Product
              selectedShirt={shirts[order?.]}
              items={items}
              fTextOnPlate={fTextOnPlate}
              fDateOnPlate={fDateOnPlate}
            /> */}
      </Grid>
      <Grid item>
        <Typography variant="h2" align="center">
          Congratulations!
        </Typography>
      </Grid>
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
