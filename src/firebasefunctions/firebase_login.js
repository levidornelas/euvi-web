import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase_config";

export const handleLogin = async (email, password, navigate, setError) => {
  try {
    await signInWithEmailAndPassword(authentication, email, password);
    console.log("Login realizado com sucesso!");
    navigate("/map");
  } catch (error) {
    console.log("E-mail ou senha inválidos.");
    setError("E-mail ou senha inválidos."); // Atualiza o estado de erro com a mensagem
  }
};
