interface CelestialBodyProps {
  name: string;
  radius: number;
  color: string;
  distanceFromSun: number;
  speed: number;
  hasOrbit: boolean;
}

class CelestialBody implements CelestialBodyProps {
  constructor(
    public name: string,
    public radius: number,
    public color: string,
    public distanceFromSun: number,
    public speed: number,
    public hasOrbit: boolean
  ) {}
}

export { CelestialBody }