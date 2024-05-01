import { Button, Grid, Typography, styled } from "@mui/material";
import { Shirt, shirts } from "../../data/shirts";
import { useState } from "react";
import useLocalStorage from "../../store/useLocalStorage";

interface ChooseTShirtPageProps {
  onNavigateNext: () => void;
}

const SelectedButton = styled(Button)(({ theme }) => ({
  border: `4px solid ${theme.palette.secondary.main}`,
}));

const ChooseTShirtPage: React.FC<ChooseTShirtPageProps> = ({
  onNavigateNext,
}) => {
  const [selectedShirt, setSelectedShirt] =
    useLocalStorage<Shirt>("selectedShirt");
  const [selectedShirtId, setSelectedShirtId] = useState<string | null>(
    selectedShirt ? selectedShirt.id : null
  );

  const handleSelectShirt = (shirt: Shirt) => {
    setSelectedShirt(shirt);
    setSelectedShirtId(shirt.id);
  };

  console.log(selectedShirtId);
  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"row"}
      justifyContent={"center"}
      spacing={3}
    >
      <Grid item>
        <Typography variant="h4" className="text-lg text-center font-bold">
          Choose a T-shirt
        </Typography>
      </Grid>
      <Grid container item justifyContent={"center"} spacing={3}>
        {shirts.map((shirt) => (
          <Grid item key={shirt.id}>
            {shirt.id === selectedShirtId ? (
              <SelectedButton
                onClick={() => handleSelectShirt(shirt)}
                className="!p-0"
              >
                <img
                  src={shirt.url}
                  alt={shirt.alt}
                  className="list-image-size text-center"
                />
              </SelectedButton>
            ) : (
              <Button onClick={() => handleSelectShirt(shirt)} className="!p-0">
                <img
                  src={shirt.url}
                  alt={shirt.alt}
                  className="list-image-size text-center"
                />
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={onNavigateNext} className="!mt-10">
        Next
      </Button>
    </Grid>
  );
};

export default ChooseTShirtPage;
