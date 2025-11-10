//持久化的store
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { storeUtils } from "./help";

type PersistStore = {};

type State = UseStore<PersistStore>;

export const usePersistStore = create<State, any>(
    persist(
        immer((set, _get) => {
            return {
                ...storeUtils(set),
            };
        }),
        {
            name: "crm-mobo-storage", // 存储中的项目名称，必须是唯一的
            storage: createJSONStorage(() => localStorage), //
        }
    )
);

export const setPersionData = usePersistStore.getState().setState;
export const getPersionData = <K extends keyof PersistStore>(key: K | K[]): Pick<PersistStore, K> & { value?: any } => {
    const state = usePersistStore.getState();
    if (!key || (Array.isArray(key) && key.length === 0)) return state as Pick<PersistStore, K>;
    const keys = Array.isArray(key) ? key : [key];
    const result = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
    }, {} as Pick<PersistStore, K>);
    if (keys.length === 1) {
        //@ts-ignore
        result.value = result[key];
    }
    return result;
};
