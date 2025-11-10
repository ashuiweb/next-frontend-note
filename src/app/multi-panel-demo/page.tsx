"use client";

import React, { useState, useEffect } from "react";
import { useDragable } from "@/hooks/useDragable";

const MultiPanelDemo = () => {
  const [panelWidths, setPanelWidths] = useState<number[]>([200, 200, 200]);

  // 为每个面板创建拖拽调整功能
  const panel1 = useDragable(".child-0 .resize-handle", {
    dragX: true,
    dragY: false,
    minX: 50,
    maxX: 800,
    resize: true,
    updateCB: ({ px, x, parent, target }) => {
      const newWidths = [...panelWidths];
      newWidths[0] = x;
      setPanelWidths(newWidths);
    },
  });

  const panel2 = useDragable(".child-1 .resize-handle", {
    dragX: true,
    dragY: false,
    minX: 50,
    maxX: 800,
    resize: true,
    updateCB: ({ px, x, parent, target }) => {
      const newWidths = [...panelWidths];
      newWidths[1] = x;
      setPanelWidths(newWidths);
    },
  });

  const panel3 = useDragable(".child-2 .resize-handle", {
    dragX: true,
    dragY: false,
    minX: 50,
    maxX: 800,
    resize: true,
    updateCB: ({ px, x, parent, target }) => {
      const newWidths = [...panelWidths];
      newWidths[2] = x;
      setPanelWidths(newWidths);
    },
  });

  // 更新面板宽度样式
  useEffect(() => {
    const updatePanelStyles = () => {
      const panel1Element = document.querySelector(".child-0");
      const panel2Element = document.querySelector(".child-1");
      const panel3Element = document.querySelector(".child-2");
      
      if (panel1Element) panel1Element.setAttribute("style", `width: ${panelWidths[0]}px`);
      if (panel2Element) panel2Element.setAttribute("style", `width: ${panelWidths[1]}px`);
      if (panel3Element) panel3Element.setAttribute("style", `width: ${panelWidths[2]}px`);
    };
    
    updatePanelStyles();
  }, [panelWidths]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">多面板宽度调整示例</h1>
      
      <div className="flex border border-gray-300 rounded-lg overflow-hidden relative">
        {/* 面板1 */}
        <div className="child-0 bg-white border-r border-gray-300 relative">
          <div className="p-4">
            <h2 className="text-lg font-semibold">面板 1</h2>
            <p>宽度: {panelWidths[0].toFixed(0)}px</p>
          </div>
          <div className="resize-handle absolute right-0 top-0 bottom-0 w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500"></div>
        </div>
        
        {/* 面板2 */}
        <div className="child-1 bg-white border-r border-gray-300 relative">
          <div className="p-4">
            <h2 className="text-lg font-semibold">面板 2</h2>
            <p>宽度: {panelWidths[1].toFixed(0)}px</p>
          </div>
          <div className="resize-handle absolute right-0 top-0 bottom-0 w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500"></div>
        </div>
        
        {/* 面板3 */}
        <div className="child-2 bg-white flex-grow relative">
          <div className="p-4">
            <h2 className="text-lg font-semibold">面板 3</h2>
            <p>宽度: {panelWidths[2].toFixed(0)}px</p>
          </div>
          <div className="resize-handle absolute right-0 top-0 bottom-0 w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500"></div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">说明:</h3>
        <p>每个面板右侧的灰色条都是调整手柄，可以水平拖动来调整面板宽度。</p>
        <p>这个示例展示了如何使用 useDragable hook 的 resize 模式来实现面板宽度调整功能。</p>
      </div>
    </div>
  );
};

export default MultiPanelDemo;