import { JSONSERVER_URL } from "@/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${JSONSERVER_URL}/categories`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const categories = await res.json();

        return NextResponse.json(categories);
    } catch (error) {
        console.error("获取分类数据失败:", error);
        return NextResponse.json([], { status: 500 });
    }
}
