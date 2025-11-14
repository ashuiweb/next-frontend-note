"use client";
import { useEffect } from "react";
import { main } from "./core";
export default function Main() {
    useEffect(() => {
        main();
    }, []);
    return (
        <div className="grid bg-slate-800 h-screen text-white place-items-center">
            <div className="flex" id="root">
                <div id="main" className="flex-1 relative bg-black"></div>
                <div id=" " className="flex-shrink-0 relative bg-slate-300">
                    <div id="right"></div>
                    <div id="score" className="text-center text-3xl text-red-500"></div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="border p-2" id="moveLeft">
                    向左移动
                </button>
                <button className="border p-2" id="moveRight">
                    向右移动
                </button>

                <button className="border p-2" id="moveDownDirectly">
                    向下移动到底
                </button>
                <button className="border p-2" id="rotate">
                    旋转
                </button>
                <button className="border p-2" id="pause">
                    暂停
                </button>
                <button className="border p-2" id="start">
                    开始
                </button>
                <button className="border p-2" id="add">
                    重新显示
                </button>
            </div>
        </div>
    );
}
