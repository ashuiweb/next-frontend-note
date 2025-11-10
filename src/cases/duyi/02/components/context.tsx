"use client";
import { createContext, ReactNode, useContext } from "react";
import Hello from "./Hello";

// 创建一个 Context 用于存储全局组件
const ComponentsContext = createContext({} as { hello: typeof Hello });

// 自定义 Provider，将组件注入 Context
export const ComponentsProvider = ({ children }: { children: ReactNode }) => {
    const components = {
        hello: Hello, // 小写 'hello' 对应 JSX 中的 <hello/>
    };

    return <ComponentsContext.Provider value={components}>{children}</ComponentsContext.Provider>;
};

export const useComponents = () => {
    const components = useContext(ComponentsContext);
    return components;
};

// 高阶组件，用于自动解析小写标签
export const withComponents = (Component: any) => {
    return (props: any) => {
        const components = useComponents();
        return <Component {...props} components={components} />;
    };
};
