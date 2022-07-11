import Header from "../components/Header";
import Main from "../components/Main";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WINDEX</title>
        <meta
          name="WINDEX"
          content="Decentralized Exchange" /* description */
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
    </div>
  );
}
