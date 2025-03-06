// src/pages/RouteGenerator.jsx - Route and campsite generator for VANISH 404

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup";
import { Label } from "../components/ui/Label";
import { Slider } from "../components/ui/Slider";
import { toast } from "sonner";
import MapComponent from "../components/MapComponent";

export default function RouteGenerator() {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState(null);
  const [energy, setEnergy] = useState(3);
  const [preference, setPreference] = useState("both");
  const [generatedRoute, setGeneratedRoute] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation({ lat: 47.6062, lng: -122.3321 }) // Default: Seattle
    );
  }, []);

  const generateRoute = async () => {
    const mockRoute = {
      origin: userLocation,
      destination: { lat: userLocation.lat + 0.05, lng: userLocation.lng + 0.05 },
      waypoints: energy > 2 ? [{ lat: userLocation.lat + 0.025, lng: userLocation.lng + 0.025, name: "Camp Spot" }] : [],
      distance: energy * 10,
      duration: energy * 15,
    };
    setGeneratedRoute(mockRoute);
    toast.success(t("routes.generate"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("routes.title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>{t("routes.energy")}</CardTitle></CardHeader>
            <CardContent>
              <Slider value={[energy]} onValueChange={([val]) => setEnergy(val)} min={1} max={5} step={1} />
              <p className="mt-2">{energy}/5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t("routes.preference")}</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup value={preference} onValueChange={setPreference}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="road" id="road" />
                  <Label htmlFor="road">{t("routes.road")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trail" id="trail" />
                  <Label htmlFor="trail">{t("routes.trail")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">{t("routes.both")}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Button className="w-full" onClick={generateRoute}>{t("routes.generate")}</Button>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {userLocation && <MapComponent userLocation={userLocation} generatedRoute={generatedRoute} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}