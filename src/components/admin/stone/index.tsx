import { Button, Grid, Typography } from "@mui/material";
import GravestoneCard from "./Stone";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import AddStoneDialog from "./AddStoneDialog";

const StoneManagementPage: React.FC = () => {
  const stones = useAppSelector((state) => state.stones.items);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Grid
      container
      className="!w-9/12 !mx-auto"
      direction={"column"}
      justifyContent={"flex-start"}
      spacing={3}
    >
      <Grid item xs={12} container justifyContent="center">
        <Typography variant="h4" className="text-lg font-bold">
          Stone
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Add Stone</Button>
      </Grid>
      <AddStoneDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <Grid item container justifyContent={"center"} spacing={3}>
        {stones.map((stone) => (
          <Grid item key={stone._id}>
            <GravestoneCard
              url={stone.url}
              title={stone.name}
              price={`${stone.price}`}
              description={stone.description}
              onEdit={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default StoneManagementPage;
