"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useMemoizedFn } from "ahooks";
import { useRef } from "react";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);

    //如果不使用箭头函数则可以获取this
    const onComplete = useMemoizedFn(function (this: gsap.core.Tween, ...args: any[]) {});
    useGSAP(
        () => {
            gsap.to(".h-20", {
                rotate: "360deg",
                scale: 2,
                repeat: -1,
                yoyo: true,
            });
        },
        {
            scope: container,
        }
    );

    return (
        <div ref={container} className="h-screen justify-center flex items-center gap-20 ">
            <div
                onClick={() => {
                    gsap.killTweensOf(".red", "rotate");
                }}
                className="red   h-20 w-20 bg-red-400"
            ></div>
            <div
                onClick={() => {
                    gsap.killTweensOf(".blue", "scale");
                }}
                className="blue h-20 w-20 bg-blue-400"
            ></div>
        </div>
    );
}
