#介绍
用于mobile 弹出式日期插件

#使用方法
设定目标为'input'标签，并自定义'id'属性;
使用js 调用 touchSelectDate(#id).init({可传参数});

```javascript
touchSelectDate('#touchSelectDate1').init({
	minYear: 1900,
    maxYear: 2100,
    defaultYear: year,
    defaultMonth: month,
    defaultDay: day
});
```


