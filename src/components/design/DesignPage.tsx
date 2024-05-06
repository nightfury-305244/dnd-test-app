import { useState } from "react";
import DropArea from "./DropArea";
import Toolbox from "./Toolbox";
import { Button, Grid, Typography } from "@mui/material";
import useLocalStorage from "../../store/useLocalStorage";
import type { DraggableItem, Stone } from "../../types/types";

interface DesignPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const [selectedStone] = useLocalStorage<Stone>("selectedStone");
  
  const [fTextOnPlate, setFTextOnPlate] =
    useLocalStorage<string>("fTextOnPlate");
  const [fDateOnPlate, setFDateOnPlate] =
    useLocalStorage<string>("fDateOnPlate");
  const [textOnPlate, setTextOnPlate] = useState<string>(fTextOnPlate ? fTextOnPlate : "");
  const [dateOnPlate, setDateOnPlate] = useState<string>(fDateOnPlate ? fDateOnPlate : "");

  const [items, setItems] = useLocalStorage<DraggableItem[]>("items");

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
              initialStonePrice={selectedStone ? selectedStone.price : 0}
            >
              <img
                src={selectedStone?.url.frontUrl}
                alt={selectedStone?.alt}
                style={{ width: "auto", maxHeight: "400px" }}
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
