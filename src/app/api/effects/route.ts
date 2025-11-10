import { JSONSERVER_URL } from "@/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${JSONSERVER_URL}/effects`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const effects = await res.json();

        return NextResponse.json(effects);
    } catch (error) {
        console.error("获取特效数据失败:", error);
        return NextResponse.json([], { status: 500 });
    }
}
