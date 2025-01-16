import { FaUserAlt, FaEye, FaMap } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../firebasefunctions/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function BottomNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setShowModal(true); // Exibe o modal se não autenticado
    } else {
      navigate("/perfil"); // Redireciona para o perfil se autenticado
    }
  };

  const closeModal = () => {
    setShowModal(false); // Fecha o modal
  };

  const goToLogin = () => {
    setShowModal(false); // Fecha o modal
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div>
      {/* Bottom Navbar */}
      <div className="table-fixed bottom-0 w-full bg-[#145CCC] text-white flex justify-around py-3 shadow-md h-14 sm:h-18">
        {/* Ícone de mapa */}
        <Link to="/" className="flex flex-col items-center text-white">
          <FaEye className="text-xl" />
          <span className="text-xs">Sobre</span>
        </Link>

        {/* Ícone de perfil */}
        <Link to="/map" className="flex flex-col items-center text-white">
          <FaMap className="text-xl" />
          <span className="text-xs">Mapa</span>
        </Link>

        <div
          onClick={handleProfileClick}
          className="flex flex-col items-center text-white cursor-pointer"
        >
          <FaUserAlt className="text-xl" />
          <span className="text-xs">Perfil</span>
        </div>


      </div>

      {/* Modal de Alerta */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Você ainda não está logado!</h2>
            <p className="text-gray-600 mb-4">
              Crie uma conta ou entre para apoiar nosso projeto.
            </p>
            <div className="flex justify-between">
              <button
                onClick={goToLogin}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
              >
                Entrar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
