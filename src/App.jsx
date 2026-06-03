import "remixicon/fonts/remixicon.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TransitionWrapper from "./components/transitionWrapper";
import HomePage from "./modules/homePage/homePage";
import OraculoPage from "./modules/oraculoPage/oraculoPage";
import NotFoundPage from "./modules/notFoundPage/notFoundPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <TransitionWrapper>
              <HomePage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/oraculo"
          element={
            <TransitionWrapper>
              <OraculoPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="*"
          element={
            <TransitionWrapper>
              <NotFoundPage />
            </TransitionWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
