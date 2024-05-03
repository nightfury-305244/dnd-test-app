import { Button, Grid, Typography, styled } from "@mui/material";
import { useState } from "react";
import useLocalStorage from "../../store/useLocalStorage";
import { useAppSelector } from "../../hooks";
import { Shirt } from "../../types/apiTypes";

interface ChooseTShirtPageProps {
  onNavigateNext: () => void;
}

const SelectedButton = styled(Button)(({ theme }) => ({
  border: `4px solid ${theme.palette.secondary.main}`,
}));

const ChooseTShirtPage: React.FC<ChooseTShirtPageProps> = ({
  onNavigateNext,
}) => {
  const shirts = useAppSelector((state) => state.shirts.items);
  const [selectedShirt, setSelectedShirt] =
    useLocalStorage<Shirt>("selectedShirt");
  const [currentPrice, setCurrentPrice] =
    useLocalStorage<number>("currentPrice");
  const [selectedShirtId, setSelectedShirtId] = useState<string | null>(
    selectedShirt ? selectedShirt._id : null
  );

  const handleSelectShirt = (shirt: Shirt) => {
    setSelectedShirt(shirt);
    setSelectedShirtId(shirt._id);
    setCurrentPrice(shirt.price);
    onNavigateNext();
  };

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
          <Grid item key={shirt._id}>
            {shirt._id === selectedShirtId ? (
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
                  key={shirt._id}
                  src={shirt.url}
                  alt={shirt.alt}
                  className="list-image-size text-center"
                />
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChooseTShirtPage;
