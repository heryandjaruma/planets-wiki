import Head from "next/head";
import Image from "next/image";
import Orrery from "./components/Orrery";
import OrreryFiber from "./components/OrreryFiber";

export default function Home() {
  return (
    <div>
      <div>
      <Head>
        <title>Dynamic Orrery</title>
        <meta name="description" content="Dynamic Orrery with Three.js in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the Dynamic Orrery!</h1>
        {/* <Orrery /> */}
        <OrreryFiber />
      </main>
    </div>
    </div>
  );
}
