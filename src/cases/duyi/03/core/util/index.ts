import * as Shapes from "../constant/shape";
import { Group } from "../Group";
import { Point } from "../types";

const allShapes = Object.values(Shapes);

export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 随机产生一个俄罗斯方块
 */

export function createTeris(centerPoint: Point): Group {
    const randomIndex = getRandom(0, allShapes.length);

    const randomShape = allShapes[randomIndex];
    // const randomShape = Shapes.OShape;
    const group = new randomShape(centerPoint, "red");
    return group;
}

export const createGroup = createTeris;

// 根据panelSize来生成画布大小
export function playgroundSize(panelSize: { width: number; height: number }, squareSize: { width: number; height: number }) {
    const { width, height } = panelSize;
    return {
        width: width * squareSize.width,
        height: height * squareSize.height,
    };
}
