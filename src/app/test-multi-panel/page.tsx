"use client";
import React from "react";
import MultiResizablePanels from "@/components/MultiResizablePanels";

export default function TestPage() {
  return (
    <MultiResizablePanels
      leftPanels={[
        <div key="panel1" className="p-4 bg-blue-100 h-full">
          <h2 className="text-lg font-bold">面板 1</h2>
          <p>这是第一个面板的内容</p>
        </div>,
        <div key="panel2" className="p-4 bg-green-100 h-full">
          <h2 className="text-lg font-bold">面板 2</h2>
          <p>这是第二个面板的内容</p>
        </div>,
        <div key="panel3" className="p-4 bg-yellow-100 h-full">
          <h2 className="text-lg font-bold">面板 3</h2>
          <p>这是第三个面板的内容</p>
        </div>
      ]}
      rightPanel={
        <div className="p-4 bg-red-100 h-full">
          <h2 className="text-lg font-bold">右侧面板</h2>
          <p>这是右侧面板的内容</p>
        </div>
      }
      defaultLeftWidth={60}
      minLeftWidth={30}
      maxLeftWidth={80}
    />
  );
}