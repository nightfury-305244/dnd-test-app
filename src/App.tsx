import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProgressBar from "./components/header/ProgressBar";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "./components/header/Header";
import PageComponent from "./components/PageComponent";
import { useEffect, useState } from "react";
import { getSymbols } from "./features/symbols/symbolsActions";
import { getStones } from "./features/stones/stonesActions";
import { useAppDispatch } from "./store/store";
import SharedProduct from "./components/SharedProduct";

const stepMapping: Record<string, number> = {
  select: 0,
  design: 1,
  order: 2,
  complete: 3,
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getSymbols());
    dispatch(getStones());
  }, [dispatch]);

  const updateStep = (stepName: string) => {
    const stepIndex = stepMapping[stepName] ?? 0;
    setCurrentStep(stepIndex);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ProgressBar step={currentStep} />
      <Routes>
        <Route path="/" element={<Navigate to="/select" replace />} />
        <Route path="/product/:productId" element={<SharedProduct />} />
        <Route path="/:step" element={<PageComponent onStepChange={updateStep} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
