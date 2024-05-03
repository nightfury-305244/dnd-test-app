import { Button, Grid, Typography } from "@mui/material";

interface CompletePageProps {
  onNavigateReturn: () => void;
}

const CompletePage: React.FC<CompletePageProps> = ({ onNavigateReturn }) => {
  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      justifyContent={"center"}
    >
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
