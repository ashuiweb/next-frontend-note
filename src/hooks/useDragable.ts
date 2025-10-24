import { RefObject, useEffect, useRef, useState, useCallback } from "react";

interface DragPosition {
    x: number; // 横向位置（像素）
    y: number; // 纵向位置（像素）
    px: number; // 横向位置（0-1 比例）
    py: number; // 纵向位置（0-1 比例）
}

interface DragOptions {
    dragX?: boolean;
    dragY?: boolean;
    minX?: number | string;
    maxX?: number | string;
    minY?: number | string;
    maxY?: number | string;
    updateCB?: (position: DragPosition) => void;
}

type SelectorOrRef = string | RefObject<HTMLElement> | HTMLElement;

export function useDragable(target: SelectorOrRef, options: DragOptions = {}) {
    const { dragX = true, dragY = true, minX = 0, maxX = "100%", minY = 0, maxY = "100%" } = options;

    // 使用 useCallback 包装 updateCB 以确保它不会导致不必要的重新渲染
    const updateCBRef = useRef(options.updateCB);
    useEffect(() => {
        updateCBRef.current = options.updateCB;
    }, [options.updateCB]);

    // 使用 useState 存储位置信息，以便组件可以响应更新
    const [position, setPosition] = useState<DragPosition>({
        x: 0,
        y: 0,
        px: 0,
        py: 0,
    });

    // 使用 ref 存储拖拽状态和临时数据
    const isDraggingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const elementStartPosRef = useRef({ x: 0, y: 0 });
    const containerInfoRef = useRef({
        width: 0,
        height: 0,
        minXValue: 0,
        maxXValue: 0,
        minYValue: 0,
        maxYValue: 0,
    });

    // 解析百分比或数字
    const parseValue = useCallback((value: number | string, containerSize: number): number => {
        if (typeof value === "string" && value.endsWith("%")) {
            return (parseFloat(value) / 100) * containerSize;
        }
        return Number(value);
    }, []);

    // 获取目标元素
    const getElement = useCallback((): HTMLElement | null => {
        if (typeof target === "string") {
            return document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            return target;
        } else if ("current" in target) {
            return target.current;
        }
        return null;
    }, [target]);

    // 计算并更新位置
    const updatePosition = useCallback((x: number, y: number, containerInfo: typeof containerInfoRef.current) => {
        const { width, height } = containerInfo;

        // 计算比例值（0-1）
        const px = width > 0 ? Math.max(0, Math.min(1, x / width)) : 0;
        const py = height > 0 ? Math.max(0, Math.min(1, y / height)) : 0;

        const newPosition: DragPosition = { x, y, px, py };

        setPosition(newPosition);

        // 调用回调，只在拖拽时触发
        if (updateCBRef.current) {
            updateCBRef.current(newPosition);
        }

        return newPosition;
    }, []);

    useEffect(() => {
        const element = getElement();
        if (!element) {
            console.warn("useDrag: 未找到目标元素");
            return;
        }

        // 确保元素可定位
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === "static") {
            element.style.position = "relative";
        }

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();

            const parentElement = (element.offsetParent as HTMLElement) || document.body;
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // 记录起始鼠标位置
            startPosRef.current = { x: e.clientX, y: e.clientY };

            // 记录元素当前位置（相对于父元素）
            elementStartPosRef.current = {
                x: elementRect.left - parentRect.left,
                y: elementRect.top - parentRect.top,
            };

            // 计算并缓存容器信息和边界值
            const containerWidth = parentRect.width;
            const containerHeight = parentRect.height;
            const elementWidth = element.offsetWidth;
            const elementHeight = element.offsetHeight;

            containerInfoRef.current = {
                width: containerWidth,
                height: containerHeight,
                minXValue: parseValue(minX, containerWidth),
                maxXValue: parseValue(maxX, containerWidth) - elementWidth,
                minYValue: parseValue(minY, containerHeight),
                maxYValue: parseValue(maxY, containerHeight) - elementHeight,
            };

            isDraggingRef.current = true;

            // 添加拖拽时的视觉效果
            element.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;

            // 计算鼠标移动距离
            const deltaX = e.clientX - startPosRef.current.x;
            const deltaY = e.clientY - startPosRef.current.y;

            // 计算新位置
            let newX = elementStartPosRef.current.x;
            let newY = elementStartPosRef.current.y;

            const info = containerInfoRef.current;

            // 应用横向拖拽
            if (dragX) {
                newX = elementStartPosRef.current.x + deltaX;
                newX = Math.max(info.minXValue, Math.min(newX, info.maxXValue));
                element.style.left = `${newX}px`;
            }

            // 应用纵向拖拽
            if (dragY) {
                newY = elementStartPosRef.current.y + deltaY;
                newY = Math.max(info.minYValue, Math.min(newY, info.maxYValue));
                element.style.top = `${newY}px`;
            }

            // 更新位置状态
            updatePosition(newX, newY, info);
        };

        const handleMouseUp = () => {
            if (!isDraggingRef.current) return;

            isDraggingRef.current = false;

            // 恢复样式
            element.style.cursor = "grab";
            document.body.style.userSelect = "";
        };

        // 初始化位置
        const initPosition = () => {
            const parentElement = (element.offsetParent as HTMLElement) || document.body;
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            const initialX = elementRect.left - parentRect.left;
            const initialY = elementRect.top - parentRect.top;

            containerInfoRef.current = {
                width: parentRect.width,
                height: parentRect.height,
                minXValue: 0,
                maxXValue: parentRect.width,
                minYValue: 0,
                maxYValue: parentRect.height,
            };

            updatePosition(initialX, initialY, containerInfoRef.current);
        };

        // 设置初始样式
        element.style.cursor = "grab";

        // 初始化位置
        initPosition();

        // 绑定事件
        element.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // 清理函数
        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            element.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [target, dragX, dragY, minX, maxX, minY, maxY, getElement, parseValue, updatePosition]);

    return position;
}
