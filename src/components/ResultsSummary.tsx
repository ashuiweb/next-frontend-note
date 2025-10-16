"use client";
import React from "react";

interface ResultsSummaryProps {
  darkMode: boolean;
  filteredEffectsCount: number;
  filters: {
    category: string;
    tags: string[];
    difficulty: string; // 保持原来的结构，因为我们在这里构造了一个兼容的对象
  };
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  darkMode,
  filteredEffectsCount,
  filters,
}) => {
  return (
    <div
      className={`mb-6 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
    >
      <p className="text-lg">
        找到 <span className="font-bold text-blue-500">{filteredEffectsCount}</span> 个特效
        {filters.category !== "all" && (
          <span>
            ，分类: <span className="font-medium">{filters.category}</span>
          </span>
        )}
        {filters.tags.length > 0 && (
          <span>
            ，标签: <span className="font-medium">{filters.tags.join(", ")}</span>
          </span>
        )}
        {filters.difficulty !== "all" && (
          <span>
            ，难度:{" "}
            <span className="font-medium">
              {filters.difficulty === "beginner"
                ? "初级"
                : filters.difficulty === "intermediate"
                ? "中级"
                : "高级"}
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

export default ResultsSummary;