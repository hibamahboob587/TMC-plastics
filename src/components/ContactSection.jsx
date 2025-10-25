import React from "react";

const ContactSection = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        company: '',
        email: '',
        country: '',
        message: ''
    });
    const [status, setStatus] = React.useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (formData.name.length < 2) return setStatus("Name must be at least 2 characters");
        if (formData.company.length < 2) return setStatus("Company name must be at least 2 characters");
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) return setStatus("Please enter a valid email");
        if (formData.country.length < 2) return setStatus("Country must be at least 2 characters");
        if (formData.message.length < 10) return setStatus("Message must be at least 10 characters");

        try {
            const response = await fetch("https://formspree.io/f/myzbgveo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setFormData({ name: '', company: '', email: '', country: '', message: '' });
            } else {
                setStatus("Error submitting form. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("Server not responding.");
        }

        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 font-mono" data-aos="zoom-out">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-950">Partner With Us</h2>
                </div>
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={50}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={formData.company}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={100}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Business Email"
                                value={formData.email}
                                onChange={handleChange}
                                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={50}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Tell us about your needs (e.g., material type, quantity, application)"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            minLength={10}
                            maxLength={1000}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition mb-6"
                        ></textarea>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Send Inquiry
                            </button>
                        </div>
                    </form>
                    {status && (
                        <p className="mt-6 text-center text-green-700 bg-green-100 p-3 rounded-lg">{status}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
