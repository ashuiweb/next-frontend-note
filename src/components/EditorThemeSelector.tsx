"use client";
import React, { useState, useEffect } from "react";
import { editorThemes, EditorThemeKey } from "./editorThemes";

interface EditorThemeSelectorProps {
    onThemeChange: (theme: EditorThemeKey) => void;
}

const EditorThemeSelector: React.FC<EditorThemeSelectorProps> = ({ onThemeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState<EditorThemeKey>("vs-dark");

    useEffect(() => {
        // 从 localStorage 读取主题设置
        const savedTheme = localStorage.getItem("editor-theme") as EditorThemeKey | null;
        if (savedTheme && editorThemes[savedTheme]) {
            setSelectedTheme(savedTheme);
            onThemeChange(savedTheme);
        }
    }, [onThemeChange]);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value as EditorThemeKey;
        setSelectedTheme(theme);
        onThemeChange(theme);
        // 保存到 localStorage
        localStorage.setItem("editor-theme", theme);
    };

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="editor-theme-select" className="text-sm font-medium">
                编辑器主题:
            </label>
            <select
                id="editor-theme-select"
                value={selectedTheme}
                onChange={handleThemeChange}
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.entries(editorThemes).map(([key, name]) => (
                    <option key={key} value={key}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EditorThemeSelector;