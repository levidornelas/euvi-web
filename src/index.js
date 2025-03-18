import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Changed to react-router-dom
import RootLayout from "./Layout.jsx";
import './index.css';
import HomePage from "./home.jsx";
import Map from "./pages/map/map.jsx";
import Details from "./pages/map/media_detalhes.jsx";
import LoginScreen from "./pages/users/login.jsx";
import Cadastro from "./pages/users/cadastro.jsx";
import UserProfile from "./pages/profile/profile.jsx";
import FirstOnboard from "./pages/onboarding/onboarding1.jsx";
import SecondOnboard from "./pages/onboarding/onboarding2.jsx";
import ThirdOnboard from "./pages/onboarding/onboarding3.jsx";
import Info from "./pages/profile/profile_info.jsx";
import AboutUs from "./pages/about/about.jsx";
import { Analytics } from "@vercel/analytics/react";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <RootLayout>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/o1" element={<FirstOnboard />} />
        <Route path="/o2" element={<SecondOnboard />} />
        <Route path="/o3" element={<ThirdOnboard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Analytics /> 
    </RootLayout>
  </BrowserRouter>
);
