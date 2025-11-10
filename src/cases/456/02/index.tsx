"use client";
import { useBoolean } from "ahooks";
import React from "react";

interface FullScreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 dark:bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-auto">
                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="关闭弹窗"
                >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* 内容区域 */}
                <div className="pt-16 px-6 pb-6">{children}</div>
            </div>
        </div>
    );
};

// 使用示例组件
const ModalDemo: React.FC = () => {
    const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
            <button
                onClick={openModal}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg shadow-md transition-colors duration-200 font-medium"
            >
                打开全屏弹窗
            </button>

            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">弹窗标题</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">这是一个全屏弹窗示例内容。你可以在这里放置任何需要展示的内容， 包括表单、图片、文字等。</p>
                    <p className="text-gray-600 dark:text-gray-300">弹窗支持暗黑模式，并且在不同屏幕尺寸下都能保持良好的显示效果。</p>
                </div>
            </FullScreenModal>
        </div>
    );
};

export default ModalDemo;
