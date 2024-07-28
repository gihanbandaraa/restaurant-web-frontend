import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import AboutUs from "../sections/AboutUs";
import Counts from "../sections/Counts";

const Home = () => {
  return (
    <main>
      <section className="max-w-screen-lg mx-auto">
        <Hero />
      </section>
      <section className="max-w-screen-lg mx-auto">
        <AboutUs />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Counts />
      </section>
    </main>
  );
};

export default Home;
