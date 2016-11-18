/*
 *手风琴效果 
 */
$(function() {

    var len = $("li").length;

    $("li").each(function(i) {

        if (i >= 1) {

            $(this).css("left", 1000 - 25 * (len - i) + "px");
        }

        if (i % 2 == 0) {

            $(this).find("a").css("background", "#666");
        }

        $(this).data("index", i);
    });

    $("a").each(function(i) {

        (function(index) {

            $("a:eq(" + index + ")").mouseover(function() {

                $("li").each(function(i) {

                    if (i <= index) {

                        move($(this), { left: i * 25 });

                    } else {

                        move($(this), { left: 1000 - 25 * (len - i) })
                    }
                });
            });

        })(i);

    });

});


/* ====== 获取属性 ===== */
function getStyle(obj, key) {

    return (obj.css(key));

}

var tdata = [];

/* ====== 移动函数 ===== */
function move(obj, data) {

    var time = 900;

    var start = {};

    var dis = {};

    for (var key in data) {

        start[key] = parseFloat(getStyle(obj, key));

        dis[key] = data[key] - start[key];

    }

    /* ===== 移动帧数 ===== */
    var count = Math.round(time / 30);

    var j = 0;

    /* ====== 清除定时移动，防止高频移动 ===== */
    if (tdata[obj.data("index")]) {

        clearInterval(tdata[obj.data("index")]);

    }

    /* ====== 移动定时函数 ===== */
    tdata[obj.data("index")] = setInterval(function() {

        j++;

        for (var key in data) {

            var s = 1 - j / count;

            var lon = start[key] + dis[key] * (1 - Math.pow(s, 3));

            obj.css(key, lon + "px");

        }

        /* ====== 停止移动 ===== */
        if (j == count) {

            clearInterval(tdata[obj.data("index")]);

        }

    }, 30);

}
