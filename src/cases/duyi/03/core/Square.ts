/**
 * 小方块
 */

import { IViewer, Point } from "./types";

export class Square {
    private _viewer: IViewer | null = null;
    constructor(private _point?: Point, private _color?: string) {}

    public get viewer(): IViewer | null {
        return this._viewer;
    }

    public set viewer(value: IViewer | null) {
        this._viewer = value;
        if (this._viewer) {
            this._viewer.show();
        }
    }

    public get point() {
        return this._point || { x: 0, y: 0 };
    }
    public set point(value: Point) {
        this._point = value;
        this.viewer?.show();
    }

    public get color() {
        return this._color || "#000";
    }
    public set color(value: string) {
        this._color = value;
        this.viewer?.show();
    }
}
