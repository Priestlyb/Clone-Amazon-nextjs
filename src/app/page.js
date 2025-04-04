import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";

function Home() {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <Header />

      <div className="max-w-screen-2xl mx-auto">
        <Banner />
      </div>
    </div>
  );
}

export default Home;
