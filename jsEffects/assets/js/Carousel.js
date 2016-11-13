/*
 * 轮播 
 */

var show = document.getElementById("show"); //显示
var a_addr = document.getElementsByTagName("a")[0];
var box2 = document.getElementById("box2"); //按钮外盒
var butt_left = document.getElementsByClassName('butt_left')[0]; //上一页按钮
var butt_right = document.getElementsByClassName('butt_right')[0]; //下一页按钮
var spanbg = document.getElementsByTagName("span"); //索引数字
var streamer = document.getElementsByClassName("streamer")[0]; //横幅
//图片数组
var imgarr = ["assets/images/Carousel-1.png", "assets/images/Carousel-2.png",
    "assets/images/Carousel-3.png", "assets/images/Carousel-4.png",
    "assets/images/Carousel-5.png", "assets/images/Carousel-6.png"
]
var hrefarr = ['http://zouliang.wutongwei.com/', 'http://zouliang.wutongwei.com/',
    'http://zouliang.wutongwei.com/', 'http://zouliang.wutongwei.com/',
    'http://zouliang.wutongwei.com/', 'http://zouliang.wutongwei.com/'
]
var index = 0;
var key = true;
var on_off = true;
var left = 0;
var startPos = 0;
var endPos = 0;

//索引数字背景函数
var active = function() {
    for (var i = 0; i < spanbg.length; i++) {
        if (i != index) {
            spanbg[i].removeAttribute("class");
        }
    }
};
//设置图片,连接地址和背景函数
var set = function() {
    show.src = imgarr[index];
    a_addr.setAttribute("href", hrefarr[index]);
    spanbg[index].setAttribute("class", "active");
};
//索引递增
var index_add = function() {
    if (index >= imgarr.length - 1) {
        index = 0;
    } else {
        index++;
    }
};
//索引递减
var index_subtr = function() {
    if (index <= 0) {
        index = imgarr.length - 1;
    } else {
        index--;
    }
};
//隐藏按钮
var display_of = function() {
    butt_left.style.display = "none";
    butt_right.style.display = "none";
};
// 显示按钮
var display_on = function() {
    butt_left.style.display = "block";
    butt_right.style.display = "block";
};
//轮播
function task() {
    var carousel = setInterval(function() {
        if (key) {
            set();
            active();
            index++;
            if (index > imgarr.length - 1) {
                index = 0;
            }
        }
    }, 2000);
    return carousel;
}
var carousel = task(); //存储
//停止
function stop() {
    clearInterval(carousel)
}
//开始
function start() {
    stop();
    carousel = task;
}
//上一页
butt_left.onclick = function() {
    key = false;
    index_subtr();
    set();
    active();
};
//下一页
butt_right.onclick = function() {
    key = false;
    index_add();
    set();
    active();
};
//索引数字
for (var i = 0; i < spanbg.length; i++) {
    spanbg[i].onmouseover = function() {
        tex = this.textContent;
        key = false;
        display_on();

        switch (tex) {
            case "1":
                index = 0;
                break;
            case "2":
                index = 1;
                break;
            case "3":
                index = 2;
                break;
            case "4":
                index = 3;
                break;
            case "5":
                index = 4;
                break;
            case "6":
                index = 5;
                break;
        }
        set();
        active();
    }
    spanbg.onmouseout = function() {
        display_of();
    }
};
//显示上下按钮
show.onmouseover = box2.onmouseover = function() {
    key = false;
    display_on();
};
// 隐藏上下按钮
show.onmouseout = box2.onmouseout = function() {
    key = true;
    display_of();
};
//横幅
var timing = setInterval(function() {
    if (on_off) {
        streamer.style.left = left + "px";
        left--;
        if (left < -1120) {
            left = 0;
        }
    }
}, 15);
streamer.onmouseover = function() {
    on_off = false;
}
streamer.onmouseout = function() {
        on_off = true;
    }
    //触摸开始
function touchSatrt(evt) {
    try {
        evt.preventDefault(); //阻止触摸时浏览器的缩放，滚动
        stop();
        var touch = evt.targetTouches[0]; //获取第一个触点
        startPos = touch.pageX;
    } catch (e) {
        alert('touchSatrt: ' + e.message);
    }
};
// 触摸移动
function touchMove(evt) {
    try {
        evt.preventDefault();
        var touch = evt.targetTouches[0];
        endPos = touch.pageX - startPos;
    } catch (e) {
        alert('touchmove: ' + e.message);
    }
};
//触摸结束
function touchEnd(evt) {
    try {
        evt.preventDefault();
        if (endPos > 10) {
            index_add();
        } else if (endPos < -10) {
            index_subtr();
        }
        set();
        active();
    } catch (e) {}
};
//绑定事件  
function bindEvent() {
    show.addEventListener('touchstart', touchSatrt, false);
    show.addEventListener('touchmove', touchMove, false);
    show.addEventListener('touchend', touchEnd, false);
};
//判断是否支持触摸事件  
function isTouchDevice() {
    try {
        bindEvent();
    } catch (e) {
        alert("不支持TouchEvent事件！" + e.message);
    }
};
window.onload = isTouchDevice;
