"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useScreen from "@/hooks/useScreen";
import { useGlobalState } from "@/store/globalStore";
import { useKeyPress, useMemoizedFn } from "ahooks";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

interface FullScreenSideDrawerProps {
    /**
     * 控制抽屉是否打开
     */
    isOpen?: boolean;
    /**
     * 抽屉打开/关闭状态变化时的回调函数
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * 触发抽屉打开的元素
     */
    trigger?: React.ReactNode;
}

const FullScreenSideDrawer: React.FC<FullScreenSideDrawerProps> = ({ isOpen, onOpenChange, trigger = null }) => {
    const { md: isDesktop } = useScreen();
    const router = useRouter();
    const [direction, setDirection] = useState<"bottom" | "left">(isDesktop ? "left" : "bottom");
    const { fullScreenSideDrawerChildren, fullScreenSideDrawerOpen, setData } = useGlobalState((s) => ({
        fullScreenSideDrawerChildren: s.fullScreenSideDrawerChildren,
        fullScreenSideDrawerOpen: s.fullScreenSideDrawerOpen,
        setData: s.setData,
    }));
    // 当屏幕尺寸变化时更新方向
    useEffect(() => {
        setDirection(isDesktop ? "left" : "bottom");
    }, [isDesktop]);

    const close = useMemoizedFn(() => {
        setData("fullScreenSideDrawerOpen", false);
    });

    useKeyPress("esc", () => {
        if (open) {
            close();
        } else {
            router.back();
        }
    });

    const open = useMemo(() => {
        return isOpen || fullScreenSideDrawerOpen;
    }, [isOpen, fullScreenSideDrawerOpen]);

    return (
        <Drawer direction={direction} open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>

            <DrawerContent
                className={`
          h-full max-h-[100dvh] rounded-none
          ${direction === "left" ? "w-screen  left-0 right-auto" : "w-full max-w-none"}
        `}
            >
                <Button onClick={close} variant="ghost" size="icon" className="fixed top-4 right-4 h-8 w-8 rounded-full">
                    <X className="h-5 w-5" />
                    <span className="sr-only">关闭</span>
                </Button>

                <div className={`${direction === "left" ? "h-full flex flex-col" : "mx-auto w-full max-w-7xl"}`}>
                    <div
                        className={`
            ${direction === "left" ? "flex-1 overflow-y-auto p-4 sm:p-6" : "p-4 sm:p-6 overflow-y-auto h-[calc(100vh-150px)]"}
          `}
                    >
                        {fullScreenSideDrawerChildren}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default FullScreenSideDrawer;
