import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";
import Header from "./components/header/Header";
import ProgressBar from "./components/header/ProgressBar";
import PageComponent from "./components/PageComponent";
import SharedProduct from "./components/SharedProduct";
import AdminDashboardPage from "./components/admin/dashboard";
import StoneManagementPage from "./components/admin/stone";
import SymbolManagementPage from "./components/admin/symbol";
import PrivateRoute from "./PrivateRoute"; // Adjust the import path as needed
import { AuthProvider } from "./AuthContext"; // Adjust the import path as needed
import { getSymbols } from "./features/symbols/symbolsActions";
import { getStones } from "./features/stones/stonesActions";
import { useAppDispatch } from "./hooks";
import DashboardPage from "./components/dashboard/DashboardPage";
import FAQPage from "./components/faq/FaqPage";

function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSymbols());
    dispatch(getStones());
  }, [dispatch]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <ProgressBar step={currentStep} />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/design" element={<Navigate to="/design/select" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/auth" replace />} />
          <Route path="/product/:productId" element={<SharedProduct />} />
          <Route path="/admin/auth" element={<AdminDashboardPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route
            path="/admin/stone"
            element={
              <PrivateRoute>
                <StoneManagementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/symbol"
            element={
              <PrivateRoute>
                <SymbolManagementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="design/:step"
            element={
              <PageComponent
                onStepChange={(stepName: string) => {
                  const stepMapping: Record<string, number> = {
                    select: 0,
                    design: 1,
                    order: 2,
                    complete: 3,
                  };
                  const stepIndex = stepMapping[stepName] ?? 0;
                  setCurrentStep(stepIndex);
                }}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
