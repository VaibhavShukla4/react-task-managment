// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md fixed w-[-webkit-fill-available]">
      <span className="text-[2vw] max-[991px]:text-[5vw] font-bold text-center mx-auto block">
        Task Management Dashboard
      </span>
    </header>
  );
};

export default Header;
