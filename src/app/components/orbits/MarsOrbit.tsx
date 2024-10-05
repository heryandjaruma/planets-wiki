import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Body, HelioVector } from 'astronomy-engine';
import useSettingsStore from '@/stores/useSettingsStore';

function MarsOrbit() {
  const scalingFactor = useSettingsStore((state) => state.scalingFactor);

  // UseMemo to avoid recalculating points on each render
  const points = useMemo(() => {
    const orbitPoints: [number, number, number][] = [];
    const startDate = new Date('2024-01-01T00:00:00Z');
    const halfDayInMs = 86400000 / 2; // Sample every 12 hours
    const daysInYear = 687 * 2; // Mars takes about 687 Earth days to orbit the Sun

    for (let i = 0; i < daysInYear; i++) {
      const currentDate = new Date(startDate.getTime() + i * halfDayInMs);
      const marsPosition = HelioVector(Body.Mars, currentDate);

      orbitPoints.push([
        marsPosition.x * scalingFactor,
        marsPosition.y * scalingFactor,
        marsPosition.z * scalingFactor
      ]);
    }

    // Add the starting point again to close the loop
    const firstPosition = orbitPoints[0];
    orbitPoints.push([firstPosition[0], firstPosition[1], firstPosition[2]]);

    return orbitPoints;
  }, []);

  // Render the orbit path using the Line component
  return <Line points={points} color="gray" lineWidth={1} />;
}

export default MarsOrbit;
