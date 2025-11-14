import $ from "jquery";
import { DomViewerConfig, GameConfig } from "../constant/config";
import { Game } from "../Game";
import { Group } from "../Group";
import { Direction, GameViewer } from "../types";
import { playgroundSize } from "../util";
import { DOMViewer } from "./DomViewer";
const leftKey = [37, 65];
const rightKey = [39, 68];
const downKey = [40, 83];
const rotateKey = [32];

const initPanel = () => {
    const mainSize = playgroundSize(GameConfig.panelSize, DomViewerConfig.SquareSize);
    $("#main").css({
        ...mainSize,
    });
    const rightSize = playgroundSize(GameConfig.rightSize, DomViewerConfig.SquareSize);
    $("#right").css({
        ...rightSize,
    });
};
export class GameDomViewer implements GameViewer {
    private scoreDom = $("#score");
    constructor(private mainContainer: JQuery<HTMLElement>, private rightContainer: JQuery<HTMLElement>) {}
    showNext(group: Group): void {
        group.squares.forEach((sq) => {
            sq.viewer = new DOMViewer(sq, this.rightContainer);
        });
    }
    switchGroup(group: Group): void {
        group.squares.forEach((sq) => {
            sq.viewer?.remove();
            sq.viewer = new DOMViewer(sq, this.mainContainer);
        });
    }
    init(game: Game) {
        //设置界面宽高
        initPanel();
        //注册键盘事件
        $(document).keydown((e) => {
            const keyCode = e.keyCode;
            if (leftKey.includes(keyCode)) {
                game.control(Direction.Left);
            }
            if (rightKey.includes(keyCode)) {
                game.control(Direction.Right);
            }
            if (downKey.includes(keyCode)) {
                game.control(Direction.Down);
            }
            if (rotateKey.includes(keyCode)) {
                game.control("rotate");
            }
        });
    }
    showScore(score: number) {
        this.scoreDom.html(score.toString());
    }
}
