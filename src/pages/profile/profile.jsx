import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { authentication, db } from '../../firebasefunctions/firebase_config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Eye } from 'lucide-react';
import BottomNavbar from '../../components/navBar';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      navigate('/map');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigateToMap = () => {
    navigate('/map');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="animate-bounce w-16 h-16 border-4 border-t-4 border-blue-200 rounded-full mb-4"></div>
        <p className="text-white text-lg">Carregando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-500">Nenhum usuário ativo</div>
      </div>
    );
  }

  // Extract the first letter of the first and last name
  const initials = `${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(0)}`;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-black mb-4">Perfil</h2>
        <div className="bg-blue-500 text-white font-bold rounded-full w-32 h-32 flex items-center justify-center mb-2 opacity-80 text-2xl">
          {initials}
        </div>
        <p className="text-gray-900 font-medium">{userProfile.firstName} {userProfile.lastName}</p>

        <div className="mt-4 w-full space-y-4">
          {/* Account Information */}
          <div>
            <div className="flex items-center mb-2 cursor-pointer"
              onClick={() => navigate('/info')}
            >
              <User className="mr-2 text-black" />
              <span className="text-black">Informações da conta</span>
            </div>
            <div className="border-b border-gray-300"></div>
          </div>

          {/* About Project */}
          <div>
            <div className="flex items-center mb-2 cursor-pointer">
              <Eye className="mr-2 text-black" />
              <span className="text-black">Sobre o projeto</span>
            </div>
            <div className="border-b border-gray-300"></div>
          </div>

          {/* Logout */}
          <div
            className="cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex items-center mb-2">
              <LogOut className="mr-2 text-gray-500" />
              <span className="text-gray-600">Sair</span>
            </div>
            <div className="border-b border-gray-300"></div>
          </div>

          <div className="flex justify-between w-full mt-4">
            <button
              onClick={handleNavigateToMap}
              className="bg-[#145CCC] hover:bg-blue-600 text-white font-bold py-4 px-4 flex-1 mr-2 flex items-center justify-center rounded-full"
            >
              Ir para o Mapa
            </button>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>

  );
}
