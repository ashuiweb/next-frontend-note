"use client";
import { useDebounceFn, useEventListener, useMemoizedFn } from "ahooks";
import React, { useEffect, useRef, useState } from "react";

interface ResizablePanelsProps {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    defaultLeftWidth?: number;
    minLeftWidth?: number;
    maxLeftWidth?: number;
    className?: string;
    darkMode?: boolean;
    onWidthChange?: (width: number) => void;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
    leftPanel,
    rightPanel,
    defaultLeftWidth = 50,
    minLeftWidth = 20,
    maxLeftWidth = 80,
    className = "",
    darkMode = false,
    onWidthChange,
}) => {
    const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
    const [isHovering, setIsHovering] = useState(false);
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const animationFrameRef = useRef<number>();

    const { run: debouncedWidthChange } = useDebounceFn(
        (width: number) => {
            onWidthChange?.(width);
        },
        { wait: 100 }
    );

    // 处理鼠标在分隔条上的移动
    const handleDividerMouseMove = useMemoizedFn((e: MouseEvent) => {
        if (!dividerRef.current) return;

        const dividerRect = dividerRef.current.getBoundingClientRect();
        const mouseY = e.clientY - dividerRect.top;
        const dividerHeight = dividerRect.height;

        // 计算指示器位置（相对于分隔条的高度百分比）
        const position = Math.max(0, Math.min(100, (mouseY / dividerHeight) * 100));
        setIndicatorPosition(position);
    });

    // 处理鼠标进入分隔条
    const handleDividerMouseEnter = useMemoizedFn(() => {
        setIsHovering(true);
    });

    // 处理鼠标离开分隔条
    const handleDividerMouseLeave = useMemoizedFn(() => {
        setIsHovering(false);
    });

    // 处理拖动开始
    const handleDragStart = useMemoizedFn((e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    });

    // 处理拖动过程
    const handleDrag = useMemoizedFn((e: MouseEvent) => {
        if (!isDraggingRef.current || !containerRef.current) return;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const containerRect = containerRef.current!.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const mouseX = e.clientX - containerRect.left;

            let newLeftWidth = (mouseX / containerWidth) * 100;
            newLeftWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));

            setLeftWidth(newLeftWidth);
            debouncedWidthChange(newLeftWidth);
        });
    });

    // 处理拖动结束
    const handleDragEnd = useMemoizedFn(() => {
        isDraggingRef.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    });

    // 事件监听
    useEventListener("mousemove", handleDrag);
    useEventListener("mouseup", handleDragEnd);
    useEventListener("mouseleave", handleDragEnd);

    // 监听分隔条上的鼠标移动
    useEventListener("mousemove", handleDividerMouseMove, { target: dividerRef });

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const rightWidth = 100 - leftWidth;

    return (
        <div
            ref={containerRef}
            className={`flex w-full min-h-screen h-full overflow-hidden relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} ${className}`}
            style={
                {
                    "--left-width": `${leftWidth}%`,
                    "--right-width": `${rightWidth}%`,
                } as React.CSSProperties
            }
        >
            {/* 左侧面板 */}
            <div className="overflow-auto transition-all duration-150 ease-out will-change-transform" style={{ width: "var(--left-width)" }}>
                {leftPanel}
            </div>

            {/* 分隔条 */}
            <div
                ref={dividerRef}
                className={`absolute top-0 bottom-0 cursor-col-resize z-10 ${darkMode ? "hover:bg-blue-600 active:bg-blue-700" : "hover:bg-blue-400 active:bg-blue-500"}`}
                style={{
                    left: "var(--left-width)",
                    width: "4px",
                    marginLeft: "-2px",
                    backgroundColor: darkMode ? "rgba(110, 160, 241, 0.3)" : "rgba(99, 103, 107, 0.065)",
                }}
                onMouseDown={handleDragStart}
                onMouseEnter={handleDividerMouseEnter}
                onMouseLeave={handleDividerMouseLeave}
            >
                {/* 视觉指示器 - 只在hover时显示 */}
                {isHovering && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
                        style={{
                            top: `${indicatorPosition}%`,
                            opacity: isHovering ? 1 : 0,
                        }}
                    >
                        <div className={`w-1 h-8 flex flex-col justify-center items-center gap-1 ${darkMode ? "bg-gray-500" : "bg-gray-400"}`}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className={`w-0.5 h-1 rounded-full ${darkMode ? "bg-gray-300" : "bg-gray-600"}`} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 右侧面板 */}
            <div className="overflow-auto transition-all duration-150 ease-out will-change-transform" style={{ width: "var(--right-width)" }}>
                {rightPanel}
            </div>
        </div>
    );
};
export default ResizablePanels;
