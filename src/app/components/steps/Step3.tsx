import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import Link from "next/link";

export default function Step3() {
  const { currentStep, setCurrentStep } = useSettingsStore();
  
  return (
    <section>
      <div className={`text-white z-10 select-none`}>
        <p className="text-3xl">Earth</p>
        <p className="text-lg">Learn about Celestial Bodies in our Solar System</p>
        <div className="h-10"></div>
        <div className="w-3/4">
          <p>Earth is the only known planet that supports life, thanks to its perfect location in the "Goldilocks zone," where conditions are just right for liquid water. Its atmosphere protects us from harmful solar radiation while providing the oxygen and resources life needs to thrive. Despite challenges like climate change, Earth's ecosystems are resilient, offering hope that with care and sustainable practices, we can protect and restore the planet for future generations to enjoy its beauty and diversity.</p>
          <br />
          <p>Earth's relationship with the Moon plays a crucial role in sustaining life. The Moon's gravitational pull stabilizes Earth's tilt, which helps regulate the climate by moderating seasonal variations. It also creates ocean tides, essential for marine ecosystems and the circulation of nutrients. Together, Earth and the Moon form a unique partnership that has shaped the conditions for life on our planet, reminding us of the delicate balance that makes Earth so special.</p>
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