"use client";

import React, { useState, useEffect } from "react";
import { useDragable } from "@/hooks/useDragable";

const ResizeExample = () => {
  const [width, setWidth] = useState(300);

  // 使用 useDragable 实现宽度调整
  useDragable(".resizable-panel .resize-handle", {
    dragX: true,
    dragY: false,
    minX: 100,
    maxX: 800,
    resize: true, // 启用调整尺寸模式
    updateCB: ({ x, px }) => {
      // x 是新的宽度值
      setWidth(x);
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">宽度调整示例</h1>
      
      <div className="mb-6">
        <p>当前宽度: {width.toFixed(0)}px</p>
      </div>
      
      <div className="resizable-panel border border-gray-300 rounded-lg overflow-hidden relative inline-block">
        <div 
          className="bg-white h-32 relative"
          style={{ width: `${width}px` }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold">可调整宽度的面板</h2>
            <p>拖动右侧边缘来调整宽度</p>
          </div>
          <div className="resize-handle absolute right-0 top-0 bottom-0 w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500"></div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">代码示例:</h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
{`useDragable(".resizable-panel .resize-handle", {
  dragX: true,
  dragY: false,
  minX: 100,
  maxX: 800,
  resize: true, // 启用调整尺寸模式
  updateCB: ({ x, px }) => {
    // x 是新的宽度值
    setWidth(x);
  },
});`}
        </pre>
      </div>
    </div>
  );
};

export default ResizeExample;