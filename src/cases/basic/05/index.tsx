"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef(null);

    useGSAP(
        () => {
            // 创建 matchMedia 实例
            const mm = gsap.matchMedia();

            // 桌面端（≥1024px）
            mm.add("(min-width: 1024px)", () => {
                gsap.to(".box", { x: 500, duration: 1.5, repeat: -1, yoyo: true });
            });

            // 平板端（768px-1023px）
            mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
                gsap.to(".box", { rotateZ: 300, duration: 1, repeat: -1, yoyo: true });
            });

            // 移动端（≤767px）
            mm.add("(max-width: 767px)", () => {
                gsap.to(".box", { rotateY: 360, duration: 0.5, repeat: -1, yoyo: true });
            });

            // 返回清理函数
            return () => mm.revert();
        },
        {
            scope: container,
        }
    );

    return (
        <div className="grid  h-full place-items-center">
            <div ref={container} className="w-screen flex flex-col ">
                <div className="page h-screen bg-sky-300 grid place-items-center">
                    <div className="box box1 bg-orange-300 h-48 w-48"></div>
                </div>
            </div>
        </div>
    );
}
