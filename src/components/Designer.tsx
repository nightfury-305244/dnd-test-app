import { useState } from "react";
import DropArea from "./DropArea";
import ShirtSelector from "./ShirtSelector";
import Toolbox from "./Toolbox";
import { Shirt } from "../data/shirts";
import { Grid, Typography } from "@mui/material";

const Designer = () => {
  const [selectedShirt, setSelectedShirt] = useState<Shirt | null>(null);
  const [textOnPlate, setTextOnPlate] = useState("");
  const [dateOnPlate, setDateOnPlate] = useState("");

  return (
    <Grid
      container
      direction={"row"}
      spacing={1}
      justifyContent={"space-between"}
      className="flex flex-col px-2 py-8"
    >
      <Grid container sm={12} md={3} alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Toolbox
          setTextOnPlate={setTextOnPlate}
          textOnPlate={textOnPlate}
          setDateOnPlate={setDateOnPlate}
          dateOnPlate={dateOnPlate}
        />
      </Grid>
      <Grid container sm={12} md={9} direction={"column"} justifyContent={"center"}>
        <div className="my-4">
          {selectedShirt ? (
            <DropArea textOnPlate={textOnPlate} dateOnPlate={dateOnPlate}>
              <img
                src={selectedShirt.url}
                alt={selectedShirt.alt}
                className="workspace-image"
              />
            </DropArea>
          ) : (
            <Typography variant="h6" className="text-center">Please select a t-shirt to start designing.</Typography>
          )}
        </div>
        <ShirtSelector onSelect={setSelectedShirt} />
      </Grid>
    </Grid>
  );
};

export default Designer;
