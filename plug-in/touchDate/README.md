#介绍
此插件是基于jquery 而写，用之前必须引入JQ 插件

#使用方法
绑定 input 点击事件，调用touchSelectDate(obj);

obj 属性如下：

```javascript
 obj = {
    target: , /*-- 触发选择控件的文本框，同时选择完毕后日期输出到该位置 --*/
    minYear: , /*-- 日期最小年份 --*/
    maxYear: , /*-- 日期最大年份 --*/
    defaultYear: , /*-- 日期默认年份 --*/
    defaultMonth: , /*-- 日期默认月份 --*/
    defaultDay:   /*-- 日期默认天 --*/
}
```


