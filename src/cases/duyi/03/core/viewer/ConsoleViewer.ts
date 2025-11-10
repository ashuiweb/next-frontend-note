import { Square } from "../Square";
import { IViewer } from "../types";

export class ConsoleViewer implements IViewer {
    constructor(private square: Square) {}
    public show(): void {
        console.log(this.square.point, this.square.color);
    }
    public remove(): void {
        console.log("remove");
    }
}
