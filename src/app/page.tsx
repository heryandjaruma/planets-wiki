import Head from "next/head";
import OrreryFiber from "./components/OrreryFiber";
import { pjs, tapioca, tapiocaShadow } from "./fonts";
import useSettingsStore from "@/stores/useSettingsStore";
import Texts from "./components/text/Texts";
import { FaWpexplorer } from "react-icons/fa";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconTerminal2 } from "@tabler/icons-react";
import Dock from "./components/Dock";
import { FloatingNav } from "./components/floating-navbar";

export default function Home() {
  
  const navItems = [
    {
      name: "Home",
      link: "/",
      // icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
      icon: <FaWpexplorer />
    },
    {
      name: "About",
      link: "/about",
      // icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
      icon: <FaWpexplorer />
    },
    { 
      name: "Contact",
      link: "/contact",
      // icon: (
      //   <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      // ),
      icon: <FaWpexplorer />
    },
  ];
  

  return (
    <div>
      <div>
        <Head>
          <title>Dynamic Orrery</title>
          <meta name="description" content="Dynamic Orrery with Three.js in Next.js" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="relative w-full h-full">
          
          <div className="absolute bottom-0 left-0 w-full z-20">
            <FloatingNav navItems={navItems} className="absolute top-0 left-0 w-full z-50" />
          </div>
          
          <OrreryFiber className="absolute top-0 left-0" />
          
          <Texts />
          
          {/* <div className="absolute bottom-0 left-0 w-full z-20">
            <Dock />
          </div> */}
          
          <div className="absolute bottom-0 left-0 p-4 text-white z-10 text-xs select-none">Bodies are not to scale</div>
          
          <div className={`w-full h-full bg-black text-white absolute top-0 left-0 z-50 visible xl:hidden flex items-center justify-center ${pjs.className}`}>
            <p>Please use desktop or tablet site.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
