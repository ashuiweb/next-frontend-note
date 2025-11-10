"use client";

import React from "react";
 

// 定义Render组件的props类型
interface RenderProps {
  children: React.ReactNode;
}

// 主Render组件
export const Render: React.FC<RenderProps> = ({ children }) => {
  return (
    <div className="p-4 border border-purple-500 rounded">
      <h2 className="text-lg font-bold mb-2">自动组件解析演示</h2>
      <div>
        {children}
      </div>
    </div>
  );
};

 