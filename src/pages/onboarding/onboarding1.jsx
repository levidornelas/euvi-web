import { Link } from "react-router";

export default function FirstOnboard() {
  return (
    <div className="flex flex-col justify-between bg-white h-screen px-6 py-10 relative">
      {/* Botão Pular no canto superior direito */}
      <Link
        to="/map"
        className="absolute top-6 right-6 text-[#0671E0] text-lg font-medium hover:underline"
      >
        Pular
      </Link>
      {/* Imagem principal */}
      <div className="flex-grow flex items-center justify-center">
        <img
          src="/firstonboarding.svg"
          alt="Onboarding"
          className="w-full h-auto"
        />
      </div>

      {/* Botão Próximo */}
      <Link to="/o2" className="w-full flex justify-center">
        <button className="w-full max-w-xs p-3 text-lg font-medium text-white bg-[#145CCC] rounded-full shadow-md transition-all hover:bg-[#104a99] mb-6">
          Próximo
        </button>
      </Link>
    </div>
  );
}
