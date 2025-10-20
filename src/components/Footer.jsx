import logo from "../assets/TMC-removebg-preview.png"


const Footer = () => (
    <footer className="bg-green-900 text-white font-mono">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <img
                        src={logo}  
                        alt="TMC Plastics Logo"
                        className="w-20 h-20 object-contain"
                    />
                    <h3 className="text-xl font-bold mb-4">TMC Plastics</h3>
                    <p className="text-gray-400">Your global partner in high-quality, eco-friendly plastics.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="text-gray-400 hover:text-green-500 transition">About</a></li>
                        <li><a href="#products" className="text-gray-400 hover:text-green-500 transition">Products</a></li>
                        <li><a href="#sustainability" className="text-gray-400 hover:text-green-500 transition">Sustainability</a></li>
                        <li><a href="#contact" className="text-gray-400 hover:text-green-500 transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p className="text-gray-400"></p>
                    <p className="text-gray-400">Email: </p>
                    <p className="text-gray-400">Phone: </p>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} TMC Plastics. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;