"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.set(`.wrapper`, { autoAlpha: 1 });
            let split = new SplitText("h1", { type: "chars" });
            let chars = split.chars;
            console.log("🚀 ~ Main ~ chars:", chars);
            let animation = gsap.timeline({
                id: 1,
                repeat: -1,
            });

            animation
                .from(chars, {
                    // y: -100,
                    y: gsap.utils.wrap([-100, 100]), //期望数据不是死的而是一组数据交替出现
                    rotation: gsap.utils.wrap([-100, 100]),
                    opacity: 0,
                    stagger: {
                        each: 0.05,
                        // from: "center",//从中间到两边
                        //from: "edges",//从两边到中间
                        // from: "end",//从右到左
                        from: "start", //从左到右
                        //from: "random", //随机
                    },
                })
                .to(
                    chars,
                    {
                        color: gsap.utils.wrap(["pink", "orange", "aqua"]),
                        stagger: {
                            each: 0.06,
                        },
                    },
                    "<"
                )
                .to(chars, {
                    y: gsap.utils.wrap([-20, -20, -20, 20, 20, 20]),
                });

            /*  GSDevTools.create({
                animation,
            }); */
        },
        {
            scope: container,
        }
    );
    return (
        <div ref={container} className="h-screen justify-center flex items-center gap-20 ">
            <div className="wrapper">
                <h1 className="text-5xl">alternate direction</h1>
            </div>
        </div>
    );
}
