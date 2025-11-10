"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useRef } from "react";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);
    const svgRef = useRef<any>(null);

    useGSAP(
        () => {
            let d = "M 0 250 Q 500 220 1000 250";
            const originD = "M 0 250 Q 500 220 1000 250";
            const path = container.current?.querySelector("path");
            svgRef.current?.addEventListener("mousemove", (e: MouseEvent) => {
                d = `M 0 250 Q ${e.x} ${e.y} 1000 250`;
                gsap.to("svg path", {
                    attr: { d },
                    duration: 0.3,
                    ease: "power3.out",
                });
            });
            svgRef.current?.addEventListener("mouseleave", () => {
                gsap.to("svg path", {
                    attr: { d: originD },
                    duration: 1.5,
                    ease: "elastic.out(1, 0.2)",
                });
            });
        },
        {
            scope: container,
        }
    );

    return (
        <div ref={container}>
            <svg ref={svgRef} className="bg-pink-400" width="100%" height="500" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path d="M 0 250 Q 500 220 1000 250" fill="none" stroke="black" strokeWidth="2" />
            </svg>
        </div>
    );
}
