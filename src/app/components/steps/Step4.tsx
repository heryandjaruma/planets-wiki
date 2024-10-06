import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import Link from "next/link";

export default function Step4() {
  const { currentStep, setCurrentStep } = useSettingsStore();
  
  return (
    <section>
      <div className={`text-white z-10 select-none`}>
        <p className="text-3xl">Mercury</p>
        <p className="text-lg">Learn about Celestial Bodies in our Solar System</p>
        <div className="h-10"></div>
        <div className="w-3/4">
        <p>Mercury is the smallest and closest planet to the Sun, with a surface that experiences extreme temperature swings. During the day, temperatures can soar to about 430°C (800°F), but at night, they drop to as low as -180°C (-290°F). Despite being so close to the Sun, Mercury has no significant atmosphere to retain heat, leading to these drastic shifts.</p>
        <br />
        <p>The planet&apos;s surface is covered with craters and ridges, similar to our Moon, a testament to its ancient history of impacts. Mercury also has a weak magnetic field, which is surprising for a small planet with a slow rotation. Although it&apos;s barren and inhospitable, Mercury&apos;s resilience to the Sun&apos;s harsh environment provides scientists with valuable insights into the formation and evolution of rocky planets.</p>
        </div>
        
        <div className="py-6">
          <Button variant="secondary" onClick={() => setCurrentStep(4)}>
            Next
          </Button>
          
        </div>
      </div>
    </section>
  )
}