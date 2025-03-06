// src/components/Header.jsx - Updated navigation header with KAGE chat link

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Mountain, Menu } from "lucide-react";
import { useAuthStore } from "../utils/auth-store";
import LanguageSelector from "./LanguageSelector";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/dashboard", label: t("nav.dashboard"), protected: true },
    { path: "/route-generator", label: t("nav.routes"), protected: true },
    { path: "/saved-routes", label: t("nav.saved"), protected: true },
    { path: "/kage-chat", label: "KAGE", protected: true },
  ];

  const filteredLinks = navLinks.filter((link) => !link.protected || user);

  return (
    <header className="py-4 border-b sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Mountain className="w-8 h-8 text-green-600" />
          <span className="text-xl font-semibold">VANISH 404</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm ${location.pathname === link.path ? "text-green-600 font-medium" : "text-gray-600 hover:text-green-600"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          {user ? (
            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
          ) : (
            <Button size="sm" onClick={() => navigate("/setup")}>{t("home.getStarted")}</Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 mt-6">
                {filteredLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="text-lg text-gray-600 hover:text-green-600">
                    {link.label}
                  </Link>
                ))}
                {user && <Button variant="destructive" onClick={logout}>Logout</Button>}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}