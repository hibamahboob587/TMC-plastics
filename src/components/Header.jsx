import React, { useState } from "react";
import Icon from "./icons";
import logo from "../assets/TMC-removebg-preview.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const navLinks = [
    { href: "#about", text: "About Us" },
    { href: "#products", text: "Products" },
    { href: "#sustainability", text: "Sustainability" },
    { href: "#contact", text: "Contact" },
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage(""); // Reset message

  const formData = new FormData();
  formData.append("email", userEmail);

  try {
    const response = await fetch("https://submit-form.com/FNiQqOf7o", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
        setIsSubmitting(false);
        setMessage("Quote sent successfully!");
        setUserEmail("");
        // Wait for 2 seconds before hiding the form
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowForm(false);
        setMessage(""); // Optional: clear the message after hiding
    } else {
      console.error("Form submission failed, response not OK.");
      setMessage("Failed to send quote. Please try again.");
    }
    } catch (error) {
        console.error("Error during form submission:", error);
        setMessage("Something went wrong. Please try again later.");
    } 
    };
  return (
    
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm font-mono">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="TMC Plastics Logo" className="w-20 h-20 object-contain" />
            <span className="text-2xl font-bold text-green-950">TMC Plastics</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium"
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Request a Quote Button */}
          <button
            onClick={() => setShowForm(true)}
            className="hidden md:inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Request a Quote
          </button>

          {/* Mobile Menu Button */}
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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 font-medium text-lg"
                >
                  {link.text}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowForm(true);
                }}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 w-11/12 text-center"
              >
                Request a Quote
              </button>
            </nav>
          </div>
        )}
      </header> 
      

      

      {/* Email Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Get a Sustainability Quote
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                {isSubmitting ? "Sending..." : "Send Quote"}
              </button>
            </form>
            
            {/* Show message inside the modal if it exists */}
            {message && (
              <p className={`text-sm py-2 font-medium ${message.startsWith('❌') ? 'text-red-600' : 'text-green-700'}`}>
                {message}
              </p>
            )}

            <button
              onClick={() => {
                setShowForm(false);
                setMessage(""); // Clear message on close
              }}
              className="mt-4 text-gray-500 hover:text-red-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      
    </> 
  );
};

export default Header;