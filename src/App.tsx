import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import LifeboatApp from "./pages/LifeboatApp";
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<LifeboatApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
