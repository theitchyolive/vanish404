// src/pages/Dashboard.jsx - User dashboard for VANISH 404

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Mountain, Navigation } from "lucide-react";
import { useAuthStore } from "../utils/auth-store";
import { toast } from "sonner";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [suggestedEscapes, setSuggestedEscapes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      // Mock data - replace with Google Maps API call in production
      const mockEscapes = [
        { id: "1", name: "Ridge Run", type: "ride", distance: 20, duration: 30, thumbnail: "/placeholder.jpg" },
        { id: "2", name: "Lake Camp", type: "camp", distance: 15, duration: 0, thumbnail: "/placeholder.jpg" },
      ];
      setSuggestedEscapes(mockEscapes);
      setIsLoading(false);
    };
    fetchSuggestions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("dashboard.welcome", { name: user?.displayName || "Rider" })}</h1>
      <h2 className="text-xl font-semibold mb-4">{t("dashboard.suggested")}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedEscapes.map((escape) => (
            <Card key={escape.id}>
              <CardHeader>
                <CardTitle>{escape.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={escape.thumbnail} alt={escape.name} className="w-full h-32 object-cover rounded" />
                <p>{escape.type === "ride" ? `${escape.distance} km • ${escape.duration} min` : "Campsite"}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/route-generator")}>
                  <Navigation className="w-4 h-4 mr-2" />
                  {t("routes.navigate")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}