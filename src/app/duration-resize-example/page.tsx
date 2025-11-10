"use client";

import React, { useState, useEffect } from "react";
import { useDragable } from "@/hooks/useDragable";

const DurationResizeExample = () => {
  const [panelWidth, setPanelWidth] = useState(300);
  const [duration, setDuration] = useState(1);

  // 使用 useDragable 实现宽度调整，并根据宽度重新设置 duration
  const dragInfo = useDragable(`.resizable-panel`, {
    dragX: true,
    dragY: false,
    minX: "100",  // 最小宽度 100px
    maxX: "800",  // 最大宽度 800px
    resize: true, // 启用调整尺寸模式
    handler: ".resize-handle", // 指定手柄元素
    updateCB: ({ px, x }) => {
      // 根据宽度重新设置 duration
      // 这里我们简单地将宽度映射到 0.5-5 秒的范围
      const newDuration = 0.5 + (x / 800) * 4.5;
      setPanelWidth(x);
      setDuration(newDuration);
    },
  });

  // 更新面板宽度样式
  useEffect(() => {
    const panelElement = document.querySelector(".resizable-panel");
    if (panelElement) {
      panelElement.style.width = `${panelWidth}px`;
    }
  }, [panelWidth]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Duration 根据宽度调整示例</h1>
      <p className="mb-6 text-gray-600">
        拖动面板右侧的灰色手柄来调整宽度，duration 值会根据宽度自动调整。
      </p>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">面板宽度</h3>
            <p className="text-2xl font-bold text-blue-600">{panelWidth.toFixed(0)}px</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">动画时长 (duration)</h3>
            <p className="text-2xl font-bold text-green-600">{duration.toFixed(2)}s</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="resizable-panel bg-white border border-gray-300 rounded-lg shadow-sm h-32 relative">
          <div className="p-4 h-full flex flex-col justify-between">
            <h2 className="text-lg font-semibold">可调整宽度的面板</h2>
            <p className="text-gray-600">拖动右侧灰色区域来调整面板宽度</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>100px</span>
              <span>800px</span>
            </div>
          </div>
          <div className="resize-handle absolute right-0 top-0 bottom-0 w-3 bg-gray-300 cursor-col-resize hover:bg-blue-400 transition-colors"></div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">实现代码</h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const [panelWidth, setPanelWidth] = useState(300);
const [duration, setDuration] = useState(1);

useDragable(\`.resizable-panel\`, {
  dragX: true,
  dragY: false,
  minX: "100",
  maxX: "800",
  resize: true,
  handler: ".resize-handle",
  updateCB: ({ px, x }) => {
    // 根据宽度重新设置 duration
    const newDuration = 0.5 + (x / 800) * 4.5;
    setPanelWidth(x);
    setDuration(newDuration);
  },
});`}
        </pre>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2">说明:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><code>target</code>: ".resizable-panel" - 目标元素</li>
            <li><code>handler</code>: ".resize-handle" - 操作手柄</li>
            <li><code>resize: true</code> - 启用尺寸调整模式</li>
            <li><code>dragX: true, dragY: false</code> - 只允许水平调整</li>
            <li><code>minX/maxX</code> - 设置宽度边界</li>
            <li><code>updateCB</code> - 回调函数中根据宽度计算新的 duration 值</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DurationResizeExample;