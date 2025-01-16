import { authentication } from "./firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

// Componente PrivateRoute para proteger as rotas
export const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica a autenticação com Firebase
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false); // Usuário não autenticado
      }
      setLoading(false);  // Finaliza o carregamento
    });

    return unsubscribe; // Limpeza da subscrição
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login"); // Redireciona para a página de login se não autenticado
    }
  }, [isAuthenticated, loading, navigate]);
  if (loading) {
    return <div>Carregando...</div>; // Mostra algo enquanto verifica o estado
  }
  if (isAuthenticated) {
    return element; // Retorna o componente protegido
  }
  // Em caso de não autenticado, o redirecionamento é tratado no useEffect
  return null;
};
