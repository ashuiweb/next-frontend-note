import { Group } from "../Group";
import { Point } from "../types";

export class TShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
            ],
            _centerPoint,
            _color
        );
    }
}

export class LShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: -2, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
            ],
            _centerPoint,
            _color
        );
    }

    rotate(): void {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class LMShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
            ],
            _centerPoint,
            _color
        );
    }
    rotate(): void {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 1 },
            ],
            _centerPoint,
            _color
        );
    }
    rotate(): void {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SMShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
            ],
            _centerPoint,
            _color
        );
    }
    rotate(): void {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class OShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
            ],
            _centerPoint,
            _color
        );
    }
    afterRotateShape() {
        return this.shape;
    }
}

export class IShape extends Group {
    constructor(_centerPoint: Point, _color: string) {
        super(
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
            ],
            _centerPoint,
            _color
        );
    }
    rotate(): void {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
