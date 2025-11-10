import { JSONSERVER_URL } from "@/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${JSONSERVER_URL}/tags`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const tags = await res.json();

        return NextResponse.json(tags);
    } catch (error) {
        console.error("获取标签数据失败:", error);
        return NextResponse.json([], { status: 500 });
    }
}
