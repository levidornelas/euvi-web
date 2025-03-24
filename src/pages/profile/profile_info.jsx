import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { authentication, db } from '../../firebasefunctions/firebase_config'; // Adapte o caminho para onde você configurou o Firebase

export default function Info() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserProfile(userDocSnap.data());
          } else {
            setError('No profile found in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Error loading the profile.');
        }
        setLoading(false);
      } else {
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-200 rounded-full mb-4"></div>
      <p className="text-white text-lg">Carregando perfil...</p>
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <button
            onClick={() => navigate('/perfil')}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5l-7 7 7 7"
              />
            </svg>
            Voltar ao Perfil
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Informações da conta
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Nome</label>
            <input
              type="text"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-500"
              value={userProfile.firstName || ''}
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Sobrenome</label>
            <input
              type="text"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-500"
              value={userProfile.lastName || ''}
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">E-mail</label>
            <input
              type="email"
              className="w-full p-3 mb-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-500"
              value={userProfile.email || ''}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
