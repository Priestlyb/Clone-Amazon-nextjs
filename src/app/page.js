import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* ---- TO BEGIN, delete this section and GET CODING!!! ---- */}
      <div className="grid place-items-center mt-10">
        <h1 className="text-5xl">Lets build Amazon 2.0</h1>
        <h2>This is your starter template!</h2>
        <br />
        <h3 className="font-bold">
          We will be using Next.js / Tailwind CSS / Redux / Firebase / NextAuth
        </h3>
        <i>(Dont worry, its all setup and ready to use!)</i>
        <h4>Get Ready, Get Set, GO!!!</h4>

        <p className="mt-24">Built with 💙 by Priestly bassey</p>
      </div>
      {/* ---- ---- */}
    </div>
  );
}
