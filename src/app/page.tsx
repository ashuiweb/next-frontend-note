"use client";
import ContributionChart from "@/components/ContributionChart";
import EffectCard from "@/components/EffectCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoResults from "@/components/NoResults";
import Pagination from "@/components/Pagination";
import ResultsSummary from "@/components/ResultsSummary";
import SidebarFilter from "@/components/SidebarFilter";
import { calculateAspectRatio } from "@/util";
import { useSize } from "ahooks";
import React, { useEffect, useState } from "react";

// 定义分类类型

// 定义特效项目类型
interface EffectItem {
    id: number;
    title: string;
    path: string;
    description: string;
    categoryId: number;
    category: string;
    tags: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
    previewUrl: string;
    author: string;
    likes: number;
    createTime: string;
}

// 定义筛选状态类型
interface FilterState {
    category: string;
    tags: string[];
    difficulties: string[]; // 修改为数组以支持多选
    searchQuery: string;
}

const HomePage: React.FC = () => {
    // 特效数据
    const [effects, setEffects] = useState<EffectItem[]>([]);

    // 加载状态
    const [loading, setLoading] = useState(true);

    // 错误状态
    const [error, setError] = useState<string | null>(null);

    // 筛选状态
    const [filters, setFilters] = useState<FilterState>({
        category: "all",
        tags: [],
        difficulties: [], // 修改为数组
        searchQuery: "",
    });

    // 筛选后的特效
    const [filteredEffects, setFilteredEffects] = useState<EffectItem[]>([]);

    const [ratio, setRatio] = useState<string>("16/9");
    const size = useSize(document?.querySelector?.("body"));
    // 暗黑模式状态
    const [darkMode, setDarkMode] = useState(false);

    // 分页状态
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // 每页6个特效
    useEffect(() => {
        if (!size) return;

        setRatio(calculateAspectRatio(window.innerWidth, window.innerHeight));
    }, [size]);

    // 获取特效数据
    useEffect(() => {
        const fetchEffects = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/effects?_embed=category");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setEffects(data);
                setFilteredEffects(data);
            } catch (err) {
                console.error("获取特效数据失败:", err);
                setError("获取数据失败，请稍后重试");
            } finally {
                setLoading(false);
            }
        };

        fetchEffects();
    }, []);

    // 应用筛选
    useEffect(() => {
        let result = [...effects];

        // 按分类筛选
        if (filters.category !== "all") {
            result = result.filter((effect) => effect.category === filters.category);
        }

        // 按标签筛选
        if (filters.tags.length > 0) {
            result = result.filter((effect) => filters.tags.some((tag) => effect.tags.includes(tag)));
        }

        // 按难度筛选
        if (filters.difficulties.length > 0) {
            result = result.filter((effect) => filters.difficulties.includes(effect.difficulty));
        }

        // 按搜索词筛选
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(
                (effect) =>
                    effect.title.toLowerCase().includes(query) || effect.description.toLowerCase().includes(query) || effect.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        setFilteredEffects(result);
    }, [filters, effects]);

    // 处理分类筛选
    const handleCategoryChange = (category: string) => {
        setFilters((prev) => ({ ...prev, category }));
        setCurrentPage(0); // 重置到第一页
    };

    // 处理标签筛选
    const handleTagToggle = (tag: string) => {
        setFilters((prev) => {
            const newTags = prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag];
            return { ...prev, tags: newTags };
        });
        setCurrentPage(0); // 重置到第一页
    };

    // 处理难度筛选
    const handleDifficultyToggle = (difficulty: string) => {
        setFilters((prev) => {
            const newDifficulties = prev.difficulties.includes(difficulty) ? prev.difficulties.filter((d) => d !== difficulty) : [...prev.difficulties, difficulty];
            return { ...prev, difficulties: newDifficulties };
        });
        setCurrentPage(0); // 重置到第一页
    };

    // 处理搜索
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
        setCurrentPage(0); // 重置到第一页
    };

    // 清除所有筛选
    const clearFilters = () => {
        setFilters({
            category: "all",
            tags: [],
            difficulties: [],
            searchQuery: "",
        });
        setCurrentPage(0); // 重置到第一页
    };

    // 切换暗黑模式
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} searchQuery={filters.searchQuery} handleSearchChange={handleSearchChange} />

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <SidebarFilter
                        darkMode={darkMode}
                        filters={filters}
                        handleCategoryChange={handleCategoryChange}
                        handleTagToggle={handleTagToggle}
                        handleDifficultyToggle={handleDifficultyToggle}
                        clearFilters={clearFilters}
                    />

                    {/* 主要内容区域 */}
                    <div className="flex-1">
                        {loading ? (
                            <div className={`flex justify-center items-center h-32 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-sm`}>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800 text-red-400" : "bg-red-50 text-red-700"} shadow-sm`}>
                                <p>{error}</p>
                                <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                    重新加载
                                </button>
                            </div>
                        ) : (
                            <>
                                <ResultsSummary
                                    darkMode={darkMode}
                                    filteredEffectsCount={filteredEffects.length}
                                    filters={{ ...filters, difficulty: filters.difficulties.length > 0 ? filters.difficulties.join(", ") : "all" }}
                                />

                                {/* 特效卡片网格 */}
                                {filteredEffects.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                                            {filteredEffects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((effect) => (
                                                <EffectCard ratio={ratio} key={effect.id} effect={effect} darkMode={darkMode} />
                                            ))}
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalCount={filteredEffects.length}
                                            itemsPerPage={itemsPerPage}
                                            onPageChange={setCurrentPage}
                                            darkMode={darkMode}
                                        />
                                    </>
                                ) : (
                                    <NoResults darkMode={darkMode} clearFilters={clearFilters} />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <div className="container mx-auto px-4 py-8">
                <ContributionChart darkMode={darkMode} effects={effects} />
            </div>

            <Footer darkMode={darkMode} />
        </div>
    );
};

export default HomePage;
