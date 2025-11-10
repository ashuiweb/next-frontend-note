"use client";
import { useEffect } from "react";
import { useGlobalState } from "@/store/globalStore";

// 自定义 hook 用于跨 iframe 同步状态
export const useIframeSync = () => {
  const [detailCode, setDetailCode] = useGlobalState((state) => [state.detailCode, state.setDetailCode]);

  useEffect(() => {
    // 监听来自其他窗口的 storage 事件
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ashui-gsap-storage" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.state?.detailCode && parsed.state.detailCode !== detailCode) {
            setDetailCode(parsed.state.detailCode);
          }
        } catch (error) {
          console.error("Failed to parse storage change:", error);
        }
      }
    };

    // 添加事件监听器
    window.addEventListener("storage", handleStorageChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [detailCode, setDetailCode]);

  return { detailCode };
};