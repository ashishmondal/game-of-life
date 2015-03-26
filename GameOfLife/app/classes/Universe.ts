﻿import gol = require("classes/Cell");

export class Universe {

    private cells: gol.Cell[] = new Array<gol.Cell>();
    private columns: number;
    private rows: number;
    private keepRunning: boolean = false;
    public speed: number = 5;
    private context: CanvasRenderingContext2D;

    constructor(private width: number, private height: number) {

        /* tslint:disable:no-bitwise */
        this.columns = (width / gol.Cell.CellSize) | 0;
        this.rows = (height / gol.Cell.CellSize) | 0;

        $("#universe").attr(
            {
                width: width,
                height: height
            });

        this.context = (<HTMLCanvasElement>($("#universe")[0])).getContext("2d");

        for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.columns; x++) {
                this.cells.push(new gol.Cell(this.context, x, y));
            }
        }

        $("#universe").click((eo: JQueryEventObject) => {
            var cell = _.find(this.cells,(c: gol.Cell) => {
                return c.rect.contains(eo.pageX, eo.pageY);
            });

            if (cell) {
                cell.toggleLife();
            }
        });

        $("pre").hide();
        this.render();
    }

    evolve() {
        _.forEach(this.cells,(c: gol.Cell) => {
            var neighborCount: number = 0;

            for (var row = -1; row <= 1; row++) {
                for (var col = -1; col <= 1; col++) {
                    if (row === 0 && col === 0) {
                        continue;
                    }

                    var x = (c.x + col + this.columns) % this.columns;
                    var y = (c.y + row + this.rows) % this.rows;
                    var cell = this.cells[y * this.columns + x];
                    if (cell.isAlive) {
                        neighborCount++;
                    }
                }
            }

            if (c.isAlive) {
                c.survives = neighborCount === 2 || neighborCount === 3;
            } else {
                c.survives = neighborCount === 3;
            }
        });

        _.forEach(this.cells,(c: gol.Cell) => c.moveToNextGeneration());
    }

    render() {
        _.forEach(this.cells,(c: gol.Cell) => c.render());
    }

    public run() {
        if (this.keepRunning) {
            var d1 = new Date().getTime();
            this.evolve();
            this.render();
            var d2 = new Date().getTime();

            var fps = 1000 / (d2 - d1);
            $("#fps").html(fps.toFixed(3));

            _.delay(() => this.run(), 1000 - (this.speed * 100));
        }
    }

    public setSpeed(s: number) {
        this.speed = s;
        $("#speed").html("" + this.speed);
    }

    public incSpeed() {
        this.setSpeed(Math.min(this.speed + 1, 10));
    }

    public decSpeed() {
        this.setSpeed(Math.max(this.speed - 1, 0));
    }

    public stop() {
        this.keepRunning = false;
    }

    toggleState() {
        if (this.keepRunning) {
            this.stop();
        } else {
            this.keepRunning = true;
            this.run();
        }

        $("#status").html(this.keepRunning ? "Running" : "Stopped");
    }
}
 