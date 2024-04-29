// import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { shirts } from "../data/shirts";

const ShirtSelector = ({
  onSelect,
}: {
  onSelect: (shirt: (typeof shirts)[0]) => void;
}) => {
  return (
    <div className="p-4">
      {/* <Typography variant="h4" className="text-lg text-center font-bold">Choose a T-shirt</Typography> */}
      {/* <div className="grid grid-cols-2 gap-4 mt-4"> */}
        <Grid container item justifyContent={"center"} spacing={3}>
          {shirts.map((shirt) => (
            <Grid item>
              <button
                key={shirt.id}
                onClick={() => onSelect(shirt)}
                className="border p-2"
              >
                <img
                  src={shirt.url}
                  alt={shirt.alt}
                  className="w-60 h-auto object-cover text-center"
                />
              </button>
            </Grid>
          ))}
        </Grid>
      {/* </div> */}
    </div>
  );
};

export default ShirtSelector;
