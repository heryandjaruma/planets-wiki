import useSettingsStore from "@/stores/useSettingsStore";
import { Line } from "@react-three/drei";
import { Body, HelioVector } from "astronomy-engine";
import { useMemo } from "react";

function JupiterOrbit() {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);

  // UseMemo to avoid recalculating points on each render
  const points = useMemo(() => {
    const orbitPoints: [number, number, number][] = []; // Explicitly define the tuple type
    const startDate = new Date('2024-01-01T00:00:00Z');
    const halfDayInMs = 86400000 / 2; // Sample every 12 hours
    const jupiterOrbitalPeriod = 4332.59; // Jupiter takes about 4332.59 Earth days to orbit the Sun

    for (let i = 0; i < jupiterOrbitalPeriod * 2; i++) { // Sample every 12 hours
      const currentDate = new Date(startDate.getTime() + i * halfDayInMs);
      const jupiterPosition = HelioVector(Body.Jupiter, currentDate);

      // Ensure we push a tuple of [x, y, z] explicitly
      orbitPoints.push([
        jupiterPosition.x * scalingFactor,
        jupiterPosition.y * scalingFactor,
        jupiterPosition.z * scalingFactor
      ]);
    }

    // Add the starting point again to close the loop and complete the orbit
    const firstPosition = orbitPoints[0];
    orbitPoints.push([firstPosition[0], firstPosition[1], firstPosition[2]]);

    return orbitPoints;
  }, [scalingFactor]);

  return <Line points={points} color="white" lineWidth={1} />;
}

export default JupiterOrbit;
