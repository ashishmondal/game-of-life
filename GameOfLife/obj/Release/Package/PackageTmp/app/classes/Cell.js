define(["require", "exports"], function (require, exports) {
    var Cell = (function () {
        function Cell(parent, x, y) {
            var _this = this;
            this.parent = parent;
            this.x = x;
            this.y = y;
            this.isAlive = false;
            this.survives = false;
            this.element = $(document.createElement("div")).css({
                left: this.x * Cell.CellSize + 2.5,
                top: this.y * Cell.CellSize + 2.5,
                width: Cell.CellSize - 1,
                height: Cell.CellSize - 1,
                position: "absolute"
            }).attr("class", "dead");
            this.element.click(function () { return _this.toggleLife(); });
            parent.append(this.element);
        }
        Cell.prototype.moveToNextGeneration = function () {
            this.isAlive = this.survives;
        };
        Cell.prototype.render = function () {
            var newClass = this.isAlive ? "alive" : "dead";
            if (newClass !== this.lastClass) {
                this.element.attr("class", newClass);
                this.lastClass = newClass;
            }
        };
        Cell.prototype.toggleLife = function () {
            this.isAlive = !this.isAlive;
            this.survives = !this.survives;
            this.render();
        };
        Cell.CellSize = 10;
        return Cell;
    })();
    exports.Cell = Cell;
});
//# sourceMappingURL=Cell.js.map