import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

export default function RootLayout({ children }) {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/bg-img.png)` }}
    >
      <div className="relative h-full sm:min-h-[95vh] w-[400px] bg-[#145CCC] shadow-xl overflow-auto">
        <div className="h-full w-full relative">{children}</div>
      </div>
    </div>
  );
}
