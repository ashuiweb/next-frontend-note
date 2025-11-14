import { GameConfig } from "./constant/config";
import { Group } from "./Group";
import { Rule } from "./Rule";
import { Square } from "./Square";
import { Direction, DirectionBig, GameStatus, GameViewer } from "./types";
import { createGroup } from "./util/index";

export class Game {
    private _gameStatus: GameStatus = GameStatus.init;
    //当前方块
    private _curGroup?: Group;
    //下一个方块
    private _nextGroup: Group = createGroup({ x: 0, y: 0 });
    //定时器
    private _timer?: NodeJS.Timeout;
    //下落的间隔时间
    private _duration = 1000;
    //当前游戏中 存在的小方块
    private _existSquares: Square[] = [];
    //分数
    private _score: number = 0;

    public get score() {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
        this._viewer.showScore?.(value);
    }

    constructor(private _viewer: GameViewer) {
        this.showNext();
        this.start();
        this._viewer.init(this);
        this._viewer.showScore?.(this._score);
        this._existSquares = [];
    }

    private showNext() {
        this._viewer.showNext(this.resetCenterPoint(GameConfig.rightSize.width, this._nextGroup));
    }

    //切换方块
    private switchGroup() {
        this._curGroup = this._nextGroup;
        this._nextGroup = createGroup({ x: 0, y: 0 });
        this._viewer.switchGroup(this.resetCenterPoint(GameConfig.panelSize.width, this._curGroup));
        this.showNext();
    }

    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return;
        this._timer = setInterval(() => {
            if (this._curGroup) {
                if (!Rule.move(this._curGroup, Direction.Down, this._existSquares)) {
                    //触底
                    this.hitBottom();
                }
            }
        }, this._duration);
    }

    start() {
        if (this._gameStatus !== GameStatus.playing) {
            this._gameStatus = GameStatus.playing;
        }
        if (!this._curGroup) {
            this.switchGroup();
        }
        this.autoDrop();
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = void 0;
        }
    }

    control(dir: Direction | DirectionBig | "rotate") {
        if (this._gameStatus !== GameStatus.playing || !this._curGroup) return;
        if (dir === DirectionBig.Down) {
            if (!Rule.moveDirectly(this._curGroup, Direction.Down, this._existSquares)) {
                this.hitBottom();
            }
        }
        if (dir === "rotate") {
            Rule.rotate(this._curGroup, this._existSquares);
        } else Rule.move(this._curGroup!, dir as Direction, this._existSquares);
    }

    private resetCenterPoint(width: number, group: Group) {
        const x = width / 2 - 1;
        const y = 0;
        group.centerPoint = { x, y };
        while (group.squares.some((it) => it.point.y < 0)) {
            group.squares.forEach((it) => {
                it.point = {
                    ...it.point,
                    y: it.point.y + 1,
                };
            });
        }
        return group;
    }

    //触底
    private hitBottom() {
        //保存当前小方块
        this._existSquares.push(...this._curGroup!.squares);
        //处理移除
        const num = Rule.deleteSquares(this._existSquares, (it) => {
            const index = this._existSquares.findIndex((q) => q === it);
            if (index > -1) {
                this._existSquares.splice(index, 1);
            }
        });
        this.addScore(num);
        this.switchGroup();
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) return;
        else if (lineNum === 1) {
            this.score += 10;
        } else if (lineNum === 2) {
            this.score += 25;
        } else if (lineNum === 3) {
            this.score += 50;
        } else {
            this.score += 100;
        }
    }
}
