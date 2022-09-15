import type { NextPage } from "next";
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Three.js Repro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">Hello world</main>
    </div>
  );
};

export default Home;
