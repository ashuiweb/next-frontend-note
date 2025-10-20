"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
//@ts-ignore
import { transform } from "@babel/standalone";

import { useIframeSync } from "@/hooks/useIframeSync";
import { gsap, useGSAP } from "@/util/gsap";
import * as ahooks from "ahooks";
import { useDebounceFn, useKeyPress, useMemoizedFn } from "ahooks";
import dayjs from "dayjs";

const currentDependencies = {
    dayjs,
    ahooks,
    gsap,
    useEffect,
    useState,
    useRef,
    useMemo,
    useMemoizedFn,
    useGSAP,
};

function createSafeComponent(code: string, dependencies = currentDependencies) {
    const dependencyNames = Object.keys(dependencies);
    const dependencyValues = Object.values(dependencies);

    const getComponent = new Function(
        "React",
        ...dependencyNames,
        `
        try {
            ${code};
            if (typeof Main !== 'function') {
                throw new Error('未找到Main函数组件');
            }
            return Main;
        } catch(e) {
            console.error('代码执行错误:', e);
            return function ErrorDisplay() {
                return React.createElement('div', {
                    style: {
                        color: 'red',
                        padding: '20px',
                        border: '1px solid #ffcdd2',
                        backgroundColor: '#ffebee',
                        borderRadius: '4px'
                    }
                }, '执行错误: ' + e.message);
            };
        }
        `
    );

    return getComponent(React, ...dependencyValues);
}

export default function PreviewPage() {
    return <CMain />;
}

function CMain() {
    const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // 使用自定义 hook 替代直接从 zustand 获取状态
    const { detailCode } = useIframeSync();
    const [key, setKey] = useState(0); // 用于强制重新渲染ErrorBoundary
    const resetErrorBoundaryRef = React.useRef<() => void>(() => {});

    // 创建防抖函数
    const { run: debouncedLoadComp } = useDebounceFn(
        () => {
            loadComp();
        },
        {
            wait: 1500,
        }
    );

    useEffect(() => {
        debouncedLoadComp();
    }, [detailCode]);

    // 监听 Cmd+S (Mac) 或 Ctrl+S (Windows/Linux) 来重新加载组件
    useKeyPress(["meta.s", "ctrl.s"], (event) => {
        event.preventDefault();
        // 触发重新加载
        setKey((prev) => prev + 1); // 强制重新渲染ErrorBoundary
        loadComp();
    });

    const loadComp = useMemoizedFn(() => {
        console.log("detailCode", detailCode);

        // 清空之前的错误和组件
        setError("");
        setPreviewComponent(null);
        setIsLoading(true);

        try {
            // 1. 检查代码是否为空
            if (!detailCode || detailCode.trim() === "") {
                setError("代码为空");
                setIsLoading(false);
                return;
            }

            // 2. 编译JSX到JavaScript
            // 使用经典的 JSX Transform，更稳定
            const result = transform(detailCode, {
                presets: ["react"],
                plugins: [],
                filename: "preview.js",
            });

            console.log("编译后的代码:", result.code);

            // 使用方式
            const Component = createSafeComponent(result.code);

            if (Component && typeof Component === "function") {
                setPreviewComponent(() => Component);
            } else {
                setError("无法创建有效的组件");
            }
        } catch (e: any) {
            console.error("编译错误:", e);
            setError(e.message || "编译失败");

            // 设置一个错误显示组件
            setPreviewComponent(
                () =>
                    function CompileError() {
                        return (
                            <div
                                style={{
                                    color: "red",
                                    padding: "20px",
                                    border: "1px solid #ffcdd2",
                                    backgroundColor: "#ffebee",
                                    borderRadius: "4px",
                                }}
                            >
                                编译错误: {e.message}
                            </div>
                        );
                    }
            );
        } finally {
            setIsLoading(false);
        }
    });

    // 自定义错误边界回退组件
    const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
        // 保存 resetErrorBoundary 函数的引用
        React.useEffect(() => {
            resetErrorBoundaryRef.current = resetErrorBoundary;
        }, [resetErrorBoundary]);

        const handleReload = () => {
            // 重置错误边界并重新加载组件
            resetErrorBoundary();
            setKey((prev) => prev + 1); // 强制重新渲染ErrorBoundary
            loadComp();
        };

        return (
            <div
                style={{
                    color: "#d32f2f",
                    backgroundColor: "#ffebee",
                    padding: "20px",
                    border: "1px solid #ffcdd2",
                    borderRadius: "4px",
                    margin: "10px",
                }}
            >
                <h4>渲染错误</h4>
                <p>{error.message}</p>
                <details style={{ fontSize: "12px", marginTop: "10px" }}>
                    <summary>查看堆栈跟踪</summary>
                    <pre>{error.stack}</pre>
                </details>
                <button
                    onClick={handleReload}
                    style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    重新加载
                </button>
            </div>
        );
    };

    return (
        <div style={{ padding: "10px", minHeight: "200px" }} key={key}>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={(error) => {
                    console.error("ErrorBoundary捕获的错误:", error);
                    setError(`渲染错误: ${error.message}`);
                }}
                onReset={() => {
                    // 重置状态
                    setError("");
                    setPreviewComponent(null);
                }}
            >
                {isLoading ? (
                    <div
                        style={{
                            textAlign: "center",
                            color: "#586069",
                            padding: "40px",
                        }}
                    >
                        <div>编译和渲染中...</div>
                    </div>
                ) : error ? (
                    <div
                        style={{
                            color: "#d32f2f",
                            backgroundColor: "#ffebee",
                            padding: "15px",
                            border: "1px solid #ffcdd2",
                            borderRadius: "4px",
                            marginBottom: "10px",
                        }}
                    >
                        <strong>错误:</strong> {error}
                    </div>
                ) : PreviewComponent ? (
                    <div style={{ padding: "10px" }}>
                        <PreviewComponent />
                    </div>
                ) : (
                    <div
                        style={{
                            textAlign: "center",
                            color: "#959da5",
                            padding: "40px",
                            fontStyle: "italic",
                        }}
                    >
                        暂无代码
                    </div>
                )}

                {!error && (
                    <details
                        className="fixed bottom-0"
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                            fontSize: "12px",
                            color: "#666",
                        }}
                    >
                        <summary className="text-base cursor-pointer">tips</summary>
                        <div>
                            <p>
                                <b>
                                    1. 确保代码中包含一个名为 <code className="text-red-600">Main</code> 的函数组件
                                </b>
                            </p>
                            <p>示例:</p>
                            <pre
                                style={{
                                    backgroundColor: "#fff",
                                    padding: "10px",
                                    borderRadius: "3px",
                                    fontSize: "11px",
                                }}
                            >
                                {`function Main() {
  return <div>Hello World!</div>
}
Main`}
                            </pre>
                        </div>
                        <p>
                            <b>
                                2. 当前已注入<span className="text-red-600">React，{Object.keys(currentDependencies).join("，")}</span>
                            </b>
                        </p>
                    </details>
                )}
            </ErrorBoundary>
        </div>
    );
}
