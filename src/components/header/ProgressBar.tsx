import { LinearProgress, Typography, Box } from "@mui/material";

const ProgressBar = ({ step }: { step: string }) => {
  const stepToPercentage = ( currentStep: string ) => {
    switch (currentStep) {
      case "select":
        return 0;
      case "design":
        return 50;
      case "order":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ width: "80%", mt: 10, mb: 3, mx: 'auto' }}>
      <Typography variant="body2" color="text.secondary">
        Step {step}
      </Typography>
      <LinearProgress color="secondary" variant="determinate" value={stepToPercentage(step)} />
    </Box>
  );
};

export default ProgressBar;
