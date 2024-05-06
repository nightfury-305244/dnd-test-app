import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ChooseTShirtPage from "./choose-Tshirt/ChooseTShirtPage";
import DesignPage from "./design/DesignPage";
import CheckAndOrderPage from "./check-and-order/CheckAndOrderPage";
import CompletePage from "./complete/CompletePage";

interface PageComponentProps {
  onStepChange: (stepName: string) => void;
}

function PageComponent({ onStepChange }: PageComponentProps) {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (step) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const nextStep = () => {
    if (step === "select") navigate("/design");
    else if (step === "design") navigate("/order");
    else if (step === "order") {
      localStorage.removeItem("selectedShirt");
      localStorage.removeItem("items");
      navigate("/complete");
    }
  };

  const prevStep = () => {
    if (step === "design") navigate("/select");
    else if (step === "order") navigate("/design");
    else if (step === "complete") navigate("/order");
  };

  switch (step) {
    case "select":
      return <ChooseTShirtPage onNavigateNext={nextStep} />;
    case "design":
      return (
        <DesignPage onNavigateNext={nextStep} onNavigatePrevious={prevStep} />
      );
    case "order":
      return (
        <CheckAndOrderPage
          onNavigateNext={nextStep}
          onNavigatePrevious={prevStep}
        />
      );
    case "complete":
      return <CompletePage onNavigateReturn={() => navigate("/")} />;
    default:
      return <Navigate to="/select" replace />;
  }
}

export default PageComponent;
