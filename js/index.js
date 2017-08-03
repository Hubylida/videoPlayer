$(document).ready(function () {
    var $player = $('#player');
    var player = $player[0];
    $('#play').on('click', function () {
        if (player.paused) {
            player.play();
            $(this).removeClass('icon-play').addClass('icon-pause');
            $('#video_cloth').hide();
        } else {
            player.pause();
            $(this).removeClass('icon-pause').addClass('icon-play');
            $('#video_cloth').show();
        }
    });
    $('#stop').on('click', function () {
        player.currentTime = 0;
        $('#ctl_du_b').css('width', 0 + 'px');
        if (!player.paused) {
            player.pause();
            $('#play').removeClass('icon-pause').addClass('icon-play');
        }
    });
    $('.v_ctl_du').on('click', function (e) {
        var w = $('#ctl_du_a').width(),
            x = e.offsetX;
        window.per = (x / w).toFixed(3);//全局变量
        var duration = player.duration;
        player.currentTime = (duration * window.per).toFixed(0);
        $('#ctl_du_b').css('width', x + 'px');
    });
    $player.on('timeupdate', function () {
        var time = player.currentTime.toFixed(1);
        minutes = Math.floor((time / 60) % 60);
        seconds = Math.floor(time % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        $('#ctl_dur').text(minutes + ':' + seconds);
        var w = $('#ctl_du_a').width();
        if (player.duration) {
            window.per = (time / player.duration).toFixed(3);
        } else {
            window.per = 0;
        }
        $('#ctl_du_b').css('width', (window.per * w).toFixed(0) + 'px');
        if (player.ended) {
            $('#play').removeClass('icon-pause').addClass('icon-play');
        }
    });
    $('#ctl_vol_b').css('width', 30 + 'px');
    $('#ctl_vol').on('click', function () {
        if (player.muted) {
            player.muted = false;
            $(this).removeClass('icon-volume-mute').addClass('icon-volume');
            $('#ctl_vol_b').css('width', 50 + '%');
        } else {
            player.muted = true;
            $(this).removeClass('icon-volume').addClass('icon-volume-mute');
            $('#ctl_vol_b').css('width', 0);
        }
    });
    $('.v_ctl_vol').on('click', function (e) {
        var w = $('#ctl_vol_a').width(),
            x = e.offsetX;
        window.vol = (x / w).toFixed(1);
        player.volume = window.vol;
        $('#ctl_vol_b').css('width', x + 'px');
    });
    $('#v_ctl_upload').on('click', function () {
        $('#file').trigger('click');
        $('#file').on('click', function (e) {
            var file = e.target.files[0],
                canPlayType = player.canPlayType(file.type);
            if (canPlayType === 'maybe' || canPlayType === 'probably') {
                src = window.URL.createObjectURL(file);
                player.src = src;
                $play.removeClass('icon-pause').addClass('icon-play'); //新打开的视频处于paused状态
                player.onload = function () {
                    window.URL.revokeObjectURL(src);
                };
            } else {
                alert("浏览器不支持您选择的文件格式");
            }
        });
    });
    $('#v_ctl_expand').on('click', function () {
        if (!document.webkitIsFullScreen) {
            player.webkitRequestFullScreen(); //全屏
            $(this).removeClass('icon-expand').addClass('icon-contract');
        } else {
            document.webkitCancelFullScreen();
            $(this).removeClass('icon-contract').addClass('icon-expand');
        }
    });
    $(document).on('webkitfullScreenchange', function (e) {
        var w = $('#ctrl_du_a').width(),
            vw = $('#ctl_vol_a').width();
        if (window.per) {
            $('#ctl_du_b').css('width', (window.per * w).toFixed(0) + 'px');

        }
        if (window.vol) {
            $('#ctl_vol_b').css('width', (window.per * vw).toFixed(0) + 'px');
        }
    });
    $('#player').on('click',function(){
        $('#video_cloth').show();
        player.pause();
        $('#play').removeClass('icon-pause').addClass('icon-play');
    });
    $('#video_cloth').on('click',function(){
        $('#video_cloth').hide();
        player.play();
        $('#play').removeClass('icon-play').addClass('icon-pause');
    });
})
