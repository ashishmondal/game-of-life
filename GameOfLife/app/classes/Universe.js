define(["require", "exports", "./Cell"], function (require, exports, Cell_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Universe {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.cells = [];
            this.keepRunning = false;
            this.speed = 5;
            /* tslint:disable:no-bitwise */
            this.columns = (width / Cell_1.Cell.CellSize) | 0;
            this.rows = (height / Cell_1.Cell.CellSize) | 0;
            $("#universe").attr({
                width: width,
                height: height
            });
            this.context = ($("#universe")[0]).getContext("2d");
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.columns; x++) {
                    this.cells.push(new Cell_1.Cell(this.context, x, y));
                }
            }
            $("#universe").click((eo) => {
                var cell = this.cells.find(c => c.rect.contains(eo.pageX, eo.pageY));
                if (cell) {
                    cell.toggleLife();
                }
            });
            $("pre").hide();
            this.render();
        }
        evolve() {
            var i = 0;
            var length = this.cells.length;
            for (i = 0; i < length; i++) {
                var c = this.cells[i];
                var x = c.x, y = c.y;
                var cc = this.columns;
                var rc = this.rows;
                var neighborCount = this.cells[(((y - 1 + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives +
                    this.cells[(((y - 1 + rc) % rc) * cc) + ((x + cc) % cc)].lives +
                    this.cells[(((y - 1 + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives +
                    this.cells[(((y + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives +
                    this.cells[(((y + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives +
                    this.cells[(((y + 1 + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives +
                    this.cells[(((y + 1 + rc) % rc) * cc) + ((x + cc) % cc)].lives +
                    this.cells[(((y + 1 + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives;
                if (c.isAlive) {
                    c.survives = neighborCount === 2 || neighborCount === 3;
                }
                else {
                    c.survives = neighborCount === 3;
                }
            }
            for (i = 0; i < length; i++) {
                this.cells[i].moveToNextGeneration();
            }
        }
        render() {
            this.cells.forEach(c => c.render());
        }
        run() {
            if (this.keepRunning) {
                var d1 = new Date().getTime();
                this.evolve();
                this.render();
                var d2 = new Date().getTime();
                var fps = 1000 / (d2 - d1);
                $("#fps").html(fps.toFixed(3));
                setTimeout(() => this.run(), 1000 - (this.speed * 100));
            }
        }
        setSpeed(s) {
            this.speed = s;
            $("#speed").html("" + this.speed);
        }
        incSpeed() {
            this.setSpeed(Math.min(this.speed + 1, 10));
        }
        decSpeed() {
            this.setSpeed(Math.max(this.speed - 1, 0));
        }
        stop() {
            this.keepRunning = false;
        }
        toggleState() {
            if (this.keepRunning) {
                this.stop();
            }
            else {
                this.keepRunning = true;
                this.run();
            }
            $("#status").html(this.keepRunning ? "Running" : "Stopped");
        }
    }
    exports.Universe = Universe;
});
//# sourceMappingURL=Universe.js.map