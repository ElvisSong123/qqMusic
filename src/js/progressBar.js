(function($, root) {

    var timer = null;
    var startTime = null;
    var lastPer = 0;

    function renderCurTime(p) {
        var m = parseInt(p / 60);
        var s = p % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        var nowTime = m + ':' + s;
        $('.now-time').html(nowTime);
        $('.now-time').attr('data-time', p);
    }

    function timeBarRun(time, p) {
        lastPer = p >= 0 ? p : lastPer;

        startTime = new Date().getTime();
        var date = new Date().getTime();
        var speed = 97 / (time * 1000); //百分之97的进度条，一毫秒走多远。
        var distance = lastPer * speed;


        function run() {
            var date1 = new Date().getTime();
            var timeDiff = date1 - date;
            date = date1;
            distance += speed * timeDiff;

            if (distance <= 97) {
                update(distance, time);
            } else {

                tempt();
                $('.operate .suspend')[0].style.backgroundImage = 'url(../image/icon-play.png)';
                if ($('.now-time').attr('data-time') == time) {
                    setTimeout(function() {
                        nextSong();
                    }, 500)

                }
                return false;
            }

            timer = requestAnimationFrame(run);

        }
        run();

    }

    function update(distance, time) {
        renderCurTime(Math.ceil(distance / 97 * time));
        $('.timeBar_up').css({
            transform: 'translateX(' + (distance - 100) + '%)'
        });


    }

    function nextSong() {
        $('.operate .next').trigger('click');
        $('.operate .suspend')[0].style.backgroundImage = 'url(../image/icon-pause.png)';
        return false;
    }

    function tempt() {
        cancelAnimationFrame(timer);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime);

    }

    function reset() {
        lastPer = 0;
        console.log('reset')
    }
    root.timeBar = {
        timeBarRun:timeBarRun,
        update:update,
        tempt:tempt


    }

})(window.Zepto, window.player || (window.player = {}))