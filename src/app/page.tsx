import Head from "next/head";
import OrreryFiber from "./components/OrreryFiber";
import { tapioca, tapiocaShadow } from "./fonts";
import useSettingsStore from "@/stores/useSettingsStore";
import Main from "./text/Main";

export default function Home() {
  
  return (
    <div>
      <div>
        <Head>
          <title>Dynamic Orrery</title>
          <meta name="description" content="Dynamic Orrery with Three.js in Next.js" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="relative w-full h-full">
          <OrreryFiber className="absolute top-0 left-0" />
          
          <Main />
          
          <div className="absolute bottom-0 left-0 p-4 text-white z-10 text-sm">Bodies are not to scale</div>
        </main>
      </div>
    </div>
  );
}
