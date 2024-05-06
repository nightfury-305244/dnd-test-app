import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import useLocalStorage from "../../store/useLocalStorage";
import { useAppSelector } from "../../hooks";
import { Shirt } from "../../types/apiTypes";
import ShirtButton from "../Shirt";

interface ChooseTShirtPageProps {
  onNavigateNext: () => void;
}

const ChooseTShirtPage: React.FC<ChooseTShirtPageProps> = ({
  onNavigateNext,
}) => {
  const shirts = useAppSelector((state) => state.shirts.items);
  const [selectedShirt, setSelectedShirt] =
    useLocalStorage<Shirt>("selectedShirt");
  const [_currentPrice, setCurrentPrice] =
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
            <ShirtButton
              url={shirt.url}
              title={shirt.alt}
              price={`${shirt.price}`}
              selected={shirt._id === selectedShirtId}
              onClick={() => handleSelectShirt(shirt)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChooseTShirtPage;
