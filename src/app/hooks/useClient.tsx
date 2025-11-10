"use client";
import { useRouter } from "next/navigation";

export default function useClient() {
    const router = useRouter();
    return {
        to: (href: string) => {
            router.push(href);
        },
    };
}
