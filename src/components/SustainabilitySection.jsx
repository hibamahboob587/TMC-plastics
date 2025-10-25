import React from "react";

import sustain from "../assets/sustainability.png"
import icon from "../assets/recycle.png"
const SustainabilitySection = () => (
    <section id="sustainability" className="py-20 bg-white font-mono">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="pr-0 md:pr-10">
                     <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full mb-4">
                        <img src={icon} alt="recycle" className="w-5 h-5"/>
                        
                        <span>Our Green Commitment</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">A Circular Approach to Plastics</h2>
                    <p className="text-gray-600 mb-4 text-lg">
                        Sustainability is at the core of everything we do. We're not just selling products; we're providing solutions that help build a circular economy.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <div className="bg-green-500 rounded-full p-1 mt-1 mr-3 flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="text-gray-600">Reducing carbon footprint through energy-efficient manufacturing.</span>
                        </li>
                         <li className="flex items-start">
                            <div className="bg-green-500 rounded-full p-1 mt-1 mr-3 flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="text-gray-600">Sourcing raw materials from certified sustainable and recycled streams.</span>
                        </li>
                         <li className="flex items-start">
                             <div className="bg-green-500 rounded-full p-1 mt-1 mr-3 flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="text-gray-600">Investing in R&D to create next-generation biodegradable materials.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <img 
                        src={sustain} 
                        alt="A factory with green initiatives" 
                        className="rounded-lg shadow-2xl w-full h-auto"
                        onError={(e) => e.target.src = 'https://placehold.co/600x400/a0d9b1/333333?text=Sustainability'}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default SustainabilitySection;
