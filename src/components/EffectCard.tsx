"use client";

import useClient from "@/app/hooks/useClient";
import useFullScreenDrawer from "@/hooks/useFullScreenDrawer";
import { useAsyncEffect, useLongPress } from "ahooks";
import Image from "next/image";
import { lazy, Suspense, useRef, useState } from "react";
import Scale from "./Scale";

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
    thumb?: string;
    createTime: string;
}

interface EffectCardProps {
    ratio: string;
    effect: EffectItem;
    darkMode: boolean;
}

const EffectCard: React.FC<EffectCardProps> = ({ effect, darkMode, ratio }) => {
    // 异步加载组件
    const Detail = lazy(() => import(`../${effect.path}`));
    const [thumb, setThumb] = useState<string>();

    useAsyncEffect(async () => {
        try {
            const t = (await import(`../${effect.path}/image.png`)).default;
            setThumb(t);
        } catch (error) {}
    }, []);

    const { to } = useClient();
    const { drawer } = useFullScreenDrawer();

    const ref = useRef<HTMLDivElement>(null);

    useLongPress(() => {
        to(`/detail1?path=${effect.path}`);
    }, ref);
    return (
        <div key={effect.id} className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            {/* 预览图区域 */}
            <div
                ref={ref}
                className="overflow-hidden"
                style={{
                    aspectRatio: ratio,
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    drawer(<iframe src={`/detail1?path=${effect.path}`} className="border-none" width="100%" height="100%" />);
                }}
                onDoubleClick={() => to(`/detail?path=${effect.path}`)}
            >
                <Suspense fallback={<div>加载中...</div>}>
                    {thumb ? (
                        <Image src={thumb} alt="" className="w-full  " />
                    ) : (
                        <Scale ratio={ratio}>
                            <Detail />
                        </Scale>
                    )}
                </Suspense>
            </div>
            {/* 内容区域 */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{effect.title}</h3>
                </div>

                <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{effect.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {effect.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="  justify-between items-center text-sm">
                    <div className="flex items-center justify-between space-x-2">
                        <span className={darkMode ? "text-gray-400" : "text-gray-500"}>分类: {effect.category}</span>
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${
                                effect.difficulty === "beginner"
                                    ? "bg-green-100 text-green-800"
                                    : effect.difficulty === "intermediate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {effect.difficulty === "beginner" ? "初级" : effect.difficulty === "intermediate" ? "中级" : "高级"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{effect.createTime}</span>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{effect.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EffectCard;
