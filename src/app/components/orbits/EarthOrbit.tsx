import useSettingsStore from "@/stores/useSettingsStore";
import { Line } from "@react-three/drei";
import { Body, HelioVector } from "astronomy-engine";
import { useMemo } from "react";

function EarthOrbit() {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);

  // UseMemo to avoid recalculating points on each render
  const points = useMemo(() => {
    const orbitPoints: [number, number, number][] = []; // Explicitly define the tuple type
    const startDate = new Date('2024-01-01T00:00:00Z');
    const halfDayInMs = 86400000 / 2; // Sample every 12 hours
    const daysInYear = 365 * 2; // Double the points by sampling every 12 hours

    for (let i = 0; i < daysInYear; i++) {
      const currentDate = new Date(startDate.getTime() + i * halfDayInMs);
      const earthPosition = HelioVector(Body.Earth, currentDate);

      // Ensure we push a tuple of [x, y, z] explicitly
      orbitPoints.push([
        earthPosition.x * scalingFactor,
        earthPosition.y * scalingFactor,
        earthPosition.z * scalingFactor
      ]);
    }

    // Add the starting point again to close the loop and complete the orbit
    const firstPosition = orbitPoints[0];
    orbitPoints.push([firstPosition[0], firstPosition[1], firstPosition[2]]);

    return orbitPoints;
  }, []);

  // Render the orbit path using the Line component
  return <Line points={points} color="gray" lineWidth={1} />;
}

export default EarthOrbit