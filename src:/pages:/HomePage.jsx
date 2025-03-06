// src/pages/HomePage.jsx - Landing page for VANISH 404

import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Mountain } from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("home.hero.title")}</h1>
          <p className="text-lg text-gray-600 mb-8">{t("home.hero.subtitle")}</p>
          <Button size="lg" onClick={() => navigate("/setup")}>
            {t("home.getStarted")}
          </Button>
        </div>
      </section>
    </div>
  );
}