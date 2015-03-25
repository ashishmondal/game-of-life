import gol = require("classes/Universe");

export class AppMain {
    public run() {
        var width = $(window).width();
        var height = $(window).height();

        var universe = new gol.Universe(width, height);

        _.defer(() => {
            $("#help").show();
        });

        $(window).keydown((eo: JQueryEventObject) => {

            switch (eo.which) {
                case 83: universe.toggleState();
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
                case 40: universe.decSpeed();
                    break;
                case 38: universe.incSpeed();
                    break;
            }
        });
    }
}