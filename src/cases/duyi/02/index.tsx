"use client";
import {   Render } from "./components";

export default function Main() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">组件自动导入方案演示</h1>

            <div className="mb-8">
                <Render>
                    <h1 className="text-xl font-semibold mb-3">Render内部使用Hello组件（自动导入）：</h1>
                    {/* 这个Hello组件将会被Babel插件自动导入 */}
                    <Hello name="自动导入的世界123456123123" />
                    <MyButton>按钮</MyButton>
                </Render>
            </div>
        </div>
    );
}
