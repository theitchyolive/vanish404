// src/i18n.js - Internationalization setup for VANISH 404 in React

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "app.name": "VANISH 404",
      "app.tagline": "Your road to nowhere",
      "nav.home": "Home",
      "nav.dashboard": "Dashboard",
      "nav.routes": "Routes",
      "nav.saved": "Saved",
      "home.hero.title": "Escape the noise. Ride free.",
      "home.hero.subtitle": "VANISH 404 guides you to open roads and campsites for a minimalist reset.",
      "home.getStarted": "Ride Now",
      "dashboard.welcome": "Hey, {{name}} - ready to vanish?",
      "dashboard.suggested": "Suggested Escapes",
      "routes.title": "Plan Your Escape",
      "routes.energy": "Energy Level",
      "routes.preference": "Ride Preference",
      "routes.road": "Road",
      "routes.trail": "Trail",
      "routes.both": "Both",
      "routes.generate": "Find My Route",
      "routes.navigate": "Ride with Google Maps",
      "routes.save": "Save Escape",
      "saved.title": "Your Escapes",
      "kage.greeting": "Hey, it’s KAGE. Where you headed?",
      "kage.suggestion": "How about a quick ride to clear your head?",
    },
  },
  ja: {
    translation: {
      "app.name": "VANISH 404",
      "app.tagline": "どこへも行かない道",
      "nav.home": "ホーム",
      "nav.dashboard": "ダッシュボード",
      "nav.routes": "ルート",
      "nav.saved": "保存済み",
      "home.hero.title": "雑音から逃げろ。自由に走れ。",
      "home.hero.subtitle": "VANISH 404は、オープンロードとキャンプ場へ導き、ミニマリストのリセットを提供します。",
      "home.getStarted": "今すぐ走る",
      "dashboard.welcome": "ねえ、{{name}} - 消える準備はできた？",
      "dashboard.suggested": "おすすめの逃避先",
      "routes.title": "逃避計画",
      "routes.energy": "エネルギー値",
      "routes.preference": "ライドの好み",
      "routes.road": "道路",
      "routes.trail": "トレイル",
      "routes.both": "両方",
      "routes.generate": "ルートを探す",
      "routes.navigate": "Googleマップで走る",
      "routes.save": "逃避先を保存",
      "saved.title": "あなたの逃避先",
      "kage.greeting": "ねえ、KAGEだよ。どこに行く？",
      "kage.suggestion": "頭をスッキリさせる短いライドはどう？",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["navigator", "localStorage"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;