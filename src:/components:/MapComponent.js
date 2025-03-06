// src/components/MapComponent.jsx - Google Maps integration for VANISH 404

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const MapComponent = ({ userLocation, generatedRoute }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `AIzaSyDR71IqJ_iUhaWs6gJ-PJlKXm9gntELqlI`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 10,
        mapTypeId: "terrain",
      });
      new window.google.maps.Marker({ position: userLocation, map: mapInstanceRef.current, title: "You" });
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        polylineOptions: { strokeColor: "#A9CBA4", strokeWeight: 5 },
      });
    };

    loadGoogleMapsAPI();
    return () => directionsRendererRef.current?.setMap(null);
  }, [userLocation, i18n.language]);

  useEffect(() => {
    if (!generatedRoute || !window.google || !directionsRendererRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = generatedRoute.waypoints.map((wp) => ({ location: new window.google.maps.LatLng(wp.lat, wp.lng), stopover: true }));
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(generatedRoute.origin.lat, generatedRoute.origin.lng),
        destination: new window.google.maps.LatLng(generatedRoute.destination.lat, generatedRoute.destination.lng),
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) directionsRendererRef.current.setDirections(result);
      }
    );
  }, [generatedRoute]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

export default MapComponent;