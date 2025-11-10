"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function TestPage() {
  const testContent = `
# 表格测试

这是一个简单的表格：

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## 复杂表格

| 功能 | 描述 | 状态 |
|------|------|------|
| 动画编排 | 使用Timeline控制动画序列 | ✅ 已实现 |
| 延迟控制 | 传统delay方式控制动画 | ⚠️ 不推荐 |
| 时间轴定位 | 精确控制动画开始时间 | ✅ 已实现 |
`;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown 表格测试</h1>
      <MarkdownRenderer content={testContent} />
    </div>
  );
}