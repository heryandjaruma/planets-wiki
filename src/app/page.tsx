import Head from "next/head";
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
        <h1>Welcome to the Orrery!</h1>
        <OrreryFiber />
      </main>
    </div>
    </div>
  );
}
