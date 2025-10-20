import React from "react";
import Icon from "./icons";

const AboutSection = () => (
    <section id="about" className="py-20 bg-white font-mono">
        <div className="container mx-auto px-6" data-aos="fade-up">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-green-950">Pioneering Sustainable Plastics</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                    TMC Plastics was founded with a clear mission: to revolutionize the plastics industry by providing high-performance, eco-friendly alternatives that don't compromise on quality.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center" data-aos="zoom-in">
                
                    <div className="p-6">
                        <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                            <Icon name="leaf" className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-950 mb-2">Our Mission</h3>
                        <p className="text-gray-600">
                            To lead the global transition to sustainable plastics through innovation, quality, and a commitment to our planet.
                        </p>
                    </div>
                
                <div className="p-6">
                     <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                         <Icon name="globe" className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-950 mb-2">Global Reach</h3>
                    <p className="text-gray-600">
                        We serve B2B clients across continents, offering reliable logistics and consistent supply chains for your manufacturing needs.
                    </p>
                </div>
                 <div className="p-6">
                    <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
                         <Icon name="award" className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-950 mb-2">Certified Quality</h3>
                    <p className="text-gray-600">
                        Our products meet rigorous international standards for quality and sustainability, ensuring you receive only the best materials.
                    </p>
                </div>
            </div>
        </div>
        
    </section>
);

export default AboutSection;
