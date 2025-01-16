import React, { useState } from "react";
import { handleSignup } from "../../firebasefunctions/firebase_cadastro";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar a senha
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(""); // Estado de erro
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    setError(""); // Limpa a mensagem de erro antes de tentar o cadastro

    // Validação das senhas
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    handleSignup(email, password, firstName, lastName, navigate, setError); // Passa o valor de setError para lidar com erros
  };

  return (
    <>
      <div className="absolute top-0 right-0">
        <img
          src="/logo_branca.png"
          alt="EUVI Logo"
          className="w-40 top-0 object-contain h-24"
        />
      </div>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-0">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-black mb-4">
            Cadastro
          </h2>

          {/* Exibe a mensagem de erro se houver */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Primeiro Nome"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Insira sua senha"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repita sua senha"
              className="w-full p-3 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-full hover:bg-blue-500"
            >
              Cadastrar
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="mt-4 text-gray-600">
              Já tem uma conta?
              <a
                href="/Login"
                className="text-blue-600 hover:text-blue-800 ml-1 transition"
              >
                Fazer Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}