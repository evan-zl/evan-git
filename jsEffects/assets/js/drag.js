/*
 * 拖拽
 */
$(function() {

    var zindex = 1;

    /* ====== 存储数据 ===== */
    var pos = [];

    $("li").each(function(i) {

        // $(this).text(i+1);

        pos[i] = {
            left: $(this).offset().left - $("ul").offset().left,

            top: $(this).offset().top - $("ul").offset().top
        };
    });

    /* ====== 刷新布局 ===== */
    $("li").each(function(i) {

        $(this).css({

            "left": pos[i].left + "px",

            "top": pos[i].top + "px",

            "position": "absolute",

            "margin": "0",

            "background": "url(assets/images/" + i + ".png) center no-repeat",

            "background-size": "100%"

        }).data("index", i);

        drag($(this));
    });

    function drag(obj) {

        /* ====== 绑定事件 ===== */
        obj.mousedown(function(e) {

            e.preventDefault();

            var left = obj.offset().left - $("ul").offset().left;

            var top = obj.offset().top - $("ul").offset().top;

            /* ====== 获取边距 ===== */
            var x = e.clientX - left;

            var y = e.clientY - top;

            /* ====== 设置层次 ===== */
            obj.css("zIndex", zindex++);

            $(document).mousemove(function(e) {

                /* ====== 目标随鼠标移动 ===== */
                obj.css({

                    "left": e.clientX - x + "px",

                    "top": e.clientY - y + "px"
                });

                var room = tsc(obj);

                if (room && room != obj) {

                    /* ====== 获取存放的数据 ===== */
                    var o_in = obj.data("index");

                    var r_in = room.data("index");

                    /* ====== 判断移动位置 ===== */
                    if (o_in < r_in) {

                        $("li").each(function(i) {

                            var s = $(this).data("index");

                            if (s >= o_in + 1 && s <= r_in) {

                                s--;

                                /* ====== 更新存放数据 ===== */
                                $(this).data("index", s);



                                /* ====== 目标的大哥们移动 ===== */
                                move($("li:eq(" + i + ")"), pos[$("li:eq(" + i + ")").data("index")])
                            }
                        });

                    } else if (o_in > r_in) {

                        $("li").each(function(i) {

                            var s = $(this).data("index");

                            if (s >= r_in && s <= o_in - 1) {

                                s++;

                                /* ====== 更新存放数据 ===== */
                                $(this).data("index", s);


                                /* ====== 目标的小弟们移动 ===== */
                                move($("li:eq(" + i + ")"), pos[$("li:eq(" + i + ")").data("index")])
                            }
                        });

                    }
                    /* ====== 更新目标存放数据 ===== */
                    obj.data("index", r_in);
                }
            });

            $(document).mouseup(function() {

                /* ====== 解除绑定事件 ===== */
                $(document).off("mousemove mousedown mouseup");

                /* ====== 目标定位移动 ===== */
                move(obj, pos[obj.data("index")]);

            });
        });
    }

    //* ====== 计算距离 ===== */
    function get_range(obj1, obj2) {

        var a = obj1.offset().left - $("ul").offset().left - pos[obj2.data("index")].left;

        var b = obj1.offset().top - $("ul").offset().top - pos[obj2.data("index")].top;

        return Math.sqrt(a * a + b * b);
    }

    /* ====== 找最小值 ===== */
    function tsc(obj) {

        var min = 1000;

        var min_index = -1;

        $("li").each(function(i) {

            var dis = get_range(obj, $(this));

            if (min > dis) {

                min = dis;

                min_index = i;
            }
        })

        if (min_index == -1) {

            return null;
        }
        return $("li:eq(" + min_index + ")");
    };

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
