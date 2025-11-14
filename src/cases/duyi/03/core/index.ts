import $ from "jquery";
import { Game } from "./Game";
import { Square } from "./Square";
import { Direction, DirectionBig } from "./types";
import { DOMViewer } from "./viewer/DomViewer";
import { GameDomViewer } from "./viewer/GameDomViewer";

export function main1() {
    const sq = new Square({ x: 0, y: 0 }, "red");

    sq.viewer = new DOMViewer(sq, $("#root"));
    sq.viewer.show();
    sq.point = { x: 2, y: 2 };

    $("#moveDown").click(() => {
        sq.point = { x: sq.point.x, y: sq.point.y + 1 };
    });

    $("#remove").click(() => {
        sq.viewer?.remove();
        sq.viewer = null; //垃圾回收
    });

    $("#add").click(() => {
        if (!sq.viewer) sq.viewer = new DOMViewer(sq, $("#root"));
    });
}

export function main() {
    const game = new Game(new GameDomViewer($("#main"), $("#right")));

    $("#pause").click(() => {
        game.pause();
    });
    $("#start").click(() => {
        game.start();
    });
    $("#moveLeft").click(() => {
        game.control(Direction.Left);
    });
    $("#moveRight").click(() => {
        game.control(Direction.Right);
    });
    $("#moveDownDirectly").click(() => {
        game.control(DirectionBig.Down);
    });
    $("#rotate").click(() => {
        game.control("rotate");
    });
}
