import React from "react";
import logo from "../assets/TMC-removebg-preview.png"
const HeroSection = () => (
    <section className="relative bg-gray-50 overflow-hidden font-mono">
        <div className="container mx-auto px-6 py-20 md:py-32 text-center md:text-left relative z-10" data-aos="zoom-out">
            <div className="md:w-3/5">
                <h1 className="text-4xl md:text-6xl font-extrabold text-green-950 leading-tight mb-4">
                    Sustainable Plastic Solutions for a Greener Tomorrow.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    Your Global Partner in High-Quality, Eco-Friendly Plastics. We provide innovative, reliable, and sustainable materials for businesses worldwide.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <a href="#contact" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Let's Talk
                    </a>
                    <a href="#products" className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg border border-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Our Products
                    </a>
                </div>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full md:w-2/5 z-0">
            <img 
                src={logo} 
                alt="TMC Plastics Eco-Friendly Logo" 
                className="w-full h-full object-contain p-8 md:p-12 opacity-20 md:opacity-100 mix-blend-multiply"

            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent md:bg-gradient-to-r md:from-gray-50 md:via-gray-50/80 md:to-transparent"></div>
        </div>
    </section>
);
export default HeroSection;
