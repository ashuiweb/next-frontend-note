"use client";
import React from "react";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`py-6 mt-12 ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
    >
      <div className="container mx-auto px-4 text-center">
        <p>前端特效展示集 &copy; {new Date().getFullYear()} - 探索前端动画与交互的无限可能</p>
      </div>
    </footer>
  );
};

export default Footer;