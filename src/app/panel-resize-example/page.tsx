"use client";

import React, { useState } from "react";
import { useDragable } from "@/hooks/useDragable";

const PanelResizeExample = () => {
  const [panelWidths, setPanelWidths] = useState([200, 300, 250]);

  // 为每个面板创建调整宽度的功能
  const createPanelResize = (index: number) => {
    return useDragable(`.child-${index} .bg-white`, {
      dragX: true,
      dragY: false,
      minX: "0%",
      maxX: "1000%",
      resize: true,
      updateCB: ({ x, px, parent, target }) => {
        // 更新对应面板的宽度
        const newWidths = [...panelWidths];
        newWidths[index] = x;
        setPanelWidths(newWidths);
        
        // 同时更新元素的宽度样式
        if (target) {
          target.style.width = `${x}px`;
        }
      },
    });
  };

  // 创建三个面板的调整功能
  const panel0 = createPanelResize(0);
  const panel1 = createPanelResize(1);
  const panel2 = createPanelResize(2);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">面板宽度调整示例</h1>
      <p className="mb-6">这个示例展示了你提到的用例的实现方式</p>
      
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        {/* 面板1 */}
        <div className={`child-0`}>
          <div className="bg-white h-48 relative border-r border-gray-300">
            <div className="p-4">
              <h2 className="text-lg font-semibold">面板 1</h2>
              <p>宽度: {panelWidths[0].toFixed(0)}px</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 bg-gray-300"></div>
          </div>
        </div>
        
        {/* 面板2 */}
        <div className={`child-1`}>
          <div className="bg-white h-48 relative border-r border-gray-300">
            <div className="p-4">
              <h2 className="text-lg font-semibold">面板 2</h2>
              <p>宽度: {panelWidths[1].toFixed(0)}px</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 bg-gray-300"></div>
          </div>
        </div>
        
        {/* 面板3 */}
        <div className={`child-2 flex-grow`}>
          <div className="bg-white h-48 relative">
            <div className="p-4">
              <h2 className="text-lg font-semibold">面板 3</h2>
              <p>宽度: {panelWidths[2].toFixed(0)}px</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-200 bg-gray-300"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">实现代码:</h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [panelWidths, setPanelWidths] = useState([200, 300, 250]);

// 为每个面板创建调整宽度的功能
const createPanelResize = (index: number) => {
  return useDragable(\`.child-\${index} .bg-white\`, {
    dragX: true,
    dragY: false,
    minX: "0%",
    maxX: "1000%",
    resize: true,
    updateCB: ({ x, px, parent, target }) => {
      // 更新对应面板的宽度
      const newWidths = [...panelWidths];
      newWidths[index] = x;
      setPanelWidths(newWidths);
      
      // 同时更新元素的宽度样式
      if (target) {
        target.style.width = \`\${x}px\`;
      }
    },
  });
};

// 创建三个面板的调整功能
const panel0 = createPanelResize(0);
const panel1 = createPanelResize(1);
const panel2 = createPanelResize(2);`}
        </pre>
      </div>
    </div>
  );
};

export default PanelResizeExample;