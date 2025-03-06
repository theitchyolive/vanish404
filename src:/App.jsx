// src/App.jsx - Main React application component for VANISH 404

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./i18n"; // Internationalization setup
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import RouteGenerator from "./pages/RouteGenerator";
import SavedRoutes from "./pages/SavedRoutes";
import Setup from "./pages/Setup";
import { useAuthStore, initializeAuth } from "./utils/auth-store";

export default function App() {
  const { user, isSetupComplete } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, []);

  // Protected route to ensure user is authenticated and setup is complete
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/" />;
    if (!isSetupComplete) return <Navigate to="/setup" />;
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/route-generator" element={<ProtectedRoute><RouteGenerator /></ProtectedRoute>} />
            <Route path="/saved-routes" element={<ProtectedRoute><SavedRoutes /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" closeButton />
      </div>
    </Router>
  );
}