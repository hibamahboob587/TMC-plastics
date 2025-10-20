import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import SustainabilitySection from "./components/SustainabilitySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize AOS immediately when app loads
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader first
  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-white"
        style={{
          backgroundImage: "linear-gradient(315deg, #59AC77 0%, #fff 100%)",
        }}
      >
        <Loader />
      </div>
    );
  }

  // Then show main content
  return (
    <div
      className="fade-in font-sans min-h-screen fade-in"
      style={{
        backgroundImage: "linear-gradient(315deg, #59AC77 0%, #fff 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <main>
        <HeroSection data-aos="fade-up" />
        <AboutSection data-aos="fade-up" />
        <ProductsSection data-aos="fade-up" />
        <SustainabilitySection data-aos="fade-up" />
        <ContactSection data-aos="fade-up" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
