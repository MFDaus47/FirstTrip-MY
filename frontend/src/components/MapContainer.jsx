import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";

const MapContainer = ({ mapData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const markersRef = useRef([]);
  const routeRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const defaultCenter = { lat: 3.139, lng: 101.6869 };
      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        center: defaultCenter,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 13 }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#000000" }, { lightness: 13 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#000000" }, { lightness: 13 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }],
          },
        ],
      });

      setMap(newMap);
    };

    if (!window.google) {
      const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  // Update map when data changes
  useEffect(() => {
    if (!map || !mapData) return;

    const updateMapWithLocations = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Clear existing markers and routes
      } catch (err) {}
    };
  });

  return (
    <div className="relative h-full w-full min-h-[400px]">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading map...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-4 left-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3 z-10"></div>
      )}

      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};

export default MapContainer;
