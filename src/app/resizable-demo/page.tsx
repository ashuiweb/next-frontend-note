"use client";

import React, { useRef } from "react";
import { useResizable } from "@/hooks/useResizable";

const ResizableDemo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // 使用自定义手柄调整尺寸
  const size1 = useResizable(targetRef, {
    resizeX: true,
    resizeY: true,
    minWidth: 100,
    minHeight: 100,
    maxWidth: "150%",
    maxHeight: "150%",
    handler: handleRef
  });

  // 使用默认手柄（整个元素）调整尺寸
  const size2 = useResizable("#resizable2", {
    resizeX: true,
    resizeY: false,
    minWidth: 50,
    maxWidth: "200%"
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Resizable Demo</h1>
      
      {/* 示例1: 使用自定义手柄 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">示例1: 使用自定义手柄调整尺寸</h2>
        <div className="flex space-x-4">
          <div 
            ref={targetRef}
            className="relative w-64 h-48 bg-blue-500 rounded-lg shadow-lg flex flex-col"
          >
            <div 
              ref={handleRef}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-700 rounded-full cursor-col-resize"
            />
            <div className="flex-grow flex items-center justify-center text-white font-bold">
              拖动右下角圆点
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>尺寸:</p>
            <p>宽度: {size1.width.toFixed(2)}px</p>
            <p>高度: {size1.height.toFixed(2)}px</p>
            <p>宽度比例: {(size1.pWidth * 100).toFixed(2)}%</p>
            <p>高度比例: {(size1.pHeight * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* 示例2: 使用整个元素作为手柄 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">示例2: 使用整个元素调整宽度</h2>
        <div className="flex space-x-4">
          <div 
            id="resizable2"
            className="w-48 h-32 bg-green-500 rounded-lg shadow-lg cursor-col-resize flex items-center justify-center text-white font-bold"
          >
            水平拖动调整宽度
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>尺寸:</p>
            <p>宽度: {size2.width.toFixed(2)}px</p>
            <p>宽度比例: {(size2.pWidth * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResizableDemo;