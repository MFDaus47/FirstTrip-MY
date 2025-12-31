import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";

const MapContainer = ({ mapData }) => {
  console.log("mapData Received: ", mapData);
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
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        if (routeRef.current) {
          routeRef.current.setMap(null);
        }

        const geocoder = new window.google.maps.Geocoder();
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          supressMarkers: false,
          polylineOptions: {
            strokeColor: "#3B82F6",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          },
        });

        let originCoords = null;
        let destinationCoords = null;

        // Geocode origin if provided
        if (mapData.origin) {
          try {
            const originResult = await geocodeAddress(geocoder, mapData.origin);
            originCoords = originResult.geometry.location;

            const originMarker = new window.google.maps.Marker({
              position: originCoords,
              map: map,
              title: "Origin: " + mapData.origin,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#22C55E",
                fillOpacity: 1,
                strokeColor: "#16A34A",
                strokeWeight: 2,
                scale: 8,
              },
            });
            console.log("Geocoding origin successful: ");
            markersRef.current.push(originMarker);
          } catch (err) {
            console.error("Error geocoding origin: ", err);
          }
        }

        // Geocode Destination if provided
        if (mapData.destination) {
          try {
            const destinationResult = await geocodeAddress(
              geocoder,
              mapData.destination
            );
            destinationCoords = destinationResult.geometry.location;

            const destinationMarker = new window.google.maps.Marker({
              position: destinationCoords,
              map: map,
              title: "destination: " + mapData.destination,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#EF4444",
                fillOpacity: 1,
                strokeColor: "#DC2626",
                strokeWeight: 2,
                scale: 8,
              },
            });
            console.log("Geocoding destination successful: ");
            markersRef.current.push(destinationMarker);
          } catch (err) {
            console.error("Error geocoding destination: ", err);
          }
        }

        // Draw route if both locations are available
        if (originCoords && destinationCoords) {
          console.log("both location's geocoordinate found! Drawing a route ");
          directionsService.route(
            {
              origin: originCoords,
              destination: destinationCoords,
              travelMode: window.google.maps.TravelMode.DRIVING,
              unitSystem: window.google.maps.UnitSystem.METRIC,
              region: "MY",
            },
            (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
                directionsRenderer.setMap(map);
                routeRef.current = directionsRenderer;
              } else {
                console.error("Directions request failed: ", status);
              }
            }
          );
        } else if (originCoords || destinationCoords) {
          const center = originCoords || destinationCoords;
          map.setCenter(center);
          map.setZoom(14);
        }

        if (markersRef.current.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          markersRef.current.forEach((marker) => {
            bounds.extend(marker.getPosition());
          });
          map.fitBounds(bounds);

          const listener = window.google.maps.event.addListener(
            map,
            "idle",
            () => {
              if (map.getZoom() > 16) map.setZoom(16);
              window.google.maps.event.removeListener(listener);
            }
          );
        }
      } catch (err) {
        setError("Failed to load map data");
        console.error("Map update error: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    updateMapWithLocations();
  }, [map, mapData]);

  const geocodeAddress = (geocoder, address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: address,
          region: "MY",
        },
        (results, status) => {
          if (status === "OK" && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        }
      );
    });
  };

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

      {/* Map info overlay */}
      {!mapData?.origin && !mapData?.destination && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Enter Trip Details</h3>
            <p className="text-muted-background">
              Fill in the origin and destination to see the route on the map
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      {(mapData?.origin || mapData?.destination) && (
        <div className="absolute bottom-4 left-4 bg-card border rounded-lg p-3 shadow-lg">
          <div className="space-y-2 text-sm">
            {mapData.origin && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Origin</span>
              </div>
            )}
            {mapData.destination && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Destination</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
