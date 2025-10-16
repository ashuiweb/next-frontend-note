"use client";
import React from "react";

interface NoResultsProps {
  darkMode: boolean;
  clearFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ darkMode, clearFilters }) => {
  return (
    <div
      className={`text-center py-16 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
    >
      <svg
        className="w-16 h-16 mx-auto text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-xl font-medium mb-2">没有找到匹配的特效</h3>
      <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        尝试调整筛选条件或搜索关键词
      </p>
      <button
        onClick={clearFilters}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        清除所有筛选
      </button>
    </div>
  );
};

export default NoResults;