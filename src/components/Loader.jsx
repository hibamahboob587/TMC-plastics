import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/70 to-white z-50">
      <img
        src="src\assets\TMC.png"  // ← update this path
        alt="Loading..."
        className="w-40 h-40 animate-pulse opacity-90"
      />
    </div>
  );
};

export default Loader;
