// src/pages/SavedRoutes.jsx - Component to display saved rides and campsites for VANISH 404

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Mountain, Navigation, Trash } from "lucide-react";
import { useAuthStore } from "../utils/auth-store";
import { toast } from "sonner";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firebaseApp } from "../utils/firebase-config";

const db = getFirestore(firebaseApp);

export default function SavedRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [savedEscapes, setSavedEscapes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedEscapes = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "escapes"));
        const escapes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSavedEscapes(escapes);
      } catch (error) {
        console.error("Error fetching saved escapes:", error);
        toast.error("Failed to load saved escapes.");
      }
      setIsLoading(false);
    };
    fetchSavedEscapes();
  }, [user]);

  const deleteEscape = async (escapeId) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "escapes", escapeId));
      setSavedEscapes(savedEscapes.filter((escape) => escape.id !== escapeId));
      toast.success("Escape deleted.");
    } catch (error) {
      toast.error("Failed to delete escape.");
    }
  };

  const startNavigation = (escape) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${escape.destination.lat},${escape.destination.lng}&travelmode=driving`;
    window.open(url, "_blank");
    toast.success("Navigation started.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("saved.title")}</h1>
        <Button onClick={() => navigate("/route-generator")}>
          <Mountain className="w-4 h-4 mr-2" />
          {t("routes.generate")}
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : savedEscapes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEscapes.map((escape) => (
            <Card key={escape.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{escape.name || (escape.type === "ride" ? "Unnamed Ride" : "Unnamed Campsite")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{escape.type === "ride" ? `${escape.distance} km • ${escape.duration} min` : "Campsite"}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => deleteEscape(escape.id)}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button size="sm" onClick={() => startNavigation(escape)}>
                  <Navigation className="w-4 h-4 mr-2" />
                  {t("routes.navigate")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">No saved escapes yet.</p>
            <Button onClick={() => navigate("/route-generator")}>{t("routes.generate")}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}