define(["require", "exports", "app/classes/Universe"], function (require, exports, gol) {
    window.onload = function () {
        var canvas = $("#universe");
        var width = $(window).width();
        var height = $(window).height();
        canvas.attr({
            width: width,
            height: height
        });
        var universe = new gol.Universe(width, height);
        canvas.click(function (eventObject) { return universe.onClick(eventObject); });
        $(window).keydown(function (eo) {
            switch (eo.which) {
                case 83:
                    if (universe.isRunning) {
                        universe.stop();
                    }
                    else {
                        universe.run();
                    }
                    break;
            }
        });
    };
});
//# sourceMappingURL=app.js.map