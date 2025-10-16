# Next Frontend Note - 前端学习笔记平台

欢迎来到 Next Frontend Note，这是一个专为前端开发者设计的交互式学习笔记平台。通过代码编辑器、实时预览和学习笔记的完美融合，你可以更高效地学习和掌握各种前端技术。

## 🌟 项目特色

- **三位一体学习体验**：代码编辑器 + 实时可视化效果 + 详细学习笔记
- **实时预览**：编写代码即刻看到效果，无需手动刷新
- **案例丰富**：涵盖前端开发的各个方面，从基础到进阶
- **交互式学习**：边学边练，加深理解
- **模块化设计**：清晰的项目结构，便于扩展和维护

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 开始你的前端学习之旅！

## 📁 项目结构

```
src/
├── cases/              # 所有学习案例目录
│   ├── basic/          # 基础案例
│   │   ├── 01/         # 具体案例
│   │   │   ├── index.json    # 案例配置信息
│   │   │   ├── index.tsx     # 案例开发入口
│   │   │   └── readme.md     # 案例学习笔记
│   │   └── ...
│   └── ...
├── app/                # Next.js 应用页面
└── components/         # 公共组件
```

### 案例目录说明

- **一级目录**：技术领域（如 basic、react、vue、animation 等）
- **二级目录**：具体练习项目
- **index.json**：项目配置信息
- **index.tsx**：项目开发入口
- **readme.md**：项目学习笔记

## ⚙️ 核心功能

### 1. 代码编辑器
- 实时代码编辑
- 语法高亮

### 2. 实时预览
- 代码变更即时生效
- 错误提示和调试信息
- 支持热重载

### 3. 学习笔记
- Markdown 格式笔记
- 案例要点总结

## 🛠️ 技术架构

### 数据存储

项目采用 **json-server** 进行本地数据存储，简单高效，适合学习和开发。

### 依赖注入

在 `src/app/detail/Preview.tsx` 中，通过 `currentDependencies` 配置注入到编辑器的全局包：

```javascript
const currentDependencies = {
    dayjs,
    ahooks,
    gsap,
    gsapReact,
    useEffect,
    useState,
    useRef,
    useMemo,
    useMemoizedFn,
    useGSAP: gsapReact.useGSAP,
};
```

这些依赖在编辑器中可直接使用，无需额外导入。

## 🎯 学习流程

1. **选择案例**：在首页浏览和选择你感兴趣的学习案例
2. **阅读笔记**：在右侧面板阅读详细的学习笔记
3. **编辑代码**：在代码编辑器中修改示例代码
4. **查看效果**：在预览区域实时查看代码效果
 

## 📚 案例类型

- **基础语法**：HTML、CSS、JavaScript 基础
- **框架学习**：React、Vue 等前端框架
- **动画效果**：GSAP、CSS 动画等
- **UI 组件**：常见 UI 组件实现
- **实用工具**：日常开发中的工具函数

## 🛠️ 开发指南

### 创建新案例

1. 在 `src/cases/` 下创建技术领域目录（如 `react`）
2. 在领域目录下创建案例目录（如 `01`）
3. 在案例目录中添加：
   - `index.json`：案例配置信息
   - `index.tsx`：案例开发入口
   - `readme.md`：案例学习笔记

### index.json 配置示例

```json
{
    "title": "React 状态管理",
    "description": "学习 React 中的状态管理方式",
    "tags": ["react", "state"],
    "difficulty": "intermediate",
    "author": "你的名字",
    "likes": 0
}
```

### index.tsx 开发入口示例

```tsx
"use client";
import { useState } from "react";

export default function Main() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <h1>计数器示例</h1>
            <p>当前计数: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                增加
            </button>
        </div>
    );
}
```

## 🎯 学习建议

1. **系统学习**：按照案例顺序逐步学习，建立完整的知识体系
2. **动手实践**：修改代码观察效果变化，加深理解
3. **记录笔记**：在 `readme.md` 中记录自己的学习心得
4. **分享交流**：将优秀的案例分享给其他开发者

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习平台！

## 📄 许可证

MIT License