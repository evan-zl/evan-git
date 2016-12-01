/* 2016-11-29 14:42:14 */
/*
 * 手机滑动选择日期
 * 放大效果
 */
window.touchSelectDate = function(ele) {
    var date = new Date();
    var touchDate = function() {
        this.target = document.querySelector(ele);
        this.defaultYear = date.getFullYear();
        this.defaultMonth = date.getMonth() + 1;
        this.defaultDay = date.getDate();
        this.days;
        this.minYear = 1900;
        this.maxYear = this.defaultYear + 200;
        this.container;
        // this.init();
    }
    touchDate.prototype = {
        init: function(param) {
            var self = this;
            if (param) {
                self.param = param;
                self.defaultYear = param.defaultYear;
                self.defaultMonth = param.defaultMonth;
                self.defaultDay = param.defaultDay;
                self.minYear = param.minYear;
                self.maxYear = param.maxYear;
            }
            self.execute();
        },

        execute: function() {
            var self = this;
            self.target.onclick = function() {
                popDate();
            }
            function popDate() {
                self.container = document.createElement('div');
                self.container.id = 'touchDate';
                self.container.innerHTML = '<div class="dateWrap">' +
                    '<div class="btnWrap clearFix">' +
                    '<a class="cancle" href="javascript:;">取消</a>' +
                    '<a class="confirm" href="javascript:;">确认</a>' +
                    '</div>' +
                    '<div class="main clearFix center">' +
                    '<div id="touchPanel"><div class="line">' +
                    '<div id="magnify">' +
                    '<div id="magnifyYear"><ul></ul></div>' +
                    '<div id="magnifyMonth"><ul></ul></div>' +
                    '<div id="magnifyDay"><ul></ul></div>' +
                    '</div>' +
                    '</div></div>' +
                    '<div id="year"><ul></ul></div>' +
                    '<div id="month"><ul></ul></div>' +
                    '<div id="day"><ul></ul></div>' +
                    '</div>' +
                    '</div>';
                self.close();
                document.body.appendChild(self.container);
                var touchPanel = document.getElementById('touchPanel');
                self.division = touchPanel.offsetWidth / 3;
                self.templateHei = touchPanel.getElementsByClassName('line')[0].offsetHeight;
                var year = document.getElementById('year').getElementsByTagName('ul')[0];
                var magnifyYear = document.getElementById('magnifyYear').getElementsByTagName('ul')[0];
                var month = document.getElementById('month').getElementsByTagName('ul')[0];
                var magnifyMonth = document.getElementById('magnifyMonth').getElementsByTagName('ul')[0];
                var day = document.getElementById('day').getElementsByTagName('ul')[0];
                var magnifyDay = document.getElementById('magnifyDay').getElementsByTagName('ul')[0];
                var cancle = self.container.getElementsByClassName('cancle')[0];
                var confirm = self.container.getElementsByClassName('confirm')[0];
                var timerYear, timerMonth, timerDay;
                year.style.top = (2 - (self.defaultYear - self.minYear)) * 2 + 'em';
                magnifyYear.style.top = (2 - (self.defaultYear - self.minYear)) * 2 + 'em';
                month.style.top = (3 - self.defaultMonth) * 2 + 'em';
                magnifyMonth.style.top = (3 - self.defaultMonth) * 2 + 'em';
                day.style.top = (3 - self.defaultDay) * 2 + 'em';
                magnifyDay.style.top = (3 - self.defaultDay) * 2 + 'em';
                setTimeout(function() {
                    showYear();
                    showMonth();
                    showDays();                    
                }, 50);
                touchPanel.addEventListener('touchstart', dateTouchStart, false);
                touchPanel.addEventListener('touchmove', dateTouchMove, false);
                touchPanel.addEventListener('touchend', dateTouchEnd, false);
                cancle.onclick = function() {
                    self.close();
                }
                confirm.onclick = function() {
                    if (self.defaultMonth < 10) {
                        self.defaultMonth = '0' + self.defaultMonth;
                    }
                    if (self.defaultDay < 10) {
                        self.defaultDay = '0' + self.defaultDay;
                    }
                    self.target.value = self.defaultYear + '-' + self.defaultMonth + '-' + self.defaultDay;
                    self.close();
                }

                function showYear() {
                    for (var i = self.minYear; i <= self.maxYear; i++) {
                        year.innerHTML += '<li>' + i + '</li>';
                        magnifyYear.innerHTML += '<li>' + i + '</li>';
                    }
                    self.yearLen = year.children.length;
                };

                function showMonth() {
                    for (var i = 1; i <= 12; i++) {
                        if (i < 10) {
                            i = '0' + i;
                        }
                        month.innerHTML += '<li>' + i + '</li>';
                        magnifyMonth.innerHTML += '<li>' + i + '</li>';
                    }
                    self.monthLen = month.children.length;
                };

                function showDays() {
                    self.getDays();
                    day.innerHTML = '';
                    magnifyDay.innerHTML = '';
                    var tp = day.offsetTop;
                    for (var i = 1; i <= self.days; i++) {
                        if (i < 10) {
                            i = '0' + i;
                        }
                        day.innerHTML += '<li>' + i + '</li>';
                        magnifyDay.innerHTML += '<li>' + i + '</li>';
                    }
                    self.dayLen = day.children.length;
                    var ln = day.children.length;
                    if (tp <= -(ln -3) * self.templateHei) {
                        this.days = ln;
                        self.animate(day, 600, -(ln - 3) * self.templateHei);
                        self.animate(magnifyDay, 600, -(ln - 3) * self.templateHei);
                    }
                };

                function dateTouchStart(e) {
                    e.preventDefault();
                    var touch = e.targetTouches[0];
                    x = touch.pageX;
                    end = 0;
                    startPos = touch.pageY;
                    if (x < self.division) {
                        yearTop = year.offsetTop;
                        clearInterval(timerYear);
                    } else if (x > self.division && x < self.division * 2) {
                        monthTop = month.offsetTop;
                        clearInterval(timerMonth);
                    } else {
                        dayTop = day.offsetTop;
                        clearInterval(timerDay);
                    }
                };

                function dateTouchMove(e) {
                    e.preventDefault();
                    var touch = e.targetTouches[0];
                    movePos = touch.pageY - startPos;                    
                    sw = movePos - end;
                    end = movePos;
                    if (x < self.division) {
                        year.style.top = movePos + yearTop + 'px';
                        magnifyYear.style.top = movePos + yearTop + 'px';
                    } else if (x > self.division && x < self.division * 2) {
                        month.style.top = movePos + monthTop + 'px';
                        magnifyMonth.style.top = movePos + monthTop + 'px';
                    } else {
                        day.style.top = movePos + dayTop + 'px';
                        magnifyDay.style.top = movePos + dayTop + 'px';
                    }
                };

                function dateTouchEnd(e) {
                    e.preventDefault();
                    var touch = e.changedTouches[0];
                    endPos = touch.pageY - startPos;                    
                    if (endPos < 10 && endPos > -10) {
                        sw = 0;
                    }
                    if (x < self.division) {
                        endPosYear = endPos;
                        swingYear = sw;
                        yearTe = year.offsetTop;
                        var t1 = 0;
                        timerYear = setInterval(function() {
                            t1 += swingYear;
                            swingYear *= 0.96;
                            yearL = endPosYear + yearTop + t1;
                            len1 = self.yearLen - 2;
                            if (yearL >= self.templateHei * 2) {
                                t1 = self.templateHei * 2 - yearTe;
                                swingYear = 0;
                            } else if (yearL <= -(len1 * self.templateHei)) {
                                t1 = -(len1 * self.templateHei) - yearTe;
                                swingYear = 0;
                            }
                            year.style.top = yearTe + t1 + 'px';
                            magnifyYear.style.top = yearTe + t1 + 'px';
                            if (Math.abs(swingYear) < 1) {
                                clearInterval(timerYear);
                                s1 = parseInt(-yearL / self.templateHei) + 2;
                                surplusYear = -yearL % self.templateHei;
                                if (surplusYear > self.templateHei / 2) {
                                    s1 += 1;
                                }
                                if (s1 >= self.yearLen -1) {
                                    s1 = self.yearLen -1;
                                } else if (s1 <= 0) {
                                    s1 = 0;
                                }
                                self.defaultYear = self.minYear + s1;
                                showDays();
                                self.animate(year, 600, (2 - s1) * self.templateHei);
                                self.animate(magnifyYear, 600, (2 - s1) * self.templateHei);
                            }
                           
                        }, 30);

                    } else if (x > self.division && x < self.division * 2) {
                        endPosMonth = endPos;
                        swingMonth = sw;
                        monthTe = month.offsetTop;
                        var t2 = 0;
                        timerMonth = setInterval(function() {
                            t2 += swingMonth;
                            swingMonth *= 0.96;
                            monthL = endPosMonth + monthTop + t2;
                            len2 = self.monthLen - 2;
                            if (monthL >= self.templateHei * 2) {
                                t2 = self.templateHei * 2 - monthTe;
                                swingMonth = 0;
                            } else if (monthL <= -(len2 * self.templateHei)) {
                                t2 = -(len2 * self.templateHei) - monthTe;
                                swingMonth = 0;
                            }
                            month.style.top = monthTe + t2 + 'px';
                            magnifyMonth.style.top = monthTe + t2 + 'px';
                            if (Math.abs(swingMonth) < 1) {
                                clearInterval(timerMonth);
                                s2 = parseInt(-monthL / self.templateHei) + 2;
                                surplusMonth = -monthL % self.templateHei;
                                if (surplusMonth > self.templateHei / 2) {
                                    s2 += 1;
                                }
                                if (s2 >= self.monthLen -1) {
                                    s2 = self.monthLen -1;
                                } else if (s2 <= 0) {
                                    s2 = 0;
                                }
                                self.defaultMonth = 1 + s2;
                                showDays();
                                self.animate(month, 600, (2 - s2) * self.templateHei);
                                self.animate(magnifyMonth, 600, (2 - s2) * self.templateHei);
                            }
                        }, 30);
                    } else {
                        endPosDay = endPos;
                        swingDay = sw;
                        dayTe = day.offsetTop;
                        var t3 = 0;
                        timerDay = setInterval(function() {
                            t3 += swingDay;
                            swingDay *= 0.96;
                            dayL = endPosDay + dayTop + t3;
                            len3 = self.dayLen - 2;
                            if (dayL >= self.templateHei * 2) {
                                t3 = self.templateHei * 2 - dayTe;
                                swingDay = 0;
                            } else if (dayL <= -(len3 * self.templateHei)) {
                                t3 = -(len3 * self.templateHei) - dayTe;
                                swingDay = 0;
                            }
                            day.style.top = dayTe + t3 + 'px';
                            magnifyDay.style.top = dayTe + t3 + 'px';
                            if (Math.abs(swingDay) < 1) {
                                clearInterval(timerDay);
                                s3 = parseInt(-dayL / self.templateHei) + 2;
                                surplusDay = -dayL % self.templateHei;
                                if (surplusDay > self.templateHei / 2) {
                                    s3 += 1;
                                }
                                if (s3 >= self.dayLen -1) {
                                    s3 = self.dayLen -1;
                                } else if (s3 <= 0) {
                                    s3 = 0;
                                }
                                self.defaultDay = 1 + s3;
                                self.animate(day, 600, (2 - s3) * self.templateHei);
                                self.animate(magnifyDay, 600, (2 - s3) * self.templateHei);
                            }
                        }, 30);
                    }
                }
            }
            
        },

        getDays: function() {
            if (this.defaultMonth == 2) {
                return this.days = this.defaultYear % 4 == 0 ? 29 : 28;
            } else if (this.defaultMonth == 1 || this.defaultMonth == 3 || this.defaultMonth == 5 || this.defaultMonth == 7 || this.defaultMonth == 8 || this.defaultMonth == 10 || this.defaultMonth == 12) {
                return this.days = 31;
            } else {
                return this.days = 30;
            }
        },

        animate: function(obj, t, w) {
            if (obj.timer) {
             clearTimeout(obj.timer);
            }
            var s = 0;
            var ts = t / 20;
            var l = obj.offsetTop;
            var w = w - l;
            var ws = w / 20;
            (function add() {
                s++;
                if (s > 20) {
                    return s = 0;
                }
                l += ws;
                obj.style.top = l + 'px';
                obj.timer = setTimeout(add, ts);
            }())

        },

        close: function() {
            var touchDate = document.getElementById("touchDate");
            if (touchDate && touchDate.parentNode) {
                touchDate.parentNode.removeChild(touchDate);
            }
        }
    }
    return new touchDate;
}
