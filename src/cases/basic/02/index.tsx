"use client";
import * as gsapReact from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const { useGSAP } = gsapReact;
gsap.registerPlugin(useGSAP);

export default function Main() {
    const container = useRef(null);
    useGSAP(
        () => {
            gsap.to(".box", {
                x: 500,
                duration: 2,
                background: "orange",
                // stagger:0.5,
                stagger: {
                    each: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                },
            });
        },
        {
            scope: container,
        }
    );

    return (
        <div className="grid  h-full place-items-center">
            <div ref={container} className="container flex flex-col gap-10">
                <div className="box h-32 w-32  bg-pink-400  "> </div>
                <div className="box h-32 w-32  bg-pink-400  "> </div>
                <div className="box h-32 w-32  bg-pink-400  "> </div>
                <div className="box h-32 w-32  bg-pink-400  "> </div>
            </div>
        </div>
    );
}
