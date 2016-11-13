/*
 * 定时与倒计时
 */

//计时器
var show = document.getElementById("show");
var time = document.getElementsByTagName("input")[0];
var start = document.getElementsByTagName("input")[1];
var suspend = document.getElementsByTagName("input")[2];

//时间变量
var time_h = 0;
var time_m = 0;
var time_s = 0;

var key = false;

//开始事件
start.onclick = function() {
    key = true;
    time_m = parseInt(time.value);
    if (time_m > 59) {
        time_h = Math.floor(time_m / 60);
        time_m = Math.floor(time_m % 60);
    } else {
        time_h = 0;
        time_m = time_m;
    }
    time_s = 0;
}

//倒计时函数
setInterval(function() {
    if (key) {
        var hour = time_h;
        var min = time_m;
        var sec = time_s;

        //时间小于10 的值 前面加 0
        if (time_h < 10) {
            hour = "0" + time_h;
        }
        if (time_m < 10) {
            min = "0" + time_m;
        }
        if (time_s < 10) {
            sec = time_s;
        }
        if (time_s === 0 && time_m === 0 && time_h === 0) {
            key = false;
        } else {
            time_s--;
            if (time_s < 0) {
                time_s = 59;
                time_m--;
            }
            if (time_m < 0) {
                if (time_h > 0) {
                    time_m = 59;
                    time_h--;
                }
            }
        }
        show.textContent = hour + " : " + min + " : " + sec;
    }
}, 1000)

suspend.onclick = function() {
    if (suspend.name == "on") {
        key = false;
        suspend.name = "off";
        suspend.value = "继续";
    } else {
        key = true;
        suspend.name = "on";
        suspend.value = "暂停";
    }
}

//倒计时
var time_day = document.getElementsByTagName("span")[0];
var time_hour = document.getElementsByTagName("span")[1];
var time_min = document.getElementsByTagName("span")[2];
var time_sec = document.getElementsByTagName("span")[3];

var end_time = new Date(1483113599000); //2016-12-30 23-59-59
var a = Date.parse("2017/12/30 23:59:59");//设置时间戳

//时间换算
var one_day = 60 * 60 * 24;
var one_hour = 60 * 60;
var one_min = 60;

setInterval(function() {

    //获取当前时间
    var date = new Date();
    //剩余时间 = 结束时间 - 当前时间
    var t_surplus = end_time.getTime() - date.getTime();
    //剩余时间换算
    var t_times = parseInt(t_surplus / 1000);
    var t_days = parseInt(t_times / one_day);
    var t_hours = parseInt(t_times % one_day / one_hour);
    var t_minutes = Math.floor(t_times % one_day % one_hour / one_min);
    var t_seconds = Math.floor(t_times % one_day % one_hour % one_min);

    //页面显示
    time_day.textContent = t_days;
    time_hour.textContent = t_hours;
    time_min.textContent = t_minutes;
    time_sec.textContent = t_seconds;

}, 1000)
