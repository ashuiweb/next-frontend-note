"use client";
import { debounce } from "es-toolkit";
import React, { useEffect, useRef, useState } from "react";
import ActivityCalendar, { Activity } from "react-activity-calendar";

// 定义特效项目类型
interface EffectItem {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
    previewUrl: string;
    author: string;
    likes: number;
    createTime: string;
}

interface ContributionChartProps {
    darkMode: boolean;
    effects: EffectItem[];
}

const ContributionChart: React.FC<ContributionChartProps> = ({ darkMode, effects }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [blockSize, setBlockSize] = useState(12);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        content: string;
        x: number;
        y: number;
    }>({ visible: false, content: "", x: 0, y: 0 });

    // 计算格子大小（带防抖）
    const updateBlockSize = debounce(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const weeksInYear = 53;
            const calculatedBlockSize = Math.floor(containerWidth / weeksInYear);
            setBlockSize(Math.max(Math.min(calculatedBlockSize, 16), 8));
        }
    }, 100);

    // 监听窗口大小变化
    useEffect(() => {
        updateBlockSize();
        window.addEventListener("resize", updateBlockSize);
        return () => {
            window.removeEventListener("resize", updateBlockSize);
            updateBlockSize.cancel();
        };
    }, []);

    // 获取最近12个月的起始和结束日期
    const getLast12MonthsRange = () => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        return { startDate, endDate };
    };

    // 获取指定年份的起始和结束日期
    const getYearRange = (year: number) => {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        return { startDate, endDate };
    };

    // 生成日期数组
    const generateDateRange = (startDate: Date, endDate: Date): string[] => {
        const dates: string[] = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split("T")[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    // 生成基于特效数据的贡献数据
    const generateActivityData = (): Activity[] => {
        const dateMap: { [key: string]: number } = {};
        let startDate: Date, endDate: Date;

        if (selectedYear === new Date().getFullYear()) {
            ({ startDate, endDate } = getLast12MonthsRange());
        } else {
            ({ startDate, endDate } = getYearRange(selectedYear));
        }

        const dateRange = generateDateRange(startDate, endDate);
        dateRange.forEach((date) => {
            dateMap[date] = 0;
        });

        effects.forEach((effect) => {
            const datePart = effect.createTime?.split(" ")[0];
            if (datePart) {
                const effectDate = new Date(datePart);
                if (effectDate >= startDate && effectDate <= endDate && effectDate.getFullYear() === selectedYear) {
                    dateMap[datePart] = (dateMap[datePart] || 0) + 1;
                }
            }
        });

        return dateRange.map((date) => ({
            date,
            count: dateMap[date],
            level: Math.min(dateMap[date], 4),
        }));
    };

    const activityData = generateActivityData();

    // 获取所有可用年份
    const getAvailableYears = (): number[] => {
        const yearsSet = new Set<number>();
        yearsSet.add(new Date().getFullYear());
        effects.forEach((effect) => {
            if (effect.createTime) {
                const datePart = effect.createTime.split(" ")[0];
                const year = new Date(datePart).getFullYear();
                yearsSet.add(year);
            }
        });
        return Array.from(yearsSet).sort((a, b) => b - a);
    };

    const availableYears = getAvailableYears();

    // 处理鼠标悬停事件
    const handleMouseEnter = (event: React.MouseEvent<SVGRectElement>, activity: Activity) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            content: activity.count > 0 ? `${activity.count} 次贡献在 ${activity.date}` : `无贡献 在 ${activity.date}`,
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, content: "", x: 0, y: 0 });
    };

    return (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold">贡献度图表</h3>
                <div className="flex items-center space-x-2">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}年
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div ref={containerRef} style={{ width: "100%", overflowX: "auto", position: "relative" }}>
                <ActivityCalendar
                    data={activityData}
                    blockSize={blockSize}
                    blockMargin={4}
                    blockRadius={2}
                    fontSize={14}
                    theme={
                        darkMode
                            ? {
                                  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                              }
                            : {
                                  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                                  dark: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                              }
                    }
                    labels={{
                        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                        weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        totalCount: "今年 {{count}} 次贡献",
                        legend: {
                            less: "较少",
                            more: "较多",
                        },
                    }}
                    renderBlock={(block, activity) =>
                        React.cloneElement(block, {
                            onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => handleMouseEnter(e, activity),
                            onMouseLeave: handleMouseLeave,
                            style: { cursor: "pointer" }, // 添加指针样式以提示可交互
                        })
                    }
                />
                {tooltip.visible && (
                    <div
                        style={{
                            position: "fixed",
                            top: tooltip.y,
                            left: tooltip.x,
                            transform: "translate(-50%, -100%)",
                            backgroundColor: darkMode ? "#1f2a44" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            fontSize: "12px",
                            fontFamily: "'PingFang SC', 'Helvetica Neue', Arial, sans-serif",
                            pointerEvents: "none",
                            zIndex: 1000,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {tooltip.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContributionChart;
