define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rect {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.left = x;
            this.top = y;
            this.right = x + width;
            this.bottom = y + height;
        }
        contains(x, y) {
            return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
        }
    }
    exports.Rect = Rect;
});
//# sourceMappingURL=Rect.js.map