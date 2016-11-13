$(function() {
	var left = -1300;
	var set = function() {
		$(".wrap").css("left", left + "px");
		left++;
		if (left >= 0) {
			left = -2600;
		}
	};
	//正常跑
	function normal_fn() {
		var normal_se = setInterval (function() {
			if (normal_key) {
				set();				
			}
		},6);
	};
	var normal_se = normal_fn();//储存
	//停止
	function stop_nor() {
		clearInterval(normal_se);
	};
	//开始
	function star_nor() {
		stop_nor();
		normal_se = normal_fn;
	};

	//快速跑
	function fast_fn() {
		var fast_se = setInterval (function() {
			if (fast_key) {
				set();				
			}
		},3.5);
	};
	var fast_se = fast_fn();//储存
	//停止
	function stop_fa() {
		clearInterval(fast_se);
	};
	//开始
	function star_fa() {
		stop_fa();
		fast_se = fast_fn;
	};

	//慢跑
	function slow_fn() {
		var slow_se = setInterval (function() {
			if (slow_key) {
				set();
			}
		},8.5);
	};
	var slow_se = slow_fn();//储存
	// 停止
	function stop_slow() {
		clearInterval(slow_se);
	};
	// 开始
	function star_slow() {
		stop_slow();
		slow_se = slow_fn;
	};
	var normal_key = false;
	var fast_key = false;
	var slow_key = false;

	//改变速度
	$(".normal").click(function() {
		$(".running").attr("class", "running run_normal");
		normal_key = true;
		fast_key = false;
		slow_key = false;
		star_nor();
	});
	$(".fast").click(function() {
		$(".running").attr("class", "running run_fast");
		normal_key = false;
		fast_key = true;
		slow_key = false;
		star_fa();
	});
	$(".slow").click(function() {
		$(".running").attr("class", "running run_slow");
		normal_key = false;
		fast_key = false;
		slow_key = true;
		star_slow();
	});
	$(".stop").click(function() {
		$(".running").attr("class", "running");
		normal_key = false;
		fast_key = false;
		slow_key = false;
	});
});