import { immer } from "zustand/middleware/immer";

import { ReactNode } from "react";
import { create } from "zustand";
import { storeUtils } from "./help";

export type GlobalState = {
    detailCode?: string;
    fullScreenSideDrawerOpen?: boolean;
    fullScreenSideDrawerChildren?: ReactNode;
};

type State = UseStore<GlobalState>;

export const useGlobalState = create<State, any>(
    immer((set, _get) => {
        return {
            ...storeUtils(set),
        };
    })
);

export const setGlobalData = useGlobalState.getState().setState;
export function getGlobalData<K extends keyof GlobalState>(key: K): GlobalState[K];
export function getGlobalData<K extends keyof GlobalState>(keys: K[]): Pick<GlobalState, K>;
export function getGlobalData<K extends keyof GlobalState>(keyOrKeys: K | K[]): GlobalState[K] | Pick<GlobalState, K> {
    const state = useGlobalState.getState();
    if (Array.isArray(keyOrKeys)) {
        // 多个 key，返回对象
        return keyOrKeys.reduce((acc, key) => {
            acc[key] = state[key];
            return acc;
        }, {} as Pick<GlobalState, K>);
    }

    // 单个 key，直接返回值
    return state[keyOrKeys];
}
