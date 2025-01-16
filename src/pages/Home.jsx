import { Link } from "react-router";

// Página inicial do App.
export default function Home() {
  return (
    <>
      <div></div>
      {/* Logo centralizada */}
      <div className="flex flex-col items-center justify-center mt-28 sm:mt-20">
        <img src="/logobranca.svg" alt="Logo" width={400} height={400} />
        {/* Título abaixo da logo */}
        <h1 className="text-4xl font-bold text-white mt-0">Recife</h1>
      </div>

      {/* Botões na parte inferior */}
      <div className="flex flex-col items-center gap-4 w-full px-8 mt-20 overflow-y-hidden">
        <Link to="/o1" className="w-full p-[3px] relative flex justify-center">
          <a
            href="#_"
            className="relative inline-flex items-center justify-center px-20 py-3 text-lg font-medium tracking-tighter text-[#145CCC] bg-white rounded-full border-2 border-[#145CCC] shadow-lg group transition duration-300 ease-in-out"
          >
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#d5e8ff] rounded-full group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-full"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#d5e8ff] rounded-full opacity-0 group-hover:opacity-100"></span>
            <span className="relative text-[#145CCC] transition-colors duration-200 ease-in-out delay-100 group-hover:text-black">
              Explorar
            </span>
          </a>
        </Link>
      </div>
    </>
  );
}
