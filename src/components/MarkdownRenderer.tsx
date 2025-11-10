"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { ThemeKey, themes } from "./themes";
import ThemeSelector from "./ThemeSelector";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeKey>("oneDark");

    useEffect(() => {
        // 从 localStorage 读取主题设置
        const savedTheme = localStorage.getItem("code-theme") as ThemeKey | null;
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    const handleThemeChange = (theme: ThemeKey) => {
        setCurrentTheme(theme);
    };

    return (
        <div className="prose max-w-none p-4 prose-table:table-auto prose-th:text-left prose-th:font-bold">
            <div className="mb-4">
                <ThemeSelector onThemeChange={handleThemeChange} />
            </div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                remarkRehypeOptions={{ allowDangerousHtml: true }}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter style={themes[currentTheme].style} language={match[1]} PreTag="div" className="rounded-md my-2" {...props}>
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                            </code>
                        );
                    },
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
                    th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-bold" {...props} />,
                    td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                    tr: ({ node, ...props }) => <tr className="even:bg-gray-50 hover:bg-gray-100" {...props} />,
                    br: ({ node, ...props }) => <br {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
