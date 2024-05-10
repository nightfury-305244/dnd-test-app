import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ChooseStonePage from "./choose-stone/ChooseStonePage";
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
    if (step === "select") navigate("/design/decorate");
    else if (step === "decorate") navigate("/design/order");
    else if (step === "order") {
      localStorage.removeItem("selectedStone");
      localStorage.removeItem("items");
      navigate("/design/complete");
    }
  };

  const prevStep = () => {
    if (step === "decorate") navigate("/design/select");
    else if (step === "order") navigate("/design/decorate");
    else if (step === "complete") navigate("/design/order");
  };

  switch (step) {
    case "select":
      return <ChooseStonePage onNavigateNext={nextStep} />;
    case "decorate":
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
      return <Navigate to="design/select" replace />;
  }
}

export default PageComponent;
