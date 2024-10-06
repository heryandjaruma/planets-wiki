import { paytone, pjs } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import Link from "next/link";

export default function Step1() {
  const { currentStep, setCurrentStep } = useSettingsStore();
  
  return (
    <section>
      <div className={`w-full text-white z-10 grid gap-y-8`}>
        <div className="grid gap-y-2">
          <p className={`${paytone.className} text-4xl`}>Planets.wiki</p>
          <p className={`text-lg ${pjs.className}`}>Learn about Celestial Bodies in our Solar System</p>
        </div>
        
        <Button variant="secondary" onClick={() => setCurrentStep(2)} className="py-2 z-50 w-1/3 pointer-events-auto">
          Start
        </Button>
        
        <div className="grid gap-y-2">
          <p className="text-xs">Use Desktop For A Better Experience</p>
          <p className="text-xs">NASA SpaceApps Challenge 2024</p>
        </div>
        
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