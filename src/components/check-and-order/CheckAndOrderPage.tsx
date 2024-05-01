import { Button, Grid, TextField, Typography } from "@mui/material";
import Product from "../Product";

interface CheckAndOrderPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const CheckAndOrderPage: React.FC<CheckAndOrderPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      spacing={3}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Grid
        container
        item
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
      >
        <Grid
          container
          item
          sm={12}
          md={5}
          order={{ xs: 2, md: 1 }}
          spacing={4}
        >
          <Grid item>
            <Typography variant="h6">Tilaajan tiedot</Typography>
          </Grid>
          <Grid item container direction="row" spacing={3}>
            <Grid item sm={6} md={6}>
              <TextField label="Nimi" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Sukunimi" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Puhelinnmero" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Sähköpostiosoite" />
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h6">Toimitustiedot</Typography>
          </Grid>
          <Grid item container direction="row" spacing={3}>
            <Grid item sm={6} md={6}>
              <TextField label="Toimitusosoite" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Toimituspaikan nimi" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Toimitusnumero" />
            </Grid>
            <Grid item sm={6} md={6}>
              <TextField label="Toivottu toimitusajankohta" />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          direction={"column"}
          alignItems={"center"}
        >
          <Product />
        </Grid>
      </Grid>
      <div className="mt-10 mx-auto">
        <Button
          variant="contained"
          onClick={onNavigatePrevious}
          className="!mr-10"
        >
          Previous
        </Button>
        <Button variant="contained" onClick={onNavigateNext}>
          Next
        </Button>
      </div>
    </Grid>
  );
};

export default CheckAndOrderPage;
