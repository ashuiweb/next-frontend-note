import * as gsapReact from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const { useGSAP } = gsapReact;
export { gsap, gsapReact, useGSAP };

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(gsapReact.useGSAP);
