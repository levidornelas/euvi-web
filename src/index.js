import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./Layout";
import './index.css'; 
import Home from "./pages/home";
import Map from "./pages/map";
import Details from "./pages/media_detalhes";
import LoginScreen from "./pages/login";

const root = document.getElementById("root");

// Criando a navegação com Reac-Router:
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <RootLayout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </RootLayout>
  </BrowserRouter>
);
