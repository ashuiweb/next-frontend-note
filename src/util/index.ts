export function calculateAspectRatio(width: number, height: number) {
    // 计算最大公约数 (GCD) 使用辗转相除法
    function gcd(a: number, b: number): number {
        return b === 0 ? a : gcd(b, a % b);
    }

    // 计算 GCD
    const divisor = gcd(width, height);

    // 简化分数
    const simplifiedWidth = width / divisor;
    const simplifiedHeight = height / divisor;

    // 返回宽高比字符串
    return `${simplifiedWidth}/${simplifiedHeight}`;
}
function removeImportStatements(code: string) {
    // 匹配所有 import 语句，包括各种格式
    return code.replace(/import\s+(?:(?:\w+|\*|\{[^}]*\})(?:\s+as\s+\w+)?\s+from\s+)?['"][^'"]+['"];?\s*/g, "").replace(/^\s*[\r\n]/gm, ""); // 清理空行
}

export function removeExportsPrecise(code: string) {
    return removeImportStatements(code.replace(/export\s+(?:default\s+)?/g, ""));
}
