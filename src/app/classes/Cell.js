define(["require", "exports", "./Rect"], function (require, exports, Rect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Cell {
        constructor(context, x, y) {
            this.context = context;
            this.x = x;
            this.y = y;
            this.isAlive = false;
            this.survives = false;
            this.stateChanged = true;
            this.lives = 0;
            this.rect = new Rect_1.Rect(this.x * Cell.CellSize + 3, this.y * Cell.CellSize + 3, Cell.CellSize - 1, Cell.CellSize - 1);
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
    Cell.CellSize = 6;
    exports.Cell = Cell;
});
//# sourceMappingURL=Cell.js.map