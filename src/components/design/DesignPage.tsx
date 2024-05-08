import { useState } from "react";
import DropArea from "./DropArea";
import Toolbox from "./Toolbox";
import { Button, Grid, Typography } from "@mui/material";
import useLocalStorage from "../../store/useLocalStorage";
import { DraggableItemType, StoneType } from "../../types/types";
import { getFullImageUrl } from "../../utils/utils";

interface DesignPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const DesignPage: React.FC<DesignPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const [selectedStone] = useLocalStorage<StoneType>("selectedStone");

  const [fTextOnPlate, setFTextOnPlate] =
    useLocalStorage<string>("fTextOnPlate");
  const [fDateOnPlate, setFDateOnPlate] =
    useLocalStorage<string>("fDateOnPlate");
  const [fBirthdayOnPlate, setFBirthdayOnPlate] =
    useLocalStorage<string>("fBirthdayOnPlate");
  const [textOnPlate, setTextOnPlate] = useState<string>(
    fTextOnPlate ? fTextOnPlate : ""
  );
  const [dateOnPlate, setDateOnPlate] = useState<string>(
    fDateOnPlate ? fDateOnPlate : ""
  );
  const [birthdayOnPlate, setBirthdayOnPlate] = useState<string>(
    fBirthdayOnPlate ? fBirthdayOnPlate : ""
  );

  const [items, setItems] = useLocalStorage<DraggableItemType[]>("items");

  const [droppedItems, setDroppedItems] = useState<DraggableItemType[]>(
    items ? items : []
  );

  const handleNext = () => {
    setItems(droppedItems);
    setFTextOnPlate(textOnPlate);
    setFDateOnPlate(dateOnPlate);
    setFBirthdayOnPlate(birthdayOnPlate);
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
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
      >
        <Grid item sm={12} md={5} order={{ xs: 2, md: 1 }}>
          <Toolbox
            setTextOnPlate={setTextOnPlate}
            textOnPlate={textOnPlate}
            setDateOnPlate={setDateOnPlate}
            dateOnPlate={dateOnPlate}
            setBirthdayOnPlate={setBirthdayOnPlate}
            birthdayOnPlate={birthdayOnPlate}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          justifyContent={"center"}
        >
          <div className="my-4">
            <DropArea
              textOnPlate={textOnPlate}
              dateOnPlate={dateOnPlate}
              birthdayOnPlate={birthdayOnPlate}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              initialStonePrice={selectedStone ? selectedStone.price : 0}
            >
              <img
                src={getFullImageUrl(
                  selectedStone ? selectedStone.url.frontUrl : ""
                )}
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
