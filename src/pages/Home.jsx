import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import AboutUs from "../sections/AboutUs";
import Counts from "../sections/Counts";
import Offers from "../sections/Offers";
import BookUs from "../sections/BookUs";
import Chefs from "../sections/Chefs";
import Contact from "../sections/Contact";
import Gallery from "../sections/Gallery";
import MenuSection from "../sections/MenuSection";

const Home = () => {
  return (
    <main>
      <section className="max-w-screen-lg mx-auto">
        <Hero />
      </section>
      <section id="about" className="max-w-screen-lg mx-auto">
        <AboutUs />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Counts />
      </section>
      <section className="max-w-screen-lg mx-auto">
        <MenuSection />
      </section>
      <section className="max-w-screen-lg mx-auto">
        <Offers />
      </section>
      <section className="max-w-screen-lg mx-auto">
        <BookUs />
      </section>
      <section id="chefs">
        <Chefs />
      </section>
      <section id="gallery" className="max-w-screen-lg mx-auto">
        <Gallery />
      </section>
      <section id="contact" className="max-w-screen-lg mx-auto">
        <Contact />
      </section>
    </main>
  );
};

export default Home;
