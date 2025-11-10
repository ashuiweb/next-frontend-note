"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef(null);
    useGSAP(
        () => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, yoyo: true });
            const t2 = gsap.timeline({ repeat: -1, repeatDelay: 2, yoyo: true });

            tl.from(".box1", {
                opacity: 0,
                duration: 2,
                x: 300,
            });

            tl.from(".box2", {
                opacity: 0,
                duration: 2,
                x: 300,
            });

            tl.from(".box3", {
                opacity: 0,
                duration: 2,
                x: 300,
            });
            // 如果期望在几秒钟后追加动画，可以在时间轴上直接指定时间点，不会与前面的动画产生冲突，如果加到前面去，那么还是会顺序执行
            t2.add("start");
            t2.from(".box4", { opacity: 0, duration: 2, x: 300 });
            t2.from(
                ".after3",
                {
                    opacity: 0,
                    duration: 2,
                },
                "start+=2"
            );
            t2.from(".box5", { opacity: 0, duration: 2, x: 300 }, "-=2");
        },
        {
            scope: container,
        }
    );

    return (
        <div className="grid  h-full place-items-center">
            <div ref={container} className="container flex flex-col gap-10">
                <div className="box box1 h-32 w-32  bg-pink-400  "> </div>
                <div className="box box2  h-32 w-32  bg-pink-400  "> </div>
                <div className="box box3 h-32 w-32  bg-pink-400  "> </div>
                <hr />
                <div className="after3 text-3xl">3秒后显示</div>
                <div className="box box4 h-32 w-32  bg-pink-400  "> </div>
                <div className="box box5 h-32 w-32  bg-pink-400  "> </div>
            </div>
        </div>
    );
}
