export function simulateLocationDrift(baseGeo: { lat: number; lon: number }) {
    const drift = () => (Math.random() - 0.5) * 0.01; // ~1km drift
  
    return {
      latitude: baseGeo.lat + drift(),
      longitude: baseGeo.lon + drift(),
      accuracy: 100 + Math.random() * 50,
    };
  }
  
  export async function applyGeoOverride(page: any, baseGeo: { lat: number; lon: number }) {
    const drifted = simulateLocationDrift(baseGeo);
    await page.setGeolocation({
      latitude: drifted.latitude,
      longitude: drifted.longitude,
      accuracy: drifted.accuracy,
    });
  }
  