"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef, useState } from "react";
import Tool from "./tool";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);
    const [animation, setAnimation] = useState<gsap.core.Timeline>();
    useGSAP(
        () => {
            const tl = gsap.timeline();
            tl.to(".one", {
                x: 300,
                duration: 1,
            })
                .to(".two", {
                    x: 300,
                    duration: 2,
                })
                .to(".three", {
                    x: 300,
                    duration: 3,
                });
            setAnimation(tl);
        },
        {
            scope: container,
        }
    );

    return (
        <div ref={container} className="h-screen  items-center ">
            <div className="flex flex-col gap-4">
                <div className="one w-20 h-20 bg-pink-500 flex-center">one</div>
                <div className="two w-20 h-20 bg-orange-500 rounded-full flex-center">two</div>
                <div className="three w-20 h-20 bg-green-500 rounded-md flex-center">three</div>
            </div>
            {animation && <Tool animation={animation} />}
        </div>
    );
}
