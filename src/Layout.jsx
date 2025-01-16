import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

export default function RootLayout({ children }) {
  const location = useLocation();

  // Verifica se estamos na página de detalhes
  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${isDetailsPage ? "bg-zinc-500" : "bg-zinc-500"
        }`} // Ajusta o fundo conforme a página
    >
      <div className="relative h-full sm:min-h-[95vh] w-[400px] bg-[#145CCC] shadow-xl overflow-auto">
        {/* A tela de celular simula uma tela cheia em dispositivos menores e com bordas no desktop */}
        <div className="h-full w-full relative">{children}</div>
      </div>
    </div>
  );
}
