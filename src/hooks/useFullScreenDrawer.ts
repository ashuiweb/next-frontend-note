import { setGlobalData } from "@/store/globalStore";
import { ReactNode } from "react";

export default function useFullScreenDrawer() {
    return {
        open: setGlobalData({
            fullScreenSideDrawerOpen: true,
        }),
        close: setGlobalData({
            fullScreenSideDrawerOpen: false,
        }),
        setChildren(children: ReactNode) {
            setGlobalData({
                fullScreenSideDrawerChildren: children,
            });
        },
        drawer(children: ReactNode) {
            setGlobalData({
                fullScreenSideDrawerOpen: true,
                fullScreenSideDrawerChildren: children,
            });
        },
    };
}
