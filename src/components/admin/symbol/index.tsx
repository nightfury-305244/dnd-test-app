import { Button, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";
import AddSymbolDialog from "./AddSymbolDialog";
import SymbolCard from "./SymbolCard";

const SymbolManagementPage: React.FC = () => {
  const symbols = useAppSelector((state) => state.symbols.items);
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
          Symbol
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Add Symbol</Button>
      </Grid>
      <AddSymbolDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <Grid item container justifyContent={"center"} spacing={3}>
        {symbols.map((symbol) => (
          <Grid item key={symbol._id}>
            <SymbolCard
              url={symbol.url}
              title={symbol.name}
              price={`${symbol.price}`}
              onEdit={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SymbolManagementPage;
