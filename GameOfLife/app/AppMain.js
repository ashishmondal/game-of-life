define(["require", "exports", "classes/Universe"], function (require, exports, gol) {
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            var width = $(window).width();
            var height = $(window).height();
            var universe = new gol.Universe(width, height);
            _.defer(function () {
                $("#help").show();
            });
            $(window).keydown(function (eo) {
                switch (eo.which) {
                    case 83:
                        universe.toggleState();
                        break;
                    case 191:
                        if (eo.shiftKey) {
                            $("#help").show();
                            universe.stop();
                        }
                        break;
                    case 27:
                        $("#help").fadeOut();
                        break;
                    case 40:
                        universe.decSpeed();
                        break;
                    case 38:
                        universe.incSpeed();
                        break;
                }
            });
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
//# sourceMappingURL=AppMain.js.map