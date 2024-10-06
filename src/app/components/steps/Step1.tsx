import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import Link from "next/link";

export default function() {
  const { currentStep, setCurrentStep } = useSettingsStore();
  
  return (
    <section>
      <div className={`text-white text-4xl z-10`}>
        <p>Planets Wiki</p>
        <p className="text-lg">Learn about Celestial Bodies in our Solar System</p>
        <Button variant="secondary" onClick={() => setCurrentStep(2)} className="py-2">
          Start
        </Button>
        <div className="h-20"></div>
        <p className="text-xs py-5">Use Desktop For A Better Experience</p>
        <p className="text-xs">NASA SpaceApps Challenge 2024</p>
        <p className="text-xs">
          ©
          <Link href="https://www.heryan.dev" target="_blank" rel="noopener noreferrer" className="underline text-xs">
            {" "}heryan.dev
          </Link>
        </p>
      </div>
    </section>
  )
}