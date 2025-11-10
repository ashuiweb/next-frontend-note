"use client";

import { useKeyPress } from "ahooks";
import { useRouter } from "next/navigation";

export default function Client() {
    const router = useRouter();
    useKeyPress("esc", () => {
        router.back();
    });
    return null;
}
