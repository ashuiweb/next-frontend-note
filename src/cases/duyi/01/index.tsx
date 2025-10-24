"use client";

class MyVideo {
    constructor() {
        console.log("new MyVideo");
    }
}

function sington(className: any) {
    let ins: any = null;
    const proxy = new Proxy(className, {
        construct(target, args) {
            if (!ins) {
                ins = Reflect.construct(target, args);
            }
            return ins;
        },
    });
    proxy.prototype.constructor = proxy;
    return proxy;
}

const MySingleVideo = sington(MyVideo);

const s1 = new MySingleVideo();
const s2 = new MySingleVideo();

console.log(s1 === s2);

export default function Main() {
    return <div>index2</div>;
}
