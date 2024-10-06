'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSettingsStore from '@/stores/useSettingsStore';
import { useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";

const Main = () => {
  const { currentStep, setCurrentStep } = useSettingsStore();


  return (
    <section className="absolute grid place-items-center z-10 top-0 right-0 w-1/2 h-full p-4">
      { currentStep === 1 ? (
        <Step1 />
      ) : currentStep === 2 ? (
        <Step2 />
      ) :  currentStep === 3 ? (
        <Step3 />
      ) : ( 
        <Step4 />
      )}
    </section>
  );
};

export default Main;
