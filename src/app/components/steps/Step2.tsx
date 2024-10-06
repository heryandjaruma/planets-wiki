import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import Link from "next/link";

export default function Step2() {
  const { currentStep, setCurrentStep } = useSettingsStore();
  
  return (
    <section>
      <div className={`text-white z-10 select-none`}>
        <p className="text-3xl">The Sun</p>
        <p className="text-lg">Learn about Celestial Bodies in our Solar System</p>
        <div className="h-10"></div>
        <p className="w-3/4">The Sun is a giant, nearly perfect sphere of hot plasma, and its core reaches temperatures of about 15 million degrees Celsius (27 million degrees Fahrenheit). This intense heat drives nuclear fusion, where hydrogen atoms fuse to form helium, releasing massive amounts of energy that powers the Sun and provides light and warmth to our solar system.</p>
        
        <p className="py-4">
          Interact with the background to see our sun.
        </p>
        
        <Button variant="secondary" onClick={() => setCurrentStep(3)}>
          Next
        </Button>

      </div>
    </section>
  )
}