import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const progressPercentage = (step / 3) * 100;

  return (
    <Box sx={{ width: "80%", mt: 10, mb: 3, mx: "auto" }}>
      <LinearProgress variant="determinate" value={progressPercentage} />
    </Box>
  );
};

export default ProgressBar;
