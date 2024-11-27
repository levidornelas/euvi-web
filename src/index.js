import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Map from "./pages/map";
import RootLayout from "./Layout";
import './index.css'; 
import Details from "./pages/media_detalhes";
import MuseumUI from "./pages/test";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <RootLayout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/teste" element={<MuseumUI />}/>
      </Routes>
    </RootLayout>
  </BrowserRouter>
);
