"use client";
import React, { useState, useEffect } from "react";
import { themes, ThemeKey } from "./themes";

interface ThemeSelectorProps {
    onThemeChange: (theme: ThemeKey) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("oneDark");

    useEffect(() => {
        // 从 localStorage 读取主题设置
        const savedTheme = localStorage.getItem("code-theme") as ThemeKey | null;
        if (savedTheme && themes[savedTheme]) {
            setSelectedTheme(savedTheme);
            onThemeChange(savedTheme);
        }
    }, [onThemeChange]);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value as ThemeKey;
        setSelectedTheme(theme);
        onThemeChange(theme);
        // 保存到 localStorage
        localStorage.setItem("code-theme", theme);
    };

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="theme-select" className="text-sm font-medium">
                代码主题:
            </label>
            <select
                id="theme-select"
                value={selectedTheme}
                onChange={handleThemeChange}
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.entries(themes).map(([key, theme]) => (
                    <option key={key} value={key}>
                        {theme.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeSelector;