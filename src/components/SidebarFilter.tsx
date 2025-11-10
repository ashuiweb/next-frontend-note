"use client";
import React, { useEffect, useState } from "react";

// 定义数据类型
interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Difficulty {
  id: number;
  name: string;
  value: string;
}

interface SidebarFilterProps {
  darkMode: boolean;
  filters: {
    category: string;
    tags: string[];
    difficulties: string[];
  };
  handleCategoryChange: (category: string) => void;
  handleTagToggle: (tag: string) => void;
  handleDifficultyToggle: (difficulty: string) => void;
  clearFilters: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  darkMode,
  filters,
  handleCategoryChange,
  handleTagToggle,
  handleDifficultyToggle,
  clearFilters,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取筛选数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 并行获取所有数据
        const [tagsRes, categoriesRes, difficultiesRes] = await Promise.all([
          fetch('/api/tags'),
          fetch('/api/categories'),
          fetch('/api/difficulties')
        ]);

        if (!tagsRes.ok || !categoriesRes.ok || !difficultiesRes.ok) {
          throw new Error('获取筛选数据失败');
        }

        const [tagsData, categoriesData, difficultiesData] = await Promise.all([
          tagsRes.json(),
          categoriesRes.json(),
          difficultiesRes.json()
        ]);

        setTags(tagsData);
        setCategories(categoriesData);
        setDifficulties(difficultiesData);
      } catch (err) {
        console.error('获取筛选数据失败:', err);
        setError('获取筛选数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <aside className={`w-full md:w-64 p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={`w-full md:w-64 p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className={`p-4 rounded ${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-900"}`}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`w-full md:w-64 p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">筛选器</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          清除筛选
        </button>
      </div>

      {/* 分类筛选 */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">分类</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`block w-full text-left px-3 py-2 rounded ${
              filters.category === "all"
                ? "bg-blue-100 text-blue-700"
                : darkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-100"
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`block w-full text-left px-3 py-2 rounded ${
                filters.category === category.name
                  ? "bg-blue-100 text-blue-700"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 难度筛选 */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">难度</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() => handleDifficultyToggle(difficulty.value)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.difficulties.includes(difficulty.value)
                  ? difficulty.value === "beginner"
                    ? "bg-green-500 text-white"
                    : difficulty.value === "intermediate"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {difficulty.name}
            </button>
          ))}
        </div>
      </div>

      {/* 标签筛选 */}
      <div>
        <h3 className="font-medium mb-3">标签</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag.name)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.tags.includes(tag.name)
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter;