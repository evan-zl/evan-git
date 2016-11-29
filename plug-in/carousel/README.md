#介绍
用于焦点图片的轮播

#使用方法

```javascript
var transmit = new Transmit();

transmit.init({
	'trigger': '#focus', /*移动目标*/
	't': 2000, /*轮播间隔时间/单位毫秒*/
	'control': { /*上下翻页， 可无*/
		next: '.next', /*下一张*/
		prev: '.prev' /*上一张*/
	},
	'sign': { /*标记当前显示图片的位置 可无*/
		target: '#extra', /*所有标记的父级元素*/
		signColor: { /*标记背景颜色*/
			s: '#fff', /*位选中颜色*/
			e: '#f00' /*选中颜色*/
		}
	}
	
})
```


