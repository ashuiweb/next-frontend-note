"use client";
import { useSize } from "ahooks";
import React, { useEffect, useRef } from "react";

export default function Scale({ ratio, children }: { ratio: string; children: React.ReactNode }) {
    const [scale, setScale] = React.useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const size = useSize(containerRef);

    // 当容器尺寸或比例变化时更新缩放
    useEffect(() => {
        if (!size) return;

        // 计算缩放比例
        let newScale = size.width / window.innerWidth;

        setScale(newScale);
    }, [size]);

    return (
        <div
            ref={containerRef}
            className="h-full w-full overflow-hidden"
            style={{
                aspectRatio: ratio,
            }}
        >
            <div
                className="h-screen w-screen  origin-top-left"
                style={{
                    transform: `scale(${scale})`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
