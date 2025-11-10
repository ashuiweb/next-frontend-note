"use client";
import * as ahooks from "ahooks";
import dayjs from "dayjs";
import React from "react";

function A() {
    const update = ahooks.useUpdate();
    React.useEffect(() => {
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);
    return <div>{dayjs().format("YYYY-MM-DD HH:mm:ss")}</div>;
}
ahooks.useMemoizedFn;
export default function Main() {
    return (
        <div className="text-3xl text-red-600 bg-purple-400">
            <A />
        </div>
    );
}
