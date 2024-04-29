import DraggableItem from "./DraggableItem";
import { icons, plates } from "../data/icons";
import { Grid, TextField, Typography } from "@mui/material";

interface ToolboxProps {
  textOnPlate: string;
  setTextOnPlate: (text: string) => void;
  dateOnPlate: string;
  setDateOnPlate: (text: string) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  setTextOnPlate,
  textOnPlate,
  setDateOnPlate,
  dateOnPlate,
}) => {
  return (
    <Grid container direction={"column"} spacing={3} className="py-8">
      <Grid item container direction={"column"} alignItems={"center"} spacing={2}>
        <Grid item>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Icons
          </Typography>
        </Grid>
        <Grid item>
          <div className="flex flex-wrap justify-start items-center gap-4">
            {icons.map((icon) => (
              <DraggableItem
                key={icon.id}
                id={icon.id}
                url={icon.url}
                type={icon.type}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid item container direction={"column"} alignItems={"center"} spacing={2}>
        <Grid item>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Plates
          </Typography>
        </Grid>
        <Grid item>
          <div className="flex flex-wrap justify-start items-center gap-4">
            {plates.map((plate) => (
              <DraggableItem
                key={plate.id}
                id={plate.id}
                url={plate.url}
                type={plate.type}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid item>
          <TextField
            label="Text on Plate"
            value={textOnPlate}
            onChange={(e) => setTextOnPlate(e.target.value)}
            placeholder="Enter text for the plate"
          />
        </Grid>
        <Grid item>
          <TextField
            value={dateOnPlate}
            type="date"
            onChange={(e) => setDateOnPlate(e.target.value)}
            placeholder="Enter Date for the plate"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Toolbox;
