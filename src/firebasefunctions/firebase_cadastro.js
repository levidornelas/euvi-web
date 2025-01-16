import { authentication } from "./firebase_config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase_config";

export const handleSignup = async (email, password, firstName, lastName, navigate, setError) => {
  try {
    // Criando o usuário com email e senha
    const userCredential = await createUserWithEmailAndPassword(authentication, email, password);

    // Concatenando nome e sobrenome para o campo displayName
    const displayName = `${firstName} ${lastName}`;

    // Atualizando o perfil do usuário com nome e sobrenome
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

    // Criando um documento no Firestore para armazenar nome e sobrenome
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      displayName: displayName,
    });

    // Navegar para a página de login após sucesso
    navigate('/login');

    // Exibindo o alerta com o nome do usuário
    alert(`Sucesso, ${displayName}. Conta criada.`);
  } catch (error) {
    // Tratando erros comuns com mensagens amigáveis
    if (error.code === 'auth/email-already-in-use') {
      setError("Este e-mail já está registrado.");
    } else if (error.code === 'auth/weak-password') {
      setError("A senha deve ter pelo menos 6 caracteres.");
    } else if (error.code === 'auth/invalid-email') {
      setError("O e-mail fornecido é inválido.");
    } else {
      setError("Ocorreu um erro ao criar a conta. Tente novamente.");
    }
  }
};
