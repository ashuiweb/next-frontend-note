"use client";

import React, { useState } from "react";
import FullScreenSideDrawer from "@/components/FullScreenSideDrawer";
import { Button } from "@/components/ui/button";

const DrawerUsageExample: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">抽屉使用示例</h2>
            
            {/* 方式1: 通过状态控制 */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">方式1: 通过状态控制</h3>
                <div className="flex gap-2">
                    <Button onClick={() => setIsDrawerOpen(true)}>打开抽屉</Button>
                    <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>关闭抽屉</Button>
                </div>
                <FullScreenSideDrawer 
                    isOpen={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                />
            </div>

            {/* 方式2: 使用自定义触发元素 */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">方式2: 使用自定义触发元素</h3>
                <FullScreenSideDrawer 
                    trigger={
                        <Button variant="secondary">自定义触发按钮</Button>
                    }
                />
            </div>

            {/* 方式3: 受控模式与自定义触发元素结合 */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">方式3: 受控模式与自定义触发元素结合</h3>
                <div className="flex gap-2">
                    <Button onClick={() => setIsDrawerOpen(true)}>外部打开</Button>
                </div>
                <FullScreenSideDrawer 
                    isOpen={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    trigger={
                        <Button variant="ghost">自定义触发</Button>
                    }
                />
            </div>
        </div>
    );
};

export default DrawerUsageExample;