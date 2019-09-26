(function($, root) {
    function controlIndex(len) {
        this.index = 0;
        this.len = len
    }
    controlIndex.prototype = {
        prev: function(p) {
            if (p) {
                this.index = p;
            }
            this.index--;
            if (this.index < 0) {
                this.index = this.len - 1;
            }
            return this.index;
        },
        next: function(p) {
            if (p) {
                this.index = p;
            }
            this.index++;
            if (this.index == this.len) {
                this.index = 0;
            }
            return this.index;
        }
    }
    root.controlIndex = controlIndex;
})(window.Zepto, window.player || (window.player = {}))