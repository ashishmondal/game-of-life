define(["require", "exports", "classes/Cell"], function (require, exports, gol) {
    var Universe = (function () {
        function Universe(width, height) {
            var _this = this;
            this.width = width;
            this.height = height;
            this.cells = new Array();
            this.keepRunning = false;
            this.speed = 5;
            /* tslint:disable:no-bitwise */
            this.columns = (width / gol.Cell.CellSize) | 0;
            this.rows = (height / gol.Cell.CellSize) | 0;
            $("#universe").attr({
                width: width,
                height: height
            });
            this.context = ($("#universe")[0]).getContext("2d");
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.columns; x++) {
                    this.cells.push(new gol.Cell(this.context, x, y));
                }
            }
            $("#universe").click(function (eo) {
                var cell = _.find(_this.cells, function (c) {
                    return c.rect.contains(eo.pageX, eo.pageY);
                });
                if (cell) {
                    cell.toggleLife();
                }
            });
            $("pre").hide();
            this.render();
        }
        Universe.prototype.evolve = function () {
            var i = 0;
            var length = this.cells.length;
            for (i = 0; i < length; i++) {
                var c = this.cells[i];
                var x = c.x, y = c.y;
                var cc = this.columns;
                var rc = this.rows;
                var neighborCount = this.cells[(((y - 1 + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives + this.cells[(((y - 1 + rc) % rc) * cc) + ((x + cc) % cc)].lives + this.cells[(((y - 1 + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives + this.cells[(((y + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives + this.cells[(((y + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives + this.cells[(((y + 1 + rc) % rc) * cc) + ((x - 1 + cc) % cc)].lives + this.cells[(((y + 1 + rc) % rc) * cc) + ((x + cc) % cc)].lives + this.cells[(((y + 1 + rc) % rc) * cc) + ((x + 1 + cc) % cc)].lives;
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
        };
        Universe.prototype.render = function () {
            _.forEach(this.cells, function (c) { return c.render(); });
        };
        Universe.prototype.run = function () {
            var _this = this;
            if (this.keepRunning) {
                var d1 = new Date().getTime();
                this.evolve();
                this.render();
                var d2 = new Date().getTime();
                var fps = 1000 / (d2 - d1);
                $("#fps").html(fps.toFixed(3));
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