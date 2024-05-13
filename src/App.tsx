import React, { useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";
import Header from "./components/header/Header";
import ProgressBar from "./components/header/ProgressBar";

const AdminDashboardPage = lazy(() => import("./components/admin/dashboard"));
const StoneManagementPage = lazy(() => import("./components/admin/stone"));
const SymbolManagementPage = lazy(() => import("./components/admin/symbol"));
const DashboardPage = lazy(
  () => import("./components/dashboard/DashboardPage")
);
const FAQPage = lazy(() => import("./components/faq/FaqPage"));

import PrivateRoute from "./PrivateRoute"; // Adjust the import path as needed
import { AuthProvider } from "./AuthContext"; // Adjust the import path as needed
import { getSymbols } from "./features/symbols/symbolsActions";
import { getStones } from "./features/stones/stonesActions";
import { useAppDispatch } from "./hooks";
import SharedProduct from "./components/SharedProduct";
import PageComponent from "./components/PageComponent";
import LoadingComponent from "./shared-components/LoadingComponent";

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
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/design"
              element={<Navigate to="/design/select" replace />}
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/auth" replace />}
            />
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
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
