// src/pages/Setup.jsx - Initial user setup for VANISH 404

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { useAuthStore } from "../utils/auth-store";
import { toast } from "sonner"; // For toast notifications

export default function Setup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register, completeSetup } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login logic
        await login(email, password);
        toast.success("Logged in successfully!");
      } else {
        // Registration logic
        await register(email, password);
        await completeSetup({ preferences: { rideType: "both" } });
        toast.success("Account created and setup completed!");
      }
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error during authentication:", error);
      setError(error.message || "An error occurred. Please try again.");
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{isLogin ? t("login") : t("signUp")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>{t("email")}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>{t("password")}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="animate-spin">🌀</span> // Loading spinner
              ) : isLogin ? (
                t("login")
              ) : (
                t("signUp")
              )}
            </Button>
          </form>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4"
            disabled={isLoading}
          >
            {isLogin ? t("needAccount") : t("haveAccount")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}