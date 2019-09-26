(function($, root) {
    function addAudio() {
        this.audio = new Audio();
        this.status = 'pause';

    }
    addAudio.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';

        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
            console.log('load')
        },
        playTo: function(time) {
            this.audio.currentTime = time;
        }
    }
    root.addAudio = new addAudio();
}(window.Zepto, window.player || (window.player = {})))