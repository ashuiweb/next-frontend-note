"use client";
import ResizablePanels from "@/components/ResizablePanels";
import React, { useState } from "react";

const OptimizedResizableDemo: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [leftWidth, setLeftWidth] = useState(40);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // 优化的左侧面板内容 - 减少不必要的重渲染
    const leftPanelContent = React.useMemo(
        () => (
            <div className={`p-4 h-full ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>左侧面板 ({Math.round(leftWidth)}%)</h2>
                <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>这是优化后的左侧面板，拖动更流畅。</p>
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
                            项目 {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [darkMode, leftWidth]
    );

    // 优化的右侧面板内容
    const rightPanelContent = React.useMemo(
        () => (
            <div className={`p-4 h-full ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>右侧面板 ({Math.round(100 - leftWidth)}%)</h2>
                <div className="grid grid-cols-1 gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`p-3 rounded ${darkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
                            卡片内容 {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [darkMode, leftWidth]
    );

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            <header className={`p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">优化版可拖动布局</h1>
                    <button
                        onClick={toggleDarkMode}
                        className={`px-4 py-2 rounded transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                    >
                        {darkMode ? "亮色模式" : "暗色模式"}
                    </button>
                </div>
            </header>

            <main className="flex-grow">
                <ResizablePanels
                    leftPanel={leftPanelContent}
                    rightPanel={rightPanelContent}
                    defaultLeftWidth={leftWidth}
                    minLeftWidth={20}
                    maxLeftWidth={80}
                    darkMode={darkMode}
                    onWidthChange={setLeftWidth}
                    className="h-[calc(100vh-64px)]"
                />
            </main>
        </div>
    );
};

export default OptimizedResizableDemo;
