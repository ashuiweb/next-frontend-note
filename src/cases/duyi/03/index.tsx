"use client";
import { useEffect } from "react";
import { main } from "./core";
export default function Main() {
    useEffect(() => {
        main();
    }, []);
    return (
        <div className="grid  h-full place-items-center">
            <div
                id="root"
                style={{
                    width: "500px",
                    height: "500px",
                    background: "black",
                    position: "relative",
                }}
            ></div>
            <div className="flex gap-2">
                <button className="border p-2" id="moveDown">
                    向下移动
                </button>
                <button className="border p-2" id="remove">
                    移除
                </button>
                <button className="border p-2" id="add">
                    重新显示
                </button>
            </div>
        </div>
    );
}
