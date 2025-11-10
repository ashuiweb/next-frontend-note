"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef(null);
    useGSAP(
        () => {
            gsap.from(".box1", {
                rotate: -360 * 2,
                duration: 3,
            });
            gsap.from(".box2", {
                rotate: -360 * 2,
                duration: 3,
                scale: 0,
                delay: 1,
                scrollTrigger: ".box2",
            });
            gsap.from(".box3", {
                rotate: -360 * 2,
                duration: 3,
                scale: 0,
                delay: 1,
                scrollTrigger: ".box3",
            });
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
                <div className="page page2 h-screen bg-sky-400 grid place-items-center">
                    <div className="box box2 bg-orange-300 h-48 w-48"></div>
                </div>
                <div className="page h-screen bg-sky-500 grid place-items-center">
                    <div className="box box3 bg-orange-300 h-48 w-48"></div>
                </div>
            </div>
        </div>
    );
}
