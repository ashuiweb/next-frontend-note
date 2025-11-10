import $ from "jquery";
import { Square } from "./Square";
import { DOMViewer } from "./viewer/DomViewer";
export function main() {
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
