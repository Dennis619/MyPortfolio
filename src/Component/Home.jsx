import React from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import SkillsSection from "./SkillsSection";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Projects from "./Projects";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <SkillsSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
