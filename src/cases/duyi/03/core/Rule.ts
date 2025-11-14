import { GameConfig } from "./constant/config";
import { Group } from "./Group";
import { Square } from "./Square";
import { Direction, Point, Shape } from "./types";

/**
 * 提供一系列函数，用于逻辑判断
 */
export class Rule {
    static canIMove(shape: Shape, targetPoint: Point, existSquares: Square[]) {
        const targetPoints = shape.map((point, index) => ({
            x: point.x + targetPoint.x,
            y: point.y + targetPoint.y,
        }));
        //边界判断
        const isInArea = targetPoints.every((point) => {
            return point.x >= 0 && point.x < GameConfig.panelSize.width && point.y >= 0 && point.y < GameConfig.panelSize.height;
        });
        if (!isInArea) return false;
        //根据已存在的方块判断是否重叠
        const isExist = targetPoints.some((point) => existSquares.some((square) => square.point.x === point.x && square.point.y === point.y));
        if (isExist) return false;

        return true;
    }

    static moveTo(group: Group, targetPoint: Point, existSquares: Square[]): boolean {
        if (this.canIMove(group.shape, targetPoint, existSquares)) {
            group.centerPoint = targetPoint;
            return true;
        }
        return false;
    }

    static move(group: Group, direction: Direction = Direction.Down, existSquares: Square[]): boolean {
        switch (direction) {
            case Direction.Down:
                return this.moveTo(group, { x: group.centerPoint.x, y: group.centerPoint.y + 1 }, existSquares);
            case Direction.Left:
                return this.moveTo(group, { x: group.centerPoint.x - 1, y: group.centerPoint.y }, existSquares);
            case Direction.Right:
                return this.moveTo(group, { x: group.centerPoint.x + 1, y: group.centerPoint.y }, existSquares);
        }
        return false;
    }

    //朝着目标位置一直移动到不能移动为止
    static moveDirectly(group: Group, direction: Direction, existSquares: Square[]) {
        while (true) {
            if (!this.move(group, direction, existSquares)) {
                return false;
            }
        }
    }

    static rotate(group: Group, existSquares: Square[]) {
        const shape = group.afterRotateShape();
        if (this.canIMove(shape, group.centerPoint, existSquares)) {
            group.rotate();
            return true;
        }
        return false;
    }

    /**
     * 根据y坐标得到所有Y坐标为此值的方块
     * @param existSquares
     * @param y
     */
    static getLineSquare(existSquares: Square[], y: number) {
        return existSquares.filter((it) => it.point.y === y);
    }

    static deleteSquares(existSquares: Square[], callback: (square: Square) => void): number {
        //1. 获得Y坐标的数组
        const ys = existSquares.map((it) => it.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        //2. 循环判断
        let count = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(existSquares, y, callback)) {
                count += 1;
            }
        }

        return count;
    }

    private static deleteLine(existSquares: Square[], y: number, callback: (square: Square) => void): boolean {
        // 得到这一行的所有方块
        let result = false;
        const squares = this.getLineSquare(existSquares, y);
        if (squares.length === GameConfig.panelSize.width) {
            squares.forEach((it) => {
                if (it.viewer) {
                    it.viewer.remove();
                }
                it.viewer = null;
                // 剩下的y坐标比当前y坐标小的，都要+1
                existSquares
                    .filter((square) => square.point.y < y)
                    .forEach((square) => {
                        square.point = {
                            ...square.point,
                            y: square.point.y + 1,
                        };
                    });
                callback(it);
            });
            result = true;
        }
        return result;
    }
}
