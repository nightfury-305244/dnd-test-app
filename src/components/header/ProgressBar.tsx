import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const progressPercentage = (step / 3) * 100;

  return (
    <Box sx={{ width: "80%", mt: 10, mb: 3, mx: "auto", visibility: `${isAdminRoute ? 'hidden' : 'visible'}` }}>
      <LinearProgress variant="determinate" value={progressPercentage} />
    </Box>
  );
};

export default ProgressBar;
