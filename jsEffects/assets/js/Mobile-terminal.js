/*
 * 手机滑动与窗口大小改变
 */
var container = document.getElementById('container');
var boxs = document.getElementsByClassName('box');
var butt_up = document.getElementsByTagName('a')[0];
var butt_down = document.getElementsByTagName('a')[1];
var span = document.getElementsByTagName('span');
var top_a = document.getElementsByClassName('_top')[0];
var index = 0; //索引
var startPos = 0; //触摸起点
var endPos = 0; //触摸末点
//变换页面
var set = function() {
        for (var i = 0; i < boxs.length; i++) {
            boxs[i].style.display = "none";
            if (i == index) {
                boxs[i].style.display = 'block';
            }
        }
    }
    // 索引递增
var index_jia = function() {
        if (index >= boxs.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }
    // 索引递减
var index_jian = function() {
        if (index <= 0) {
            index = boxs.length - 1;
        } else {
            index--;
        }
    }
    //上一页
butt_up.onclick = function() {
        index_jian();
        set();
    }
    //下一页
butt_down.onclick = function() {
        index_jia();
        set();
    }
    //窗口大小变化
window.onresize = function() {
        var width = container.offsetWidth;
        var height = document.documentElement.clientHeight;
        if (height < 700) {
            var width = height * 0.833333 + 'px';
            var fontsize = height * 0.133333333 + 'px';
            var spanhi = height * 0.16666666666 + 'px';
            var top_wh = height * 0.166666666 + 'px';
            var top_hi = height * 0.083333333333 + 'px';

            container.style.width = width;
            container.style.height = height;
            top_a.style.width = top_wh;
            top_a.style.height = top_hi;

            for (var i = 0; i < boxs.length; i++) {
                boxs[i].style.fontSize = fontsize;
                span[i].style.height = spanhi;
                span[i].style.lineHeight = spanhi;
            }
        }
    }
    //开始触摸
function touchSatrt(evt) {
    try {
        evt.preventDefault(); //阻止触摸时浏览器的缩放，滚动
        stop();
        var touch = evt.targetTouches[0]; //获取第一个触点
        startPos = touch.pageY;
    } catch (e) {
        alert('touchSatrt: ' + e.message);
    }
};
// 触摸移动
function touchMove(evt) {
    try {
        evt.preventDefault();
        var touch = evt.targetTouches[0];
        endPos = touch.pageY - startPos;
    } catch (e) {
        alert('touchmove: ' + e.message);
    }
};
//触摸结束
function touchEnd(evt) {
    try {
        evt.preventDefault();
        if (endPos > 100) {
            index_jian();
        } else if (endPos < -100) {
            index_jia();
        }
        set();
        startPos = 0;
        endPos = 0;
    } catch (e) {}
};
//绑定事件  
function bindEvent() {
    container.addEventListener('touchstart', touchSatrt, false);
    container.addEventListener('touchmove', touchMove, false);
    container.addEventListener('touchend', touchEnd, false);
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
