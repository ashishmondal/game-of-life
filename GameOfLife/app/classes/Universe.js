define(["require", "exports", "classes/Cell"], function (require, exports, gol) {
    var Universe = (function () {
        function Universe(width, height) {
            this.width = width;
            this.height = height;
            this.cells = new Array();
            this.keepRunning = false;
            this.speed = 5;
            /* tslint:disable:no-bitwise */
            this.columns = (width / gol.Cell.CellSize) | 0;
            this.rows = (height / gol.Cell.CellSize) | 0;
            this.element = $("<div>");
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.columns; x++) {
                    this.cells.push(new gol.Cell(this.element, x, y));
                }
            }
            $("pre").hide();
            $("#universe").append(this.element);
        }
        Universe.prototype.evolve = function () {
            var _this = this;
            _.forEach(this.cells, function (c) {
                var neighborCount = 0;
                for (var row = -1; row <= 1; row++) {
                    for (var col = -1; col <= 1; col++) {
                        if (row === 0 && col === 0) {
                            continue;
                        }
                        var x = (c.x + col + _this.columns) % _this.columns;
                        var y = (c.y + row + _this.rows) % _this.rows;
                        var cell = _this.cells[y * _this.columns + x];
                        if (cell.isAlive) {
                            neighborCount++;
                        }
                    }
                }
                if (c.isAlive) {
                    c.survives = neighborCount === 2 || neighborCount === 3;
                }
                else {
                    c.survives = neighborCount === 3;
                }
            });
            _.forEach(this.cells, function (c) { return c.moveToNextGeneration(); });
        };
        Universe.prototype.render = function () {
            _.forEach(this.cells, function (c) { return c.render(); });
        };
        Universe.prototype.run = function () {
            var _this = this;
            if (this.keepRunning) {
                this.evolve();
                this.render();
                _.delay(function () { return _this.run(); }, 1000 - (this.speed * 100));
            }
        };
        Universe.prototype.setSpeed = function (s) {
            this.speed = s;
            $("#speed").html("" + this.speed);
        };
        Universe.prototype.incSpeed = function () {
            this.setSpeed(Math.min(this.speed + 1, 10));
        };
        Universe.prototype.decSpeed = function () {
            this.setSpeed(Math.max(this.speed - 1, 0));
        };
        Universe.prototype.stop = function () {
            this.keepRunning = false;
        };
        Universe.prototype.toggleState = function () {
            if (this.keepRunning) {
                this.stop();
            }
            else {
                this.keepRunning = true;
                this.run();
            }
            $("#status").html(this.keepRunning ? "Running" : "Stopped");
        };
        return Universe;
    })();
    exports.Universe = Universe;
});
//# sourceMappingURL=Universe.js.map