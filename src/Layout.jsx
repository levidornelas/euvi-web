import React from "react";
import "./index.css";

function RootLayout({ children }) {
  return (
    <div className="bg-zinc-400 h-screen w-screen flex items-center justify-center">
      <div className="relative h-full sm:min-h-[90vh] w-[400px] bg-blue-200 shadow-xl overflow-auto">
        {/* A tela de celular simula uma tela cheia em dispositivos menores e com bordas no desktop */}
        <div className="h-full w-full relative">{children}</div>
      </div>
    </div>
  );
}

export default RootLayout;
