"use client";
import { gsap, useGSAP } from "@/util/gsap";
import { useMemoizedFn } from "ahooks";
import { useRef } from "react";

export default function Main() {
    const container = useRef<HTMLDivElement>(null);

    //如果不使用箭头函数则可以获取this
    const onComplete = useMemoizedFn(function (this: gsap.core.Tween, ...args: any[]) {
        console.log("onComplete", this, args);
        //console.log(this.time());
        //@ts-ignore
        //console.log(this.targets()[0]);

        //@ts-ignore
        /*  setStyles(this, {
            border: "1px solid red",
            borderRadius: "10px",
            overflow: "hidden",
        }); */
    });
    useGSAP(
        () => {
            gsap.to("img", {
                x: 400,
                scale: 3,
                duration: 1,
                onComplete,
                callbackScope: container.current?.querySelector("img")!, //通过它来修改this 指向
                onCompleteParams: ["hello", "world"],
            });
        },
        {
            scope: container,
        }
    );

    return (
        <div ref={container} className="h-screen flex items-center ">
            <img src="/api/image-proxy?url=https://static.wetab.link/user-custom-icon/zh/642fb15699615689d6ea0864/user-custom-icon1gu93n7g525pctcmyvrkkx9q1yh.png" alt="avatar" />
        </div>
    );
}
