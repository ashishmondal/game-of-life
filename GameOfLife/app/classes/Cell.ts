export class Cell {
    public static CellSize: number = 10;
    public isAlive: boolean = false;
    public survives: boolean = false;
    public element: JQuery;
    public lastClass: string;

    constructor(private parent: JQuery, public x: number, public y: number) {
        this.element = $(document.createElement("div"))
            .css({
            left: this.x * Cell.CellSize + 2.5,
            top: this.y * Cell.CellSize + 2.5,
            width: Cell.CellSize - 1,
            height: Cell.CellSize - 1,
            position: "absolute"
        }).attr("class", "dead");

        this.element.click(() => this.toggleLife());

        parent.append(this.element);
    }

    moveToNextGeneration() {
        this.isAlive = this.survives;
    }

    render() {
        var newClass = this.isAlive ? "alive" : "dead";

        if (newClass !== this.lastClass) {
            this.element.attr("class", newClass);
            this.lastClass = newClass;
        }
    }

    toggleLife() {
        this.isAlive = !this.isAlive;
        this.survives = !this.survives;
        this.render();
    }
}

 