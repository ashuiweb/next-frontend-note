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
            gsap.to(".circle1", { rotation: "+=360", duration: 3, x: "500px", repeat: -1 });
            gsap.from(".circle2", { rotation: "-=360", duration: 3, x: "500px", repeat: -1 });
        },
        {
            scope: container,
        }
    );

    return (
        <div className="grid  h-full place-items-center">
            <div ref={container} className="container">
                <div className="circle1 h-32 w-32   bg-green-400 grid place-items-center">gsap.to</div>
                <div className="circle2 h-32 w-32   bg-pink-400 grid place-items-center">gsap.from</div>
            </div>
        </div>
    );
}
