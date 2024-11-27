import { Link } from "react-router";

// Página inicial do App.
export default function Home() {
  return (
    <>
      {/* Logo centralizada */}
      <div className="flex flex-col items-center justify-center mt-28 sm:mt-20">
        <img src="/logo.png" alt="Logo" width={400} height={400} />
      </div>

      {/* Botões na parte inferior */}
      <div className="flex flex-col items-center gap-4 w-full px-8 mt-20">
        <button className="w-full p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg" />
          <div className="flex items-center justify-center px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent font-bold">
            Cadastre-se
          </div>
        </button>
        {/* Link com estilo Lit up borders */}
        <Link to="/map" className="w-full p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-white rounded-lg" />
          <div className="flex items-center justify-center px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent font-bold">
            Entrar
          </div>
        </Link>
      </div>
    </>
  );
}
