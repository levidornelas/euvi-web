import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./Layout";
import './index.css';
import Home from "./pages/home";
import Map from "./pages/map/map";
import Details from "./pages/map/media_detalhes";
import LoginScreen from "./pages/users/login";
import Cadastro from "./pages/users/cadastro";
import UserProfile from "./pages/profile/profile";
import FirstOnboard from "./pages/onboarding/onboarding1";
import SecondOnboard from "./pages/onboarding/onboarding2";
import ThirdOnboard from "./pages/onboarding/onboarding3";
import Info from "./pages/profile/profileinfo";

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
