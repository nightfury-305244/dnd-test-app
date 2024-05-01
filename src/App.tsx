import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DesignPage from "./components/design/DesignPage";
import ProgressBar from "./components/header/ProgressBar";
import { ThemeProvider } from "@mui/material";
import ChooseTShirtPage from "./components/choose-Tshirt/ChooseTShirtPage";
import theme from "./theme";
import useLocalStorage from "./store/useLocalStorage";
import Header from "./components/header/Header";
import CheckAndOrderPage from "./components/check-and-order/CheckAndOrderPage";
import CompletePage from "./components/complete/CompletePage";

function App() {
  const [currentStep, setCurrentStep, removeCurrentStep] =
    useLocalStorage<string>("currentStep");
  const [step, setStep] = useState(currentStep ? currentStep : "select");
  const navigate = useNavigate();

  const nextStep = () => {
    if (step === "select") {
      setStep("design");
      setCurrentStep("design");
      navigate("/design");
    } else if (step === "design") {
      setStep("order");
      setCurrentStep("order");
      navigate("/order");
    } else if (step === "order") {
      setStep("complete");
      removeCurrentStep();
      localStorage.removeItem("selectedShirt");
      localStorage.removeItem("items");
      navigate("/complete");
    }
  };

  const prevStep = () => {
    if (step === "order") {
      setStep("design");
      setCurrentStep("design");
      navigate("/design");
    } else if (step === "design") {
      setStep("select");
      setCurrentStep("select");
      navigate("/");
    }
  };

  const returnDashboard = () => {
    setStep("select");
    setCurrentStep("select");
    navigate("/");
  };
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ProgressBar step={step} />
      <Routes>
        <Route
          path="/"
          element={<ChooseTShirtPage onNavigateNext={nextStep} />}
        />
        <Route
          path="/design"
          element={
            <DesignPage
              onNavigateNext={nextStep}
              onNavigatePrevious={prevStep}
            />
          }
        />
        <Route
          path="/order"
          element={
            <CheckAndOrderPage
              onNavigateNext={nextStep}
              onNavigatePrevious={prevStep}
            />
          }
        />
        <Route
          path="/complete"
          element={<CompletePage onNavigateReturn={returnDashboard} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
