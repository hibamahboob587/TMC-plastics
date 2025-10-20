import React from "react";

const ProductsSection = () => {
  const products = [
    { 
      name: "Bio-Based Polymers (PLA)", 
      description: "Compostable and biodegradable plastics derived from renewable resources like corn starch. Ideal for packaging and single-use items.",
      imageUrl: "https://images.unsplash.com/photo-1614536723233-2527ac83d46b?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      name: "Recycled PET (rPET)", 
      description: "High-quality, food-grade recycled polyethylene terephthalate, perfect for beverage bottles, food containers, and textiles.",
      imageUrl: "https://images.unsplash.com/photo-1595135585936-c3510d5405a1?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      name: "Recycled HDPE (rHDPE)", 
      description: "Durable and versatile recycled high-density polyethylene used for pipes, containers, and plastic lumber.",
      imageUrl: "https://images.unsplash.com/photo-1629471583848-18579435b810?q=80&w=1964&auto=format&fit=crop"
    },
    { 
      name: "Custom Compounds", 
      description: "We work with you to develop custom eco-friendly plastic compounds tailored to your specific application and performance requirements.",
      imageUrl: "https://images.unsplash.com/photo-1560962322-799203a1b55c?q=80&w=2070&auto=format&fit=crop"
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50 font-mono">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-950">
            Our Eco-Friendly Product Lines
          </h2>
          
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {products.map((product, index) => (
            <div
              key={index}
              data-aos="fade-right"
              className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-60 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:opacity-80 transition-opacity duration-500"></div>

              

              {/* Hidden Bottom Text */}
              <div className="absolute bg-white text-gray-800 -bottom-28 w-full p-4 flex flex-col gap-1 group-hover:bottom-0 group-hover:duration-500 duration-500">
                <span className="text-green-600 font-bold text-xs uppercase">Sustainable</span>
                <h3 className="text-green-950 font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
