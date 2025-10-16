"use client";
import { useDebounceFn, useEventListener, useMemoizedFn } from "ahooks";
import React, { useEffect, useRef, useState } from "react";

interface MultiResizablePanelsProps {
    leftPanels: React.ReactNode[];
    rightPanel: React.ReactNode;
    defaultLeftWidth?: number;
    minLeftWidth?: number;
    maxLeftWidth?: number;
    className?: string;
    darkMode?: boolean;
    onWidthChange?: (width: number) => void;
    defaultPanelHeights?: number[]; // 每个面板的默认高度百分比
    storageKey?: string; // 用于 localStorage 的键名
}

const MultiResizablePanels: React.FC<MultiResizablePanelsProps> = ({
    leftPanels,
    rightPanel,
    defaultLeftWidth = 50,
    minLeftWidth = 20,
    maxLeftWidth = 80,
    className = "",
    darkMode = false,
    onWidthChange,
    defaultPanelHeights = [],
    storageKey = "multi-resizable-panels",
}) => {
    const [leftWidth, setLeftWidth] = useState<number>(defaultLeftWidth);
    const [panelHeights, setPanelHeights] = useState<number[]>(() => {
        // 如果提供了默认高度，则使用它们，否则平均分配
        if (defaultPanelHeights.length > 0 && defaultPanelHeights.length === leftPanels.length) {
            return defaultPanelHeights;
        }

        // 平均分配高度
        return new Array(leftPanels.length).fill(0).map(() => 100 / leftPanels.length);
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const verticalDividerRef = useRef<HTMLDivElement>(null);
    const horizontalDividerRefs = useRef<HTMLDivElement[]>([]);
    const isDraggingRef = useRef(false);
    const dragTypeRef = useRef<"horizontal" | "vertical" | null>(null);
    const dragIndexRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number>();

    // 从 localStorage 获取保存的面板尺寸
    const getSavedDimensions = () => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.warn("Failed to parse saved dimensions", e);
                }
            }
        }
        return null;
    };

    // 保存面板尺寸到 localStorage
    const saveDimensions = useMemoizedFn(() => {
        const dimensions = {
            leftWidth,
            panelHeights,
        };
        localStorage.setItem(storageKey, JSON.stringify(dimensions));
    });

    const { run: debouncedWidthChange } = useDebounceFn(
        (width: number) => {
            onWidthChange?.(width);
            saveDimensions();
        },
        { wait: 100 }
    );

    // 处理水平拖动（左右面板之间的拖动）
    const handleHorizontalDragStart = useMemoizedFn((e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;
        dragTypeRef.current = "horizontal";
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    });

    // 处理垂直拖动（左侧面板内部的拖动）
    const handleVerticalDragStart = useMemoizedFn((e: React.MouseEvent, index: number) => {
        e.preventDefault();
        isDraggingRef.current = true;
        dragTypeRef.current = "vertical";
        dragIndexRef.current = index;
        document.body.style.cursor = "row-resize";
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

            if (dragTypeRef.current === "horizontal") {
                // 处理左右面板的宽度调整
                const containerWidth = containerRect.width;
                const mouseX = e.clientX - containerRect.left;

                let newLeftWidth = (mouseX / containerWidth) * 100;
                newLeftWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));

                setLeftWidth(newLeftWidth);
                debouncedWidthChange(newLeftWidth);
            } else if (dragTypeRef.current === "vertical" && leftPanels.length > 1 && dragIndexRef.current !== null) {
                // 处理左侧面板内部的高度调整
                const containerHeight = containerRect.height;
                const mouseY = e.clientY - containerRect.top;

                // 计算新的面板高度比例
                const newPanelHeights = [...panelHeights];

                // 计算拖动位置相对于容器的百分比
                const dragPositionPercent = (mouseY / containerHeight) * 100;

                // 找到前几个面板的累积高度
                let cumulativeHeight = 0;
                for (let i = 0; i <= dragIndexRef.current!; i++) {
                    if (i < dragIndexRef.current!) {
                        cumulativeHeight += newPanelHeights[i];
                    }
                }

                // 计算当前拖动面板的新高度
                const newHeight = dragPositionPercent - cumulativeHeight;
                const nextPanelHeight = newPanelHeights[dragIndexRef.current!] + newPanelHeights[dragIndexRef.current! + 1] - newHeight;

                // 确保高度在合理范围内
                if (newHeight > 5 && nextPanelHeight > 5) {
                    newPanelHeights[dragIndexRef.current!] = newHeight;
                    newPanelHeights[dragIndexRef.current! + 1] = nextPanelHeight;
                    setPanelHeights(newPanelHeights);
                }
            }
        });
    });

    // 处理拖动结束
    const handleDragEnd = useMemoizedFn(() => {
        isDraggingRef.current = false;
        dragTypeRef.current = null;
        dragIndexRef.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        // 保存最终的面板尺寸
        saveDimensions();

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    });

    // 事件监听
    useEventListener("mousemove", handleDrag);
    useEventListener("mouseup", handleDragEnd);
    useEventListener("mouseleave", handleDragEnd);

    // 在组件挂载时恢复保存的尺寸
    useEffect(() => {
        const savedDimensions = getSavedDimensions();
        if (savedDimensions) {
            if (savedDimensions.leftWidth !== undefined) {
                setLeftWidth(savedDimensions.leftWidth);
            }
            if (savedDimensions.panelHeights && savedDimensions.panelHeights.length === leftPanels.length) {
                setPanelHeights(savedDimensions.panelHeights);
            }
        }
    }, [leftPanels.length]);

    useEffect(() => {
        // 初始化 horizontalDividerRefs 数组
        horizontalDividerRefs.current = horizontalDividerRefs.current.slice(0, Math.max(leftPanels.length - 1, 0));
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [leftPanels.length]);

    const rightWidth = 100 - leftWidth;

    return (
        <div
            ref={containerRef}
            className={`flex w-full h-screen   overflow-hidden relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} ${className}`}
            style={
                {
                    "--left-width": `${leftWidth}%`,
                    "--right-width": `${rightWidth}%`,
                } as React.CSSProperties
            }
        >
            {/* 左侧面板容器 */}
            <div className="flex flex-col transition-all duration-150 ease-out will-change-transform h-screen overflow-y-scroll" style={{ width: "var(--left-width)" }}>
                {leftPanels.map((panel, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="overflow-auto transition-all duration-150 ease-out will-change-transform"
                            style={{
                                height: `${panelHeights[index]}%`,
                            }}
                        >
                            {panel}
                        </div>

                        {/* 垂直分隔条（除了最后一个面板） */}
                        {index < leftPanels.length - 1 && (
                            <div
                                ref={(el) => {
                                    if (el) {
                                        horizontalDividerRefs.current[index] = el;
                                    }
                                }}
                                className={`h-2 cursor-row-resize flex-shrink-0 ${
                                    darkMode ? "hover:bg-blue-600 active:bg-blue-700 bg-gray-600" : "hover:bg-blue-400 active:bg-blue-500 bg-gray-300"
                                }`}
                                onMouseDown={(e) => handleVerticalDragStart(e, index)}
                            >
                                <div className="w-full h-full flex justify-center items-center">
                                    <div className="w-8 h-0.5 rounded-full bg-gray-400"></div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* 水平分隔条 */}
            <div
                ref={verticalDividerRef}
                className={`absolute top-0 bottom-0 cursor-col-resize z-10 ${darkMode ? "hover:bg-blue-600 active:bg-blue-700" : "hover:bg-blue-400 active:bg-blue-500"}`}
                style={{
                    left: "var(--left-width)",
                    width: "4px",
                    marginLeft: "-2px",
                    backgroundColor: darkMode ? "rgba(110, 160, 241, 0.3)" : "rgba(99, 103, 107, 0.065)",
                }}
                onMouseDown={handleHorizontalDragStart}
            />

            {/* 右侧面板 */}
            <div className="overflow-auto h-screen overflow-y-scroll transition-all duration-150 ease-out will-change-transform" style={{ width: "var(--right-width)" }}>
                {rightPanel}
            </div>
        </div>
    );
};

export default MultiResizablePanels;
