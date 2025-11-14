"use client";

import { useMemo, useState } from "react";

function A() {}

export default function Main() {
    // 原始数据
    const [originData] = useState(
        Array(10)
            .fill("")
            .map((_, index) => ({
                id: index + 1,
                name: `item${index + 1}`,
            }))
    );
    // 输入框数据
    const [value, setValue] = useState("");
    // 帅选出来的数据
    const filterData = useMemo(() => {
        return originData.filter((item) => item.name.includes(value));
    }, [originData, value]);

    // pop shift push unshift  slice splice flat join  reverse

    // filter forEach map sort includes  [1,2,3].incudes(3)

    return (
        <div className="h-screen bg-slate-600 flex justify-center items-center">
            <div>
                <input
                    value={value}
                    onInput={(e: any) => {
                        setValue(e.target.value);
                    }}
                    className="border rounded-sm p-2 w-[40vw]"
                />
                <div className="bg-white">
                    <ul className="px-2 space-y-2">
                        {filterData.map((it) => (
                            <li key={it.id}>{it.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
