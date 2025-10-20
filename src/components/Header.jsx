import React from "react";
import Icon from "./icons";
import logo from "../assets/TMC-removebg-preview.png"
const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const navLinks = [
        { href: "#about", text: "About Us" },
        { href: "#products", text: "Products" },
        { href: "#sustainability", text: "Sustainability" },
        { href: "#contact", text: "Contact" },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm font-mono">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}  
                        alt="TMC Plastics Logo"
                        className="w-20 h-20 object-contain"
                    />
                    <span className="text-2xl font-bold text-green-950">TMC Plastics</span>
                </div>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium">
                            {link.text}
                        </a>
                    ))}
                </nav>
                <a href="#contact" className="hidden md:inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                    Request a Quote
                </a>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
                        <Icon name="menu" className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium text-lg">
                                {link.text}
                            </a>
                        ))}
                        <a href="#contact" onClick={() => setIsOpen(false)} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 w-11/12 text-center">
                            Request a Quote
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};
export default Header;
