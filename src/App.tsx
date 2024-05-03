import {
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import ProgressBar from "./components/header/ProgressBar";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "./components/header/Header";
import PageComponent from "./components/PageComponent";
import { useEffect } from "react";
import { getSymbols } from "./features/symbols/symbolsActions";
import { getShirts } from "./features/shirts/shirtsActions";
import { useAppDispatch } from "./store/store";

function App() {
  const { step } = useParams();
  const dispatch = useAppDispatch();
  
  console.log(import.meta.env.VITE_API_BASE_URL);
  
  useEffect(() => {
    dispatch(getSymbols());
    dispatch(getShirts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ProgressBar step={step} />
      <Routes>
        <Route path="/" element={<Navigate to="/select" replace />} />
        <Route
          path="/:step"
          element={<PageComponent />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
