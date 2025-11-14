import { Square } from "./Square";
import { Point, Shape } from "./types";

export class Group {
    private _squares: readonly Square[] = [];
    public get squares() {
        return this._squares;
    }

    public get centerPoint() {
        return this._centerPoint;
    }

    public get shape() {
        return this._shape;
    }

    public set centerPoint(v: Point) {
        this._centerPoint = v;
        this.draw();
    }

    public draw() {
        this._shape.map((point, index) => {
            this._squares[index].point = {
                x: point.x + this._centerPoint.x,
                y: point.y + this._centerPoint.y,
            };
        });
    }

    constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
        this._squares = this._shape.map((point) => {
            return new Square(
                {
                    x: point.x + this._centerPoint.x,
                    y: point.y + this._centerPoint.y,
                },
                this._color
            );
        });
    }

    protected isClock = true; //顺时针旋转

    afterRotateShape(): Shape {
        //规律 如果是顺时针 坐标变化  x,y => -y,x
        if (this.isClock) {
            return this._shape.map((point) => {
                return {
                    x: -point.y,
                    y: point.x,
                };
            });
        }
        return this._shape.map((point) => {
            return {
                x: point.y,
                y: -point.x,
            };
        });
    }

    rotate() {
        this._shape = this.afterRotateShape();
        this.draw();
    }
}
