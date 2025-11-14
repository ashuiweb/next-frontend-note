import { Game } from "./Game";
import { Group } from "./Group";

export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface IViewer {
    /**
     * 显示
     */
    show(): void;
    /**
     * 移除
     */
    remove(): void;
}

/**
 * 形状
 */
export type Shape = Point[];

export enum Direction {
    Down,
    Left,
    Right,
}
export enum DirectionBig {
    Down,
}

export enum GameStatus {
    init,
    playing,
    pause,
    over,
}

export interface GameViewer {
    /**
     * 显示下一个方块
     * @param group 下一个方块
     */
    showNext(group: Group): void;
    /**
     * 切换方块
     * @param group 切换的方块
     */
    switchGroup(group: Group): void;

    init(game: Game): void;

    showScore?: (value: number) => void;
}
