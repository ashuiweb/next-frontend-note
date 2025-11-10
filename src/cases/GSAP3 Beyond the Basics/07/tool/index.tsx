"use client";
import { useDragable } from "@/hooks/useDragable";
import { gsap, useGSAP } from "@/util/gsap";
import { useMemo, useRef, useState } from "react";

export default function Tool({ animation }: { animation: gsap.core.Timeline }) {
    const container = useRef<HTMLDivElement>(null);

    const [total, setTotal] = useState(animation.duration());
    const children = useMemo(() => animation.getChildren(), [animation]);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    // 直接解构获取位置信息
    useDragable(".handler", {
        dragX: true,
        handler: ".handler-item",
        minX: "0%",
        maxX: "100%",

        updateCB: ({ px }) => {
            if (px) {
                animation.paused(true);
            }
            animation.progress(px);
        },
    });

    // 为每个子动画条添加拖拽功能
    children.forEach((child, index) => {
        useDragable(`.child-${index}`, {
            dragX: true,
            dragY: false,
            minX: "0%",
            handler: ".flex-1",
            updateCB: ({ px, x }) => {
                // 更新子动画的开始时间
                if (px !== undefined && total > 0 && draggingIndex === index) {
                    const newStartTime = px * total;
                    // 使用 GSAP 的 startTime 方法更新子动画的开始时间
                    child.startTime(newStartTime);
                    // 暂停主动画以避免冲突
                    animation.paused(true);
                    console.log(`Updated child ${index} start time to: ${newStartTime}`);
                }
            },
        });

        useDragable(`.child-${index}`, {
            dragX: true,
            dragY: false,
            minX: "0%",
            maxX: "1000%",
            resize: true,
            handler: ".bg-white",
            updateCB: ({ px, x }) => {
                //根据宽度 重新设置duration
                if (px !== undefined && total > 0 && draggingIndex === index) {
                    // 确保子动画存在且有duration方法
                    if (child && typeof (child as gsap.core.Tween).duration === "function") {
                        // 计算新的持续时间（基于总持续时间和比例）
                        const newDuration = Math.max(0.1, px * total); // 确保最小持续时间0.1秒
                        // 更新子动画的持续时间
                        (child as gsap.core.Tween).duration(newDuration);
                        // 暂停主动画以避免冲突
                        animation.paused(true);
                        console.log(`Updated child ${index} duration to: ${newDuration}`);

                        // 同时更新UI中的宽度显示
                        const element = document.querySelector(`.child-${index}`);
                        if (element) {
                            (element as HTMLElement).style.width = `${px * 100}%`;
                        }
                    }
                }
            },
        });
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
                            className={`h-full flex absolute child-${index}     `}
                            style={{
                                left: `${(it.startTime() / total) * 100}%`,
                                width: `${(it.duration() / total) * 100}%`,
                                background: getComputedStyle(it.targets()[0]).backgroundColor,
                            }}
                            onClick={() => {
                                console.dir(it.startTime());
                            }}
                            onMouseDown={() => setDraggingIndex(index)}
                            onMouseUp={() => setDraggingIndex(null)}
                        >
                            <div className="flex-1 bar relative"></div>
                            <div className="w-4  bg-white h-full absolute opacity-45 top-0 right-0"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
