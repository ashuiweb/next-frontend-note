import $ from "jquery";
import { Square } from "../Square";
import { IViewer } from "../types";
import { DomViewerConfig } from "./config";
export class DOMViewer implements IViewer {
    private dom?: JQuery<HTMLElement>;
    private isRemove: boolean = false;
    constructor(private square: Square, private container: JQuery<HTMLElement>) {}
    show(): void {
        if (this.isRemove) return;
        if (!this.dom) {
            this.dom = $("<div>")
                .css({
                    position: "absolute",
                    ...DomViewerConfig.SquareSize,
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                })
                .appendTo(this.container);
        }
        this.dom.css({
            left: this.square.point.x * DomViewerConfig.SquareSize.width,
            top: this.square.point.y * DomViewerConfig.SquareSize.height,
            backgroundColor: this.square.color,
        });
    }
    remove(): void {
        if (this.dom && !this.isRemove) {
            this.isRemove = true;
            this.dom.remove();
        }
    }
}
