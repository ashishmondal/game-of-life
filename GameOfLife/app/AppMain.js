define(["require", "exports", "./classes/Universe"], function (require, exports, Universe_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AppMain {
        run() {
            var width = $(window).width();
            var height = $(window).height();
            var universe = new Universe_1.Universe(width, height);
            _.defer(() => {
                $("#help").show();
            });
            $(window).keydown((eo) => {
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
            // for touch based devices
            $("#status").click(() => universe.toggleState());
            $("#speed").click(() => universe.incSpeed());
        }
    }
    exports.AppMain = AppMain;
});
//# sourceMappingURL=AppMain.js.map