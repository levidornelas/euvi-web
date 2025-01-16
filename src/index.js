import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Changed to react-router-dom
import RootLayout from "./Layout.jsx";
import './index.css';
import Home from "./pages/home.jsx";
import Map from "./pages/map/map.jsx";
import Details from "./pages/map/media_detalhes.jsx";
import LoginScreen from "./pages/users/login.jsx";
import Cadastro from "./pages/users/cadastro.jsx";
import UserProfile from "./pages/profile/profile.jsx";
import FirstOnboard from "./pages/onboarding/onboarding1.jsx";
import SecondOnboard from "./pages/onboarding/onboarding2.jsx";
import ThirdOnboard from "./pages/onboarding/onboarding3.jsx";
import Info from "./pages/profile/profileinfo.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <RootLayout>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/o1" element={<FirstOnboard />} />
        <Route path="/o2" element={<SecondOnboard />} />
        <Route path="/o3" element={<ThirdOnboard />} />
      </Routes>
    </RootLayout>
  </BrowserRouter>
);
