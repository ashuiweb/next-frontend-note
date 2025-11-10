"use client";

import React, { useRef } from "react";
import { useDragable } from "@/hooks/useDragable";

const DraggableDemo = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const customHandleRef = useRef<HTMLDivElement>(null);

  // 使用默认手柄（整个元素）
  const position1 = useDragable("#draggable1");

  // 使用自定义手柄
  const position2 = useDragable(targetRef, {
    handler: ".handle"
  });

  // 使用 ref 作为手柄
  const position3 = useDragable("#draggable3", {
    handler: customHandleRef
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Draggable Demo</h1>
      
      {/* 示例1: 默认手柄 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">示例1: 默认手柄（整个元素可拖动）</h2>
        <div className="flex space-x-4">
          <div 
            id="draggable1" 
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg cursor-grab flex items-center justify-center text-white font-bold"
          >
            拖动我
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>位置:</p>
            <p>X: {position1.x.toFixed(2)}px</p>
            <p>Y: {position1.y.toFixed(2)}px</p>
            <p>PX: {(position1.px * 100).toFixed(2)}%</p>
            <p>PY: {(position1.py * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* 示例2: 自定义手柄选择器 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">示例2: 自定义手柄（.handle 类元素）</h2>
        <div className="flex space-x-4">
          <div 
            ref={targetRef}
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex flex-col"
          >
            <div className="handle bg-green-700 text-white text-center py-1 cursor-grab">
              拖动这里
            </div>
            <div className="flex-grow flex items-center justify-center text-white font-bold">
              内容区域
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>位置:</p>
            <p>X: {position2.x.toFixed(2)}px</p>
            <p>Y: {position2.y.toFixed(2)}px</p>
            <p>PX: {(position2.px * 100).toFixed(2)}%</p>
            <p>PY: {(position2.py * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* 示例3: Ref 作为手柄 */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">示例3: Ref 作为手柄</h2>
        <div className="flex space-x-4">
          <div 
            id="draggable3"
            className="w-32 h-32 bg-purple-500 rounded-lg shadow-lg flex flex-col"
          >
            <div 
              ref={customHandleRef}
              className="bg-purple-700 text-white text-center py-1 cursor-grab"
            >
              拖动这里
            </div>
            <div className="flex-grow flex items-center justify-center text-white font-bold">
              内容区域
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p>位置:</p>
            <p>X: {position3.x.toFixed(2)}px</p>
            <p>Y: {position3.y.toFixed(2)}px</p>
            <p>PX: {(position3.px * 100).toFixed(2)}%</p>
            <p>PY: {(position3.py * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableDemo;