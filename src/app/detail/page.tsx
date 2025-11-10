"use server";
import MultiResizablePanels from "@/components/MultiResizablePanels";
import MarkdownRenderer from "@/components/MarkdownRenderer";

import { removeExportsPrecise } from "@/util";
import { readFile } from "fs/promises";
import { join } from "path";
import Coder from "./Coder";
import { setGlobalData } from "@/store/globalStore";

export default async function page({ searchParams }: { searchParams: { path: string } }) {
    const { path } = await searchParams;

    // 构建完整的文件路径
    const fullPath = join(process.cwd(), `src/${path}/index.tsx`);
    const readmePath = join(process.cwd(), `src/${path}/readme.md`);

    // 读取文件内容
    const fileContent = await readFile(fullPath, "utf-8");
    
    // 尝试读取 readme.md 文件
    let readmeContent = "";
    try {
        readmeContent = await readFile(readmePath, "utf-8");
    } catch (error) {
        readmeContent = "# 说明\n\n暂无说明文档";
    }

    const code = removeExportsPrecise(fileContent);
    
    // 设置初始代码到全局状态
    setGlobalData({ detailCode: code });

    // 构建 Preview 页面的 URL
    const previewUrl = `/preview`;

    return (
        <MultiResizablePanels 
            leftPanels={[
                <div className="w-full h-full">
                    <iframe 
                        src={previewUrl} 
                        className="w-full h-full border-none"
                        title="Preview"
                    />
                </div>, 
                <Coder value={code} />
            ]} 
            rightPanel={<MarkdownRenderer content={readmeContent} />} 
            defaultLeftWidth={60} 
            minLeftWidth={20} 
            maxLeftWidth={80} 
            defaultPanelHeights={[70, 30]}
            storageKey={`multi-resizable-panels-${path}`}
        />
    );
}
