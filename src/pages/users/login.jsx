import React, { useState } from "react";
import { handleLogin } from "../../firebasefunctions/firebase_login";
import { useNavigate } from "react-router-dom";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    handleLogin(email, password, navigate, setError);
  };

  // Função para redirecionar para o mapa
  const navigateToMap = () => {
    navigate('/map');
  };

  return (
    <>
      <div className="absolute top-0 right-0">
        <img
          src="/logo_branca.png"
          alt="EUVI Logo"
          className="w-40 top-0 object-contain h-32"
        />
      </div>
      <div className="relative min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden mt-24">
          <div className="bg-blue-600 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">Seja bem-vindo(a) ao Eu Vi - Recife!</h2>
            <p className="text-blue-100">Faça login para apoiar nosso projeto!</p>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-4 mb-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className=" text-lg font-medium w-full flex items-center justify-center bg-[#0650FF] text-white p-4 rounded-full hover:bg-blue-500 transition"
              >
                Entrar
              </button>
            </form>

            <button
              onClick={navigateToMap} // Função de navegação para o mapa
              className="w-full flex items-center justify-center bg-emerald-600 text-white p-4 rounded-full hover:bg-emerald-500 transition mt-4 text-lg font-medium "
            >
              Voltar para o mapa
            </button>

            <div className="text-center mt-6">
              <p className="mt-4 text-gray-600">
                Não tem uma conta?
                <a
                  href="/cadastro"
                  className="text-blue-600 hover:text-blue-800 ml-1 transition"
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
