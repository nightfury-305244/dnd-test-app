import DraggableItem from "./DraggableItem";
import { Grid, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";

interface ToolboxProps {
  textOnPlate: string;
  setTextOnPlate: (text: string) => void;
  dateOnPlate: string;
  setDateOnPlate: (text: string) => void;
  birthdayOnPlate: string;
  setBirthdayOnPlate: (text: string) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  setTextOnPlate,
  textOnPlate,
  setDateOnPlate,
  dateOnPlate,
  setBirthdayOnPlate,
  birthdayOnPlate,
}) => {
  const symbols = useAppSelector((state) => state.symbols.items);

  const icons = symbols.filter((symbol) => symbol.type === 1);
  const plates = symbols.filter((symbol) => symbol.type === 2);

  return (
    <Grid container direction={"column"} spacing={3} className="py-8">
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Icons
          </Typography>
        </Grid>
        <Grid item>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {icons.map((icon) => (
              <DraggableItem
                key={icon._id}
                item={{ symbol: icon, position: { x: 0, y: 0 } }}
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
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Plates
          </Typography>
        </Grid>
        <Grid item>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {plates.map((plate) => (
              <DraggableItem
                key={plate._id}
                item={{ symbol: plate, position: { x: 0, y: 0 } }}
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
            value={birthdayOnPlate}
            type="date"
            onChange={(e) => setBirthdayOnPlate(e.target.value)}
            placeholder="Enter Date for the plate"
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
