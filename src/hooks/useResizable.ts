import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface ResizeInfo {
    width: number; // 宽度（像素）
    height: number; // 高度（像素）
    pWidth: number; // 宽度比例（0-1）
    pHeight: number; // 高度比例（0-1）
}

interface ResizeOptions {
    minWidth?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
    resizeX?: boolean;
    resizeY?: boolean;
    updateCB?: (info: ResizeInfo & { parent: HTMLElement; target: HTMLElement }) => void;
    handler?: SelectorOrRef; // 操作手柄选择器
}

type SelectorOrRef = string | RefObject<HTMLElement> | HTMLElement;

export function useResizable(target: SelectorOrRef, options: ResizeOptions = {}) {
    const { 
        minWidth = 0, 
        maxWidth = "100%", 
        minHeight = 0, 
        maxHeight = "100%",
        resizeX = true,
        resizeY = true,
        handler 
    } = options;

    const parentRef = useRef<HTMLElement>();
    
    // 使用 useCallback 包装 updateCB 以确保它不会导致不必要的重新渲染
    const updateCBRef = useRef(options.updateCB);
    useEffect(() => {
        updateCBRef.current = options.updateCB;
    }, [options.updateCB]);

    // 使用 useState 存储尺寸信息
    const [size, setSize] = useState<ResizeInfo>({
        width: 0,
        height: 0,
        pWidth: 0,
        pHeight: 0,
    });

    // 使用 ref 存储拖拽状态和临时数据
    const isResizingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const elementStartSizeRef = useRef({ width: 0, height: 0 });
    const containerInfoRef = useRef({
        width: 0,
        height: 0,
        minWidthValue: 0,
        maxWidthValue: 0,
        minHeightValue: 0,
        maxHeightValue: 0,
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

    // 获取操作手柄元素
    const getHandlerElement = useCallback((): HTMLElement | null => {
        // 如果没有指定 handler，则使用 target 元素
        if (!handler) {
            return getElement();
        }

        // 如果 handler 是字符串选择器，则在 target 元素内查找
        if (typeof handler === "string") {
            const targetElement = getElement();
            if (targetElement) {
                return targetElement.querySelector(handler);
            }
            return null;
        }

        // 如果 handler 是 HTMLElement 或 RefObject
        if (handler instanceof HTMLElement) {
            return handler;
        } else if ("current" in handler) {
            return handler.current;
        }

        return null;
    }, [target, handler, getElement]);

    // 计算并更新尺寸
    const updateSize = useCallback((width: number, height: number, containerInfo: typeof containerInfoRef.current) => {
        const { width: containerWidth, height: containerHeight } = containerInfo;

        // 计算比例值（0-1）
        const pWidth = containerWidth > 0 ? Math.max(0, Math.min(1, width / containerWidth)) : 0;
        const pHeight = containerHeight > 0 ? Math.max(0, Math.min(1, height / containerHeight)) : 0;

        const newSize: ResizeInfo = { width, height, pWidth, pHeight };

        setSize(newSize);

        // 调用回调
        if (updateCBRef.current) {
            updateCBRef.current({ ...newSize, parent: parentRef.current!, target: getElement()! });
        }

        return newSize;
    }, []);

    useEffect(() => {
        const element = getElement();
        if (!element) {
            console.warn("useResizable: 未找到目标元素");
            return;
        }

        const handlerElement = getHandlerElement();
        if (!handlerElement) {
            console.warn("useResizable: 未找到操作手柄元素");
            return;
        }

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const parentElement = (element.offsetParent as HTMLElement) || document.body;
            parentRef.current = parentElement;
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // 记录起始鼠标位置
            startPosRef.current = { x: e.clientX, y: e.clientY };

            // 记录元素当前尺寸
            elementStartSizeRef.current = {
                width: elementRect.width,
                height: elementRect.height,
            };

            // 计算并缓存容器信息和边界值
            const containerWidth = parentRect.width;
            const containerHeight = parentRect.height;

            containerInfoRef.current = {
                width: containerWidth,
                height: containerHeight,
                minWidthValue: parseValue(minWidth, containerWidth),
                maxWidthValue: parseValue(maxWidth, containerWidth),
                minHeightValue: parseValue(minHeight, containerHeight),
                maxHeightValue: parseValue(maxHeight, containerHeight),
            };

            isResizingRef.current = true;

            // 添加拖拽时的视觉效果
            handlerElement.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizingRef.current) return;

            // 计算鼠标移动距离
            const deltaX = e.clientX - startPosRef.current.x;
            const deltaY = e.clientY - startPosRef.current.y;

            // 计算新尺寸
            let newWidth = elementStartSizeRef.current.width;
            let newHeight = elementStartSizeRef.current.height;

            const info = containerInfoRef.current;

            // 应用宽度调整
            if (resizeX) {
                newWidth = elementStartSizeRef.current.width + deltaX;
                newWidth = Math.max(info.minWidthValue, Math.min(newWidth, info.maxWidthValue));
                element.style.width = `${newWidth}px`;
            }

            // 应用高度调整
            if (resizeY) {
                newHeight = elementStartSizeRef.current.height + deltaY;
                newHeight = Math.max(info.minHeightValue, Math.min(newHeight, info.maxHeightValue));
                element.style.height = `${newHeight}px`;
            }

            // 更新尺寸状态
            updateSize(newWidth, newHeight, info);
        };

        const handleMouseUp = () => {
            if (!isResizingRef.current) return;

            isResizingRef.current = false;

            // 恢复样式
            handlerElement.style.cursor = "default";
            document.body.style.userSelect = "";
        };

        // 初始化尺寸
        const initSize = () => {
            const parentElement = (element.offsetParent as HTMLElement) || document.body;
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            containerInfoRef.current = {
                width: parentRect.width,
                height: parentRect.height,
                minWidthValue: 0,
                maxWidthValue: parentRect.width,
                minHeightValue: 0,
                maxHeightValue: parentRect.height,
            };

            updateSize(elementRect.width, elementRect.height, containerInfoRef.current);
        };

        // 初始化尺寸
        initSize();

        // 绑定事件
        handlerElement.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // 清理函数
        return () => {
            handlerElement.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            handlerElement.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [target, resizeX, resizeY, minWidth, maxWidth, minHeight, maxHeight, handler, getElement, getHandlerElement, parseValue, updateSize]);

    return { ...size, parent: parentRef.current, target: getElement() };
}