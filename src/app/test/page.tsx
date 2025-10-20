import React from 'react';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">测试页面</h1>
      <p className="mb-4">这个页面用于测试 iframe 中的 Preview 页面是否能正确显示。</p>
      <iframe 
        src="/preview" 
        className="w-full h-96 border-2 border-gray-300 rounded"
        title="Preview Test"
      />
    </div>
  );
}