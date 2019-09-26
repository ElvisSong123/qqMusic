(function($, root) {
    var renderObj = {
        renderMessage: function(data, index) {
            $('.song-list').empty();
            var str = '<div class="song">' + data[index].song + '</div>\
            <div class="singer">' + data[index].singer + '</div>\
            <div class="album">' + data[index].album + '</div>';
            $('.message').html(str);
            console.log(data);
            data.forEach(function(ele, index1) {
                var song = index1 == index ? $('<div class = "song active" data-index = "' + index1 + '">' + ele.song + '</div>') : $('<div class = "song" data-index = "' + index1 + '">' + ele.song + '</div>')
                $('.song-list').append(song);
            });

        },
        renderImg: function(data, index) {

            var strImg = '<img src="' + data[index].image + '" alt="">';
            $('.img').html(strImg);
            var img = new Image();
            img.src = data[index].image;
            img.onload = function() {
                root.blurImg(img, $('body'))
            }
            if (data[index].isLike == true) {
                $('.operate .like').addClass('isLike');
            } else {
                $('.operate .like').removeClass('isLike');
            }
        },
        renderTime: function(data, index) {
            var m = parseInt(data[index].duration / 60);
            var s = data[index].duration % 60;
            if (m < 10) {
                m = '0' + m;
            } else if (m == 0) {
                m = '00';
            } else {
                m = m;
            }
            if (s < 10) {
                s = '0' + s;
            } else if (s == 0) {
                s = '00';
            } else {
                s = s;
            }
            $('.final-time').text(m + ':' + s);

        }

    }


    root.renderObj = function(data, index) {
        renderObj.renderMessage(data, index);
        renderObj.renderImg(data, index);
        renderObj.renderTime(data, index);
    };


})(window.Zepto, window.player || (window.player = {}))