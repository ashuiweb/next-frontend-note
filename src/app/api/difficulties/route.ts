import { JSONSERVER_URL } from "@/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${JSONSERVER_URL}/difficulties`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const difficulties = await res.json();

        return NextResponse.json(difficulties);
    } catch (error) {
        console.error("获取难度数据失败:", error);
        return NextResponse.json([], { status: 500 });
    }
}
