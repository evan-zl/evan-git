/* 2016-11-27 20:32:21 */
/*
 * PC日历插件
 */
window.calendar = function(ele) {
    var Cal = function() {
        this.target = document.querySelector(ele);
        this.container;
        this.init();
    }
    Cal.prototype = {
        init: function() {
            this.date = new Date();
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth() + 1;
            this.getDays();
            this.execute();
        },

        execute: function() {
            var self = this;
            function popCal() {
                self.container = document.createElement('div');
                self.container.id = 'calendar';
                self.container.innerHTML = '<div class="top">' +
                    '<a id="reduceMonth" href="javascript:;">&lt;</a>' +
                    '<div class="center"><span id="calendarYear">2016</span> 年 <span id="calendarMonth">12</span> 月 </div>' +
                    '<a id="addMonth" href="javascript:;">&gt;</a>' +
                    '</div>' +
                    '<div class="bot center">' +
                    '<div id="calendarWeek">' +
                    '<ul class="clearFix">' +
                    '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>' +
                    '</ul></div>' +
                    '<div id="calendarDays">' +
                    '<ul class="clearFix">' +
                    '</ul></div></div>';
                self.close();
                document.body.appendChild(self.container);
                var reduceMonth = document.getElementById('reduceMonth');
                var addMonth = document.getElementById('addMonth');
                var calendarYear = document.getElementById('calendarYear');
                var calendarMonth = document.getElementById('calendarMonth');
                var calendarDays = document.getElementById('calendarDays');
                var calendarDaysWrap = calendarDays.getElementsByTagName('ul')[0];
                self.showYearAndMonth(calendarYear, calendarMonth);
                self.setDays(calendarDaysWrap);
                self.showDays(calendarDaysWrap)
                reduceMonth.onclick = function() {
                    self.month--;
                    if (self.month < 1) {
                        self.year--;
                        self.month = 12;
                    }
                    self.date.setMonth(self.month - 1);
                    self.date.setYear(self.year);
                    self.getDays();
                    self.getWeekStart();
                    self.showYearAndMonth(calendarYear, calendarMonth);
                    self.setDays(calendarDaysWrap);
                    self.showDays(calendarDaysWrap);
                }
                addMonth.onclick = function() {
                    self.month++;
                    if (self.month > 12) {
                        self.year++;
                        self.month = 1;
                    }
                    self.date.setMonth(self.month - 1);
                    self.date.setYear(self.year);
                    self.getDays();
                    self.getWeekStart();
                    self.showYearAndMonth(calendarYear, calendarMonth);
                    self.setDays(calendarDaysWrap);
                    self.showDays(calendarDaysWrap);
                }
            }
            self.target.onclick = function(e) {
                popCal();
                var a = document.getElementById("calendar");
                var x = this.offsetLeft;
                var y = this.offsetTop + this.offsetHeight;
                if ((x + a.offsetWidth) > document.body.clientWidth) {
                    x = document.body.clientWidth - a.offsetWidth;
                    if (x < 0) {
                        x = 0;
                    }
                }
                self.container.left = x;
                a.style.top = y + 'px';
                a.style.left = x + 'px';
            }
            window.onresize = function() {
                var a = document.getElementById("calendar");
                if (a && (a.offsetWidth + a.offsetLeft) > document.body.clientWidth && a.offsetLeft > 0) {
                    a.style.left = document.body.clientWidth - a.offsetWidth + 'px';
                } else if (a && a.offsetLeft < self.container.left && (a.offsetWidth + a.offsetLeft) < document.body.clientWidth) {
                    a.style.left = document.body.clientWidth - a.offsetWidth + 'px';
                } else if (a && (document.body.clientWidth - a.offsetWidth) > self.container.left) {
                    a.style.left = self.container.left + 'px';
                }
            }
            document.documentElement.onclick = function(e) {
                var a = document.getElementById("calendar");
                if (e.target.getAttribute("data-type") == "calendar") {
                    return;
                };

                function toNode(node) {
                    var p = node.parentNode;
                    if (a && node.nodeType == 1) {
                        if (a.getAttribute("id") == node.getAttribute("id")) {
                            return true;
                        } else {
                            return toNode(p);
                        }
                    } else {
                        return false;
                    }
                };
                var rs = toNode(e.target);
                if (!rs) {
                    self.close();
                };
            }
        },

        /* 根据月数判断每月天数 */
        getDays: function() {
            if (this.month == 2) {
                return this.days = this.year % 4 == 0 ? 29 : 28;
            } else if (this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10 || this.month == 12) {
                return this.days = 31;
            } else {
                return this.days = 30;
            }
        },

        /* 获取当月1号是星期几 */
        getWeekStart: function() {
            this.date.setDate(1);
            return this.weekStart = this.date.getDay();
        },

        /* 显示年月 */
        showYearAndMonth: function(year, month) {
            year.innerHTML = this.year;
            month.innerHTML = this.month;
        },

        /* 重置列表 */
        setDays: function(ele) {
            this.getWeekStart();
            ele.innerHTML = '';
            if (this.weekStart <= 5 && this.days <= 30 || this.weekStart > 5 && this.days < 30 || this.weekStart < 5) {
                for (var i = 1; i <= 35; i++) {
                    ele.innerHTML += '<li></li>';
                }
            } else if (this.weekStart >= 5 && this.days > 29) {
                for (var i = 1; i <= 42; i++) {
                    ele.innerHTML += '<li></li>';
                };
            };
        },

        /* 显示日期 */
        showDays: function(ele) {
            var dayList = ele.getElementsByTagName('li');
            var len = dayList.length;
            var self = this;
            var day = 1;
            for (var i = 0; i < len; i++) {
                if (i >= self.weekStart) {
                    dayList[i].innerHTML = '<span class="day">' + day + '</span>';
                    dayList[i].onclick = function() {
                        var d = this.textContent;
                        self.target.value = self.year + '年' + self.month + '月' + d + '日';
                        self.close();
                    };
                    day++;
                };
                if (day > self.days) {
                    return false;
                }
            }
        },

        close: function() {
            var cal = document.getElementById("calendar");
            if (cal && cal.parentNode) {
                cal.parentNode.removeChild(cal);
            }
        }
    }

    return new Cal;
}
