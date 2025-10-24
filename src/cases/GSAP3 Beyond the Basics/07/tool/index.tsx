"use client";
import { useDragable } from "@/hooks/useDragable";
import { gsap, useGSAP } from "@/util/gsap";
import { useMemo, useRef } from "react";

export default function Tool({ animation }: { animation: gsap.core.Timeline }) {
    const container = useRef<HTMLDivElement>(null);
    const total = useMemo(() => animation.duration(), [animation]);
    const children = useMemo(() => animation.getChildren(), [animation]);

    // 直接解构获取位置信息
    useDragable(".handler", {
        dragX: true,

        minX: "0%",
        maxX: "100%",

        updateCB: ({ px }) => {
            if (px) {
                animation.paused(true);
            }
            animation.progress(px);
        },
    });
    useGSAP(
        () => {
            animation.eventCallback("onUpdate", function (this: gsap.core.Tween) {
                gsap.set(".handler", {
                    left: this.progress() * 100 + "%",
                    duration: 0,
                });
            });

            return () => {
                animation.eventCallback("onUpdate", null); // 取消回调
            };
        },
        {
            scope: container,
        }
    );
    return (
        <div ref={container} className="w-full p-5 ">
            <div className="relative">
                <div className="handler absolute top-0 z-10 left-0 w-[2px] bg-pink-700 h-full">
                    <div className="handler-item absolute -top-5 -left-[7px] w-4 h-6 bg-pink-700 rounded-full opacity-80 cursor-pointer"></div>
                </div>
                <div className="rule flex border border-t-0 border-b-4 border-slate-600">
                    {Array.from({ length: total }).map((_, i) => {
                        return (
                            <div className={`rule-item box-border h-5 border-r relative last-of-type:border-r-0`} style={{ width: `${100 / total}%` }} key={i}>
                                <span className="absolute -left-2 -top-5 w-4 block text-center">{i}</span>
                                {i === total - 1 && <span className="absolute -top-5 left-auto -right-1">{total}</span>}
                            </div>
                        );
                    })}
                </div>
                {children.map((it, index) => (
                    <div key={index} className="trace relative bg-slate-200 w-full border-b-4 border-slate-600 h-10">
                        <div
                            className="h-full bg-pink-500 absolute "
                            style={{
                                left: `${(it.startTime() / total) * 100}%`,
                                width: `${(it.duration() / total) * 100}%`,
                                background: getComputedStyle(it.targets()[0]).backgroundColor,
                            }}
                            onClick={() => {
                                console.dir(it.startTime());
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
