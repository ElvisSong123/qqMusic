var root = window.player;
var audio = root.addAudio;
var renderObj = root.renderObj;
var controlIndex = null;
var deg = 0;
var timer;
var timeBar = root.timeBar;
var touchkey = false;

function getData(url) {
    $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
            console.log(data);
            audio.getAudio(data[0].audio);
            len = data.length;
            controlIndex = new root.controlIndex(len);
            bindEvent(data);
            bindTouch(data[0].duration);
            console.log(timeBar)
            renderObj(data, 0);
        },
        error: function() {
            console.log('error')
        }
    })
}

function bindEvent(data) {
    var index = 0;
    var listIndex = null;
    $('body').on('play:change', function(e, index) {

        audio.getAudio(data[index].audio);
        if (audio.status == "play") {
            timeBar.tempt() //清除上一次的requestAnimationFrame
            audio.play();
            // timeBar.timeBarRun(data[index].duration);
        } else {
            audio.pause();
            timeBar.tempt() //清除这一次的requestAnimationFrame
        }
    })
    $('.operate .like').on('click', function() {
        if (data[index].isLike == true) {
            $(this).removeClass('isLike');
            data[index].isLike = false;
        } else {
            $(this).addClass('isLike');
            data[index].isLike = true;
        }
    });
    $('.operate .prev').on('click', function() {
        deg = 0;
        index = controlIndex.prev(listIndex);
        listIndex = null;
        bindTouch(data[index].duration);
        $('body').trigger('play:change', index);
        timeBar.timeBarRun(data[index].duration, 0);

        if (audio.status == "pause") {
            timeBar.tempt() //清除这一次的requestAnimationFrame

        }
        renderObj(data, index)
    });
    $('.operate .next').on('click', function() {

        deg = 0;
        index = controlIndex.next(listIndex);
        listIndex = null;
        bindTouch(data[index].duration);
        $('body').trigger('play:change', index);
        timeBar.timeBarRun(data[index].duration, 0);
        if (audio.status == "pause") {
            timeBar.tempt() //清除这一次的requestAnimationFrame
        }

        renderObj(data, index)
    });
    $('.operate .suspend').on('click', function(e) {

        if (audio.status == "pause") {

            timeBar.timeBarRun(data[index].duration);
            audio.play();
            $(this)[0].style.backgroundImage = 'url(../image/icon-pause.png)';
            rotate();
        } else {
            audio.pause();
            timeBar.tempt();
            console.log('tempt')
            $(this)[0].style.backgroundImage = 'url(../image/icon-play.png)';
            clearInterval(timer);

        }

    });
    $('.operate .list').on('click', function(e) {

        e.stopPropagation()
        $('.song-list').show();
    });
    $('.wrapper').on('click', function() {
        $('.song-list').hide();
    });
    $('.song-list').on('click', function(e) { //歌曲列表切歌功能。
        clearInterval(timer)
        e.stopPropagation();
        var target = e.target;
        var index1 = $(target).attr('data-index');
        renderObj(data, index1);
        $('.song-list').hide();
        listIndex = index1;
        $('body').trigger('play:change', index1);
        timeBar.timeBarRun(data[index1].duration, 0);
        audio.play();
        $('.operate .suspend')[0].style.backgroundImage = 'url(../image/icon-pause.png)';
        rotate();


    });

}

function bindTouch(time) {
    var mousePre;
    $('.spot').on('touchstart', function(e) {
        console.log(e);

    }).on('touchmove', function(e) {
        touchkey = true;
        if (audio.status == "play") {
            audio.pause();
            timeBar.tempt(); //清除上一次的requestAnimationFrame,让开始状态下进度条能正常和鼠标一起走。
            $('.operate .suspend')[0].style.backgroundImage = 'url(../image/icon-play.png)';

        }
        var mouseX = e.touches[0].clientX;
        var barOffset = $('.timeBar_bottom').offset().left;
        var barWidth = $('.timeBar_bottom').width() - 12;
        var mouseDis = mouseX - barOffset;
        mousePre = mouseDis / barWidth;
        // console.log(mouseDis, mousePre);
        if (mousePre < 0) {
            mousePre = 0;
        }
        if (mousePre > 0.97) {
            mousePre = 0.97;
        }
        timeBar.update(mousePre * 100, time);



    }).on('touchend', function(e) {
        clearInterval(timer)
        timeBar.tempt(); //清除上一次的requestAnimationFrame
        audio.playTo(mousePre * time);
        audio.play();
        $('.operate .suspend')[0].style.backgroundImage = 'url(../image/icon-pause.png)';
        timeBar.timeBarRun(time, mousePre * time * 1000); //开启新的requestAnimationFrame
        rotate();
    })
}

function rotate() {
    timer = setInterval(function() {
        deg += 0.3;
        $('.img img')[0].style.transform = 'rotate(' + deg + 'deg)';
    }, 50)
}




getData('../mock/data.json')