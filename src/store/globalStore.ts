import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from 'zustand/middleware';

import { ReactNode } from "react";
import { create } from "zustand";
import { storeUtils } from "./help";

export type GlobalState = {
    detailCode?: string;
    fullScreenSideDrawerOpen?: boolean;
    fullScreenSideDrawerChildren?: ReactNode;
    setDetailCode?: (code: string) => void;
};

type State = UseStore<GlobalState>;

export const useGlobalState = create<State>()(
  persist(
    immer((set, _get) => {
        return {
            ...storeUtils(set),
            // 设置默认值
            detailCode: '',
            fullScreenSideDrawerOpen: false,
            // 添加设置方法
            setDetailCode: (code: string) => set({ detailCode: code }),
        };
    }),
    {
      name: 'ashui-gsap-storage', // 存储的唯一key
      storage: createJSONStorage(() => localStorage),
      // 只持久化部分状态
      partialize: (state) => ({ 
        detailCode: state.detailCode,
        fullScreenSideDrawerOpen: state.fullScreenSideDrawerOpen 
      }),
    }
  )
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
