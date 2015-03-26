define(["require", "exports", "classes/Rect"], function (require, exports, gol) {
    var Cell = (function () {
        function Cell(context, x, y) {
            this.context = context;
            this.x = x;
            this.y = y;
            this.isAlive = false;
            this.survives = false;
            this.stateChanged = true;
            this.rect = new gol.Rect(this.x * Cell.CellSize + 3, this.y * Cell.CellSize + 3, Cell.CellSize - 1, Cell.CellSize - 1);
        }
        Cell.prototype.moveToNextGeneration = function () {
            this.stateChanged = this.isAlive !== this.survives;
            this.isAlive = this.survives;
        };
        Cell.prototype.render = function () {
            if (!this.stateChanged) {
                return;
            }
            this.context.fillStyle = this.isAlive ? "#86fc00" : "#122400";
            this.context.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
            this.stateChanged = false;
        };
        Cell.prototype.toggleLife = function () {
            this.isAlive = !this.isAlive;
            this.survives = !this.survives;
            this.stateChanged = true;
            this.render();
        };
        Cell.CellSize = 6;
        return Cell;
    })();
    exports.Cell = Cell;
});
//# sourceMappingURL=Cell.js.map