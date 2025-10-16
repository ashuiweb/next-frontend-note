"use client";
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  searchQuery,
  handleSearchChange,
}) => {
  return (
    <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              前端特效展示集
            </h1>
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* 搜索框 */}
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="搜索特效..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* 暗黑模式切换 */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
              }`}
              aria-label={darkMode ? "切换到亮色模式" : "切换到暗黑模式"}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;