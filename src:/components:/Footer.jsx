// src/components/Footer.jsx - Footer component for VANISH 404

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mountain } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Mountain className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold">VANISH 404</span>
          </div>
          <div className="text-sm text-gray-600">
            © {currentYear} VANISH 404. All rights reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}