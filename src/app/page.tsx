import Head from "next/head";
import OrreryFiber from "./components/OrreryFiber";
import { tapioca, tapiocaShadow } from "./fonts";

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
        {/* <h1 className={`absolute top-20 right-0 text-2xl z-50 text-white ${tapioca.className}`}>Planets Wiki</h1> */}
      </main>
    </div>
    </div>
  );
}
