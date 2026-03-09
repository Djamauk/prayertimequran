import { useState, useEffect } from "react";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRad(deg: number) { return deg * Math.PI / 180; }
function toDeg(rad: number) { return rad * 180 / Math.PI; }

function calculateQibla(lat: number, lng: number): number {
  const phiK = toRad(KAABA_LAT);
  const lambdaK = toRad(KAABA_LNG);
  const phi = toRad(lat);
  const lambda = toRad(lng);
  const num = Math.sin(lambdaK - lambda);
  const den = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  let qibla = toDeg(Math.atan2(num, den));
  if (qibla < 0) qibla += 360;
  return qibla;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearingToCompass(bearing: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(bearing / 45) % 8];
}

export function useQibla() {
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [compassDir, setCompassDir] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const bearing = calculateQibla(latitude, longitude);
        setQiblaBearing(bearing);
        setDistance(Math.round(haversineDistance(latitude, longitude, KAABA_LAT, KAABA_LNG)));
        setCompassDir(bearingToCompass(bearing));
        setLoading(false);
      },
      () => {
        // Fallback: assume a default location
        const bearing = calculateQibla(40.7128, -74.006); // NYC fallback
        setQiblaBearing(bearing);
        setDistance(Math.round(haversineDistance(40.7128, -74.006, KAABA_LAT, KAABA_LNG)));
        setCompassDir(bearingToCompass(bearing));
        setError("Location unavailable, showing default");
        setLoading(false);
      }
    );
  }, []);

  // Try device orientation for compass
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha != null) setCompassHeading(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  return { qiblaBearing, distance, compassDir, loading, error, compassHeading };
}
