(function(){

	var ui_areamin_text = document.getElementsByClassName('ui_areamin_text')[0];
	var ui_areamin_content_list = document.getElementsByClassName('ui_areamin_content_list')[0];
	var item_as = ui_areamin_content_list.getElementsByTagName('a');

	var topbanner = document.getElementById('top_banner');
	var topbanner_close = document.getElementById('topbanner_close');

	var categorys_2014 = document.getElementById('categorys_2014');
	var categ_items = categorys_2014.getElementsByClassName('item');
	var cts_dorpdown_layer = categorys_2014.getElementsByClassName('dorpdown_layer');

	var item_sub = document.getElementsByClassName('item_sub');

	var focus = document.getElementById('focus');
	var slider = focus.getElementsByClassName('slider')[0];
	var slider_main = focus.getElementsByClassName('slider_main')[0];
	var inner_img = slider_main.getElementsByTagName('a');
	var focus_slider_panels = focus.getElementsByClassName('slider_panel');
	var slider_items = focus.getElementsByClassName('slider_item');
	var focus_slider_prev = focus.getElementsByClassName('slider_prev')[0];
	var focus_slider_next = focus.getElementsByClassName('slider_next')[0];
	var focus_slider_page = focus.getElementsByClassName('slider_page')[0];

	var todays = document.getElementById('todays');
	var todays_slider_main = todays.getElementsByClassName('slider_main')[0];
	var todays_slider_panels = todays.getElementsByClassName('slider_panel');
	var todays_slider_page = todays.getElementsByClassName('slider_page')[0];
	var todays_slider_prev = todays.getElementsByClassName('slider_prev')[0];
	var todays_slider_next = todays.getElementsByClassName('slider_next')[0];

	var guessyou = document.getElementById('guessyou');
	var guess_renovate = guessyou.getElementsByClassName('extra')[0];
	var ajax_ul = guessyou.getElementsByTagName('ul')[0];
	var guessyou_img = ajax_ul.getElementsByTagName('img');
	var guessyou_info_name = ajax_ul.getElementsByClassName('info_name');
	var guessyou_info_price = ajax_ul.getElementsByClassName('info_price');
	
	var focus_index = 0;
	var todays_index = 0;
	var guess_index = 0;
	var focus_key = true;
	var todays_key = false;
	var left_index = 0;
	var todays_left_px = -1000;
	var xmlhttp;
	// 设置轮播显示
	var focus_set = function () {
		focus_slider_panels[focus_index].setAttribute('class', 'slider_panel slider_panel_selected');
		slider_items[focus_index].setAttribute('class', 'slider_item slider_selected');
		for (var i = 0; i < focus_slider_panels.length; i++) {
			if (i != focus_index) {
				focus_slider_panels[i].setAttribute('class', 'slider_panel');
				slider_items[i].setAttribute('class', 'slider_item');
			}
		}
	};
	// 索引递加
	var focus_index_add = function () {
		if (focus_index >= focus_slider_panels.length-1) {
			focus_index = 0;
		} else {
			focus_index++;
		}
	};
	var todays_index_add = function () {
		if (todays_index >= todays_slider_panels.length-1) {
			todays_index = 0;
		} else {
			todays_index++;
		}
	};
	// 索引递减
	var focus_index_sub = function () {
		if (focus_index <= 0) {
			focus_index = focus_slider_panels.length-1;
		} else {
			focus_index--;
		}
	};
	var todays_index_sub = function () {
		if (todays_index <= 0) {
			todays_index = todays_slider_panels.length-1;
		} else {
			todays_index--;
		}
	};
	//推荐  -> 上下页函数
	function todays_remove_sub() {
		left_index += 10; 
		todays_slider_main.style.left = todays_left_px + "px";	
		if (left_index > 500) {
	    	return left_index = 0;
		} 	
		if (todays_left_px == 0) {
			todays_left_px = -4000;
		}
		todays_left_px += 20;
		setTimeout(function(){todays_remove_sub()}, 10);
	}
	function todays_remove_add() {
		left_index += 10; 	
		todays_slider_main.style.left = todays_left_px + "px";
		if (left_index > 500) {
	    	return left_index = 0;
		} 	
		if (todays_left_px == -4000) {
		  	todays_left_px = 0;
		}
		todays_left_px -= 20;
		setTimeout(function(){todays_remove_add()}, 10);
	}
	// 用户改变送至 地址省份
	for (var i = 0; i < item_as.length; i++) {
		item_as[i].onclick = function () {
			var text = this.textContent;
			var text_id = this.getAttribute('data-id');
			for (var j = 0; j < item_as.length; j++) {
				item_as[j].style.background = '';
				item_as[j].style.color = '#000';
				item_as[j].removeAttribute('class');
			}
			this.style.background = "#b1191a";
			this.style.color = '#fff';
			this.setAttribute('class', 'hover');
			ui_areamin_text.textContent = text;
			ui_areamin_text.title = text;
			ui_areamin_text.setAttribute('data-id', text_id);
		}
	}
	// 关闭顶部横幅
	topbanner_close.onclick = function () {
		topbanner.style.display = 'none';
	}
	//二级菜单定位
	var top_index = 0;
	for (var i = 0; i < item_sub.length; i++) {
		item_sub[i].style.top = top_index * -31 - 1 + 'px';
		top_index++;
	}
	//焦点图片
	timing = setInterval (function () {
		if (focus_key) {
			focus_set();
			focus_index_add();
		}
	}, 2000);
	// 上一页
	focus_slider_prev.onclick = function () {
		focus_index_sub();
		focus_set();
	}

	todays_slider_prev.onclick = function () {
		todays_remove_sub();
	}
	// 下一页
	focus_slider_next.onclick = function () {
		focus_index_add();
		focus_set();
	}
	todays_slider_next.onclick = function () {
		todays_remove_add();
	}
	//当鼠标移动在焦点图片上 暂停轮播
	slider.onmouseover = function () {
		focus_key = false;
	}
	//当鼠标移出焦点图片上 继续轮播
	slider.onmouseout = function () {
		focus_key = true;
	}
	// 上下页按钮的隐藏/显示
	for (var i = 0; i < inner_img.length; i++) {
		inner_img[i].onmouseover = function () {
			focus_slider_page.style.display = 'block';
		}
		focus_slider_page.onmouseover = function () {
			focus_slider_page.style.display = 'block';
		}
		focus_slider_page.onmouseout = function () {
			focus_slider_page.style.display = 'none';
		}
		inner_img[i].onmouseout = function () {
			focus_slider_page.style.display = 'none';
		}
	}
	// 数字索引跳转焦点图片
	for (var i = 0; i < slider_items.length; i++) {
		slider_items[i].onmouseover = function () {
			text = this.textContent;
			switch (text) {
				case '1':
					focus_index = 0;
					break;
				case '2':
					focus_index = 1;
					break;
				case '3':
					focus_index = 2;
					break;
				case '4':
					focus_index = 3;
					break;
				case '5':
					focus_index = 4;
					break;
				case '6':
					focus_index = 5;
					break;
			}
			focus_set();
		}
	}
	// 今日推荐上下页按钮隐藏/显示
	for (var i = 0; i < todays_slider_panels.length; i++) {
		todays_slider_panels[i].onmouseover = function () {
			todays_slider_page.style.display = 'block';
		}
		todays_slider_page.onmouseover = function () {
			todays_slider_page.style.display = 'block';
		}
		todays_slider_page.onmouseout = function () {
			todays_slider_page.style.display = 'none';
		}
		todays_slider_panels[i].onmouseout = function () {
			todays_slider_page.style.display = 'none';
		}
	}
	//猜你喜欢 推荐刷新
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	guess_renovate.onclick = function () {
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				xmldoc = xmlhttp.responseXML;			 

				var ul_inner = xmldoc.getElementsByTagName("ul");

				if (guess_index >= ul_inner.length-1) {
					guess_index = 0;
				} else {
					guess_index++;
				}
				if (navigator.appName == "Microsoft Internet Explorer") {
					var tex = '';
					for (var i = 0; i < ul_inner[guess_index].childNodes.length; i++) {
						tex += ul_inner[guess_index].childNodes[i].xml
					}
					ajax_ul.innerHTML = tex;
				} else {
					ajax_ul.innerHTML = ul_inner[guess_index].innerHTML;
				}
			}
		}
		xmlhttp.open('GET', 'assets/xml/copy_jd.xml', true);
		xmlhttp.send();
	}

	//商品 一楼
	var lazy_wrap = document.getElementsByClassName('lazy_wrap')[1];
	var floor = document.getElementsByClassName('floor');
	

	if (navigator.appName == "Microsoft Internet Explorer") {
		
	}
})();