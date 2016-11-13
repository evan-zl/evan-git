

// 获取指针
var hour_hand = document.getElementsByClassName('hour_hand')[0];

var minute_hand = document.getElementsByClassName('minute_hand')[0];

var second_hand = document.getElementsByClassName('second_hand')[0];

// 获取数字显示时间
var time_hour = document.getElementsByClassName('time_hour')[0];

var time_minute = document.getElementsByClassName('time_minute')[0];

var time_second = document.getElementsByClassName('time_second')[0];

var timeing = setInterval (function () {

	//获取当前时间
	var date = new Date();

	var hour = date.getHours();

	var min = date.getMinutes();

	var sec = date.getSeconds();

	// 换算角度

	var deg_hour = hour * 30 + min / 2 + 'deg';

	var deg_min = min * 6 + 'deg';

	var deg_sec = sec * 6 + 'deg';

	//让指针调用角度
	hour_hand.style.transform = "rotate("+deg_hour+")";	
	hour_hand.style.msTransform = "rotate("+deg_hour+")";	

	minute_hand.style.transform = "rotate("+deg_min+")";
	minute_hand.style.msTransform = "rotate("+deg_min+")";

	second_hand.style.transform = "rotate("+deg_sec+")";
	second_hand.style.msTransform = "rotate("+deg_sec+")";

	//时间数字小于10 前面加 0
	if (hour < 10) {
		hour = "0" + hour;
	}

	if (min < 10) {
		min = "0" + min;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}

	//显示时间
	time_hour.textContent = hour;

	time_minute.textContent = min;

	time_second.textContent = sec;

}, 1000);