import gol = require("classes/Rect");

export class Cell {
    public static CellSize: number = 6;
    public isAlive: boolean = false;
    public survives: boolean = false;
    public element: JQuery;
    public lastClass: string;
    public stateChanged: boolean = true;
    public rect: gol.Rect;
    public lives: number = 0;

    constructor(private context: CanvasRenderingContext2D, public x: number, public y: number) {
        this.rect = new gol.Rect(
            this.x * Cell.CellSize + 3,
            this.y * Cell.CellSize + 3,
            Cell.CellSize - 1,
            Cell.CellSize - 1);
    }

    moveToNextGeneration() {
        this.stateChanged = this.isAlive !== this.survives;
        this.isAlive = this.survives;
        this.lives = this.isAlive ? 1 : 0;
    }

    render() {
        if (!this.stateChanged) {
            return;
        }

        this.context.fillStyle = this.isAlive ? "#86fc00" : "#122400";
        this.context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

        this.stateChanged = false;
    }

    toggleLife() {
        this.isAlive = !this.isAlive;
        this.survives = !this.survives;
        this.lives = this.isAlive ? 1 : 0;
        this.stateChanged = true;
        this.render();
    }
}

 