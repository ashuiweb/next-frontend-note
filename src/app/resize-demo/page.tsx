"use client";

import React, { useRef } from "react";
import { useDragable } from "@/hooks/useDragable";

const ResizeDemo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // 使用自定义手柄调整宽度
  const size1 = useDragable(targetRef, {
    dragX: true,
    dragY: false,
    minX: 50,
    maxX: "200%",
    resize: true, // 启用调整尺寸模式
    handler: handleRef
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Resize with useDragable Demo</h1>
      
      {/* 示例: 使用 useDragable 调整宽度 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">使用 useDragable 调整元素宽度</h2>
        <div className="flex space-x-4">
          <div 
            ref={targetRef}
            className="relative w-48 h-32 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
          >
            <div 
              ref={handleRef}
              className="absolute -right-1 top-0 bottom-0 w-2 bg-purple-700 cursor-col-resize"
            />
            拖动右侧边缘
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>尺寸:</p>
            <p>宽度: {size1.x.toFixed(2)}px</p>
            <p>宽度比例: {(size1.px * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResizeDemo;