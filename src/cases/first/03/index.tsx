"use client";
import * as ahooks from "ahooks";
import s from "./index.module.scss";
ahooks.useMemoizedFn;
export default function Main() {
    return (
        <div className={s.Main}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 relative cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="font-bold text-lg">企业版软件采购</h3>
                            <p className="text-sm text-gray-500">科技有限公司</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-blue-600">¥158,000</p>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">方案评估报价</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">价格谈判不占优势</span>
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">决策周期长</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-3">
                        <p className="flex items-start">
                            <i className="fa-solid fa-sticky-note text-gray-400 mt-0.5 mr-2 flex-shrink-0"></i>客户对产品功能满意，但对价格有顾虑，已提供分阶段付款方案。
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-500">
                            <i className="fa-solid fa-calendar mr-1"></i>
                            <span>预计成交: 2025-09-15</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">60% 成交率</span>
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-xs text-blue-700 bg-blue-50 p-2 rounded-lg flex items-start">
                        <i className="fa-solid fa-lightbulb text-yellow-500 mt-0.5 mr-2 flex-shrink-0"></i>
                        <p>
                            <span className="font-medium">AI建议:</span> 建议下周安排产品演示，邀请技术团队参与解答疑问。
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex justify-between">
                    <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-blue-600 p-1">
                            <i className="fa-solid fa-phone"></i>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 p-1">
                            <i className="fa-solid fa-comment"></i>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 p-1">
                            <i className="fa-solid fa-sticky-note"></i>
                        </button>
                    </div>
                    <button className="text-gray-500 hover:text-blue-600 p-1 text-primay">123</button>
                </div>
            </div>
        </div>
    );
}
