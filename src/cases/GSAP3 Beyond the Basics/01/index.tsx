"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.to("#movingBox", {
                duration: 3,
                ease: "none",
                yoyo: true,
                repeat: -1,
                motionPath: {
                    path: "#motionPath", // 绑定 SVG 中定义的路径
                    align: "#motionPath",
                    autoRotate: true,
                    offsetY: -10,
                },
            });
        },
        {
            scope: container,
        }
    );

    return (
        <div ref={container}>
            {/* 推荐配置：宽度100%自适应，高度固定400px，保持比例无变形*/}
            <svg
                width="100%"
                height="400"
                viewBox="0 0 1680 400" // 核心：定义原始宽高比（1000:400 = 5:2）
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet" // 保留比例，居中显示（删除 none）
            >
                {/* 原有图形内容（路径、方块等） */}
                <rect width="100%" height="400" fill="#f5f5f5" /> {/* 背景占满 viewBox */}
                <path
                    id="motionPath"
                    d="M100,200 C300,100 500,300 1600,200" // 路径适配 viewBox 宽度（100→900）
                    stroke="#3498db"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                />
                <circle cx="100" cy="200" r="5" fill="#e74c3c" />
                <text x="80" y="190" fontSize="12" fill="#333">
                    起点
                </text>
                <circle cx="1600" cy="200" r="5" fill="#2ecc71" />
                <text x="1600" y="190" fontSize="12" fill="#333">
                    终点
                </text>
                <rect id="movingBox" x="90" y="190" width="20" height="20" fill="#e74c3c" rx="2" />
            </svg>
        </div>
    );
}
