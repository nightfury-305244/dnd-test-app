import { useState } from "react";
import DropArea from "./DropArea";
import Toolbox from "../Toolbox";
import { Button, Grid, Typography } from "@mui/material";
import useLocalStorage from "../../store/useLocalStorage";
import { DraggableItem } from "../../types/types";
import { Shirt } from "../../types/apiTypes";

interface DesignPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const [selectedShirt] = useLocalStorage<Shirt>("selectedShirt");

  const [textOnPlate, setTextOnPlate] = useState("");
  const [dateOnPlate, setDateOnPlate] = useState("");

  const [items, setItems] = useLocalStorage<DraggableItem[]>("items");
  const [_fTextOnPlate, setFTextOnPlate] =
    useLocalStorage<string>("fTextOnPlate");
  const [_fDateOnPlate, setFDateOnPlate] =
    useLocalStorage<string>("fDateOnPlate");

  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>(
    items ? items : []
  );

  const handleNext = () => {
    setItems(droppedItems);
    setFTextOnPlate(textOnPlate);
    setFDateOnPlate(dateOnPlate);
    onNavigateNext();
  };
  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      columnSpacing={3}
    >
      <Grid item>
        <Typography variant="h4" className="text-lg text-center font-bold">
          Design
        </Typography>
      </Grid>
      <Grid
        container
        item
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
      >
        <Grid container item sm={12} md={5} order={{ xs: 2, md: 1 }}>
          <Toolbox
            setTextOnPlate={setTextOnPlate}
            textOnPlate={textOnPlate}
            setDateOnPlate={setDateOnPlate}
            dateOnPlate={dateOnPlate}
          />
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          direction={"column"}
          justifyContent={"center"}
        >
          <div className="my-4">
            <DropArea
              textOnPlate={textOnPlate}
              dateOnPlate={dateOnPlate}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              initialShirtPrice={selectedShirt ? selectedShirt.price : 0}
            >
              <img
                src={selectedShirt?.url}
                alt={selectedShirt?.alt}
                className="workspace-size text-center"
              />
            </DropArea>
          </div>
        </Grid>
      </Grid>
      <div className="mt-10">
        <Button
          variant="contained"
          onClick={onNavigatePrevious}
          className="!mr-10"
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => handleNext()}>
          Next
        </Button>
      </div>
    </Grid>
  );
};

export default DesignPage;
