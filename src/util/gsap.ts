import * as gsapReact from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
const { useGSAP } = gsapReact;
export { gsap, gsapReact, GSDevTools, SplitText, useGSAP };

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(gsapReact.useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);
