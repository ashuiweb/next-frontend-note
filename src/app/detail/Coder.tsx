"use client";
import { setGlobalData } from "@/store/globalStore";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import EditorThemeSelector from "@/components/EditorThemeSelector";
import { EditorThemeKey } from "@/components/editorThemes";

export default function Coder(props: { value?: string; defaultValue?: string; onChange?: (text: string) => void; height?: string; width?: string }) {
    const [code, setCode] = useState(props.value || props.defaultValue || "");
    const [editorTheme, setEditorTheme] = useState<EditorThemeKey>("vs-dark");

    useEffect(() => {
        setGlobalData({
            detailCode: code,
        });
    }, [code]);

    useEffect(() => {
        // 从 localStorage 读取编辑器主题设置
        const savedTheme = localStorage.getItem("editor-theme") as EditorThemeKey | null;
        const builtInThemes = ["vs", "vs-dark", "hc-black", "hc-light"];
        if (savedTheme && builtInThemes.includes(savedTheme)) {
            setEditorTheme(savedTheme);
        }
    }, []);

    const handleEditorDidMount = async (editor: any, monaco: any) => {
        // 设置 TypeScript 编译选项
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.React,
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            allowJs: true,
        });
    };

    const handleThemeChange = (theme: EditorThemeKey) => {
        setEditorTheme(theme);
        // 保存到 localStorage
        localStorage.setItem("editor-theme", theme);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-2 bg-gray-100 border-b">
                <EditorThemeSelector onThemeChange={handleThemeChange} />
            </div>
            <div className="flex-grow">
                <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    defaultValue={code ? code : ""}
                    onChange={(value) => setCode(value || "")}
                    theme={editorTheme}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 14,
                        fontWeight: "bold",
                        wordWrap: "on",
                        formatOnPaste: true,
                        formatOnType: true,
                    }}
                />
            </div>
        </div>
    );
}
