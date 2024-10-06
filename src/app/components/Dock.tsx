"use client"

import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconTerminal2 } from "@tabler/icons-react";

export default function Dock() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    }
  ];
  
  
  return (
    <section>
      <FloatingDock items={links} />
    </section>
  )
}