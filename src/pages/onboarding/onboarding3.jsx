import { Link } from "react-router";

export default function ThirdOnboard() {
  return (
    <div className="flex flex-col justify-between bg-white h-screen px-6 py-10 relative">
      {/* Imagem principal */}
      <div className="flex-grow flex items-center justify-center">
        <img
          src="/thirdonboarding.svg"
          alt="Onboarding"
          className="w-full h-auto"
        />
      </div>

      {/* Botão Próximo */}
      <Link to="/map" className="w-full flex justify-center">
        <button className="w-full max-w-xs p-3 text-lg font-medium text-white bg-[#145CCC] rounded-full shadow-md transition-all hover:bg-[#104a99]">
          Explorar o mapa
        </button>
      </Link>
    </div>
  );
}