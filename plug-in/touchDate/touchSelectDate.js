/*滑动选择日期*/
function touchSelectDate(obj) {

    /*
     * @param minY => 获取最小年份
     * @param maxY => 获取最大年份
     * @param year => 获取默认年份
     * @param month => 获取默认月份
     * @param day => 获取默认天
     */
    var minY = obj.minYear;
    var maxY = obj.maxYear;
    var year = obj.defaultYear;
    var month = obj.defaultMonth;
    var day = obj.defaultDay;

    /*
     * 插件容器
     */
    var container = '<div id="date">' +
        '<div class="dateWrap">' +
        '<div class="btnWrap clearFix">' +
        '<a class="cancle" href="javascript:;">取消</a>' +
        '<a class="confirm" href="javascript:;">确认</a>' +
        '</div>' +
        '<div class="main clearFix center">' +
        '<div id="touchPanel"><div class="line"></div></div>' +
        '<div id="year"><ul></ul></div>' +
        '<div id="month"><ul></ul></div>' +
        '<div id="day"><ul></ul></div>' +
        '</div>' +
        '</div>' +
        '</div>';

    /*呼出插件*/
    $(document.body).append(container);

    /*选中默认年月日*/
    $('#year ul').css('top', (4 - (year + 2 - minY)) * 2 + 'em');
    $('#month ul').css('top', (4 - (month + 1)) * 2 + 'em');
    $('#day ul').css('top', (4 - (day + 1)) * 2 + 'em');

    for (var i = minY; i <= maxY; i++) {

        $('#year ul').append('<li>' + i + '</li>');

    }

    for (var i = 1; i <= 12; i++) {

        if (i < 10) {

            i = '0' + i;
        }

        $('#month ul').append('<li>' + i + '</li>');

    }

    /*
     * 输出天数
     * @param setDay => 重置天数
     * @param judge => 根据月份判断天数
     * @param execute => 执行
     */
    var fn = {

        setDay: function() {

            $('#day ul').html('');

            this.judge();

            var tp = $('#day ul').position().top;

            for (var i = 1; i <= days; i++) {

                if (i < 10) {

                    i = '0' + i;
                }

                $('#day ul').append('<li>' + i + '</li>');

            }

            var ln = $('#day ul').children().length;
            var h = $('#day li').height();

            if(tp <=  -(ln - 3) * h) {

                day = ln;

                $('#day ul').animate({'top': -(ln - 3) * h}, 'fast');
            }

        },

        judge: function() {

            /*
             * 当月份为二月时，根据闰年还是非闰年判断天数
             * 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
             * 其他月份，天数为：30.
             */
            if (month == 2) {

                days = year % 4 == 0 ? 29 : 28;

            } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {

                days = 31;

            } else {

                days = 30;

            }

        },

        execute: function() {

            this.setDay();
        }

    };

    fn.execute();

    /*
     * 取消与确认
     */
    $('#date .cancle').click(function() {
        $('#date').remove();
    })

    $('#date .confirm').click(function() {

        if (month < 10) {

            month = '0' + month;

        }

        obj.target.val(year + '-' + month + '-' + day);
        $('#date').remove();
    })

    /*获取主控对象*/
    var touchPanel = document.getElementById('touchPanel');
    
    touch();
    var timing1, timing2, timing3;

    /*手机设备 滑动 事件*/
    function touch() {
        /*
         *  滑动开始
         *	@param touch => 获取开始第一个触点
         *  @param x => 获取 X 坐标值
         *  @param startPos => 获取 Y 坐标值
         *  @param division => 获取分割点
         *  @param templateHei => 获取单个高度
         *  @param **Top => 获取 各自的 top 值
         *  @param **Len => 获取 各自的子项长度
         */
        function touchSatrt(e) {

            try {

                e.preventDefault(); /*阻止浏览器的默认缩放，滚动*/

                var touch = e.targetTouches[0];
                x = touch.pageX;
                startPos = touch.pageY;

                division = touchPanel.offsetWidth / 3;
                templateHei = $('#touchPanel .line').outerHeight();

                yearLen = $('#year ul').children().length;
                monthLen = $('#month ul').children().length;
                dayLen = $('#day ul').children().length;

                if (x < division) {

                    yearTop = $('#year ul').position().top;
                    clearInterval(timing1);


                } else if (x > division && x < division * 2) {

                    monthTop = $('#month ul').position().top;
					clearInterval(timing2);

                } else {

                    dayTop = $('#day ul').position().top;
                    clearInterval(timing3);

                };

            } catch (e) {

                alert("touchStart:" + e.message);

            };
        };

        /**
         * 滑动中 
         * @param touch => 获取滑动的第一个触点
         * @param movePos => 计算移动的 Y 坐标距离
         * @param move => 对象滑动的距离
         */
        function touchMove(e) {


            try {

                e.preventDefault();

                var touch = e.targetTouches[0];
                movePos = touch.pageY - startPos;

                if (x < division) {

                    move1 = movePos + yearTop;
                    $('#year ul').css('top', move1);

                } else if (x > division && x < division * 2) {

                    move2 = movePos + monthTop;
                    $('#month ul').css('top', move2);

                } else {

                    move3 = movePos + dayTop;
                    $('#day ul').css('top', move3);

                }


            } catch (e) {

                alert('touchMove:' + e.message);
            };

        };

        /**
         * 滑动结束 
         * @param touch = > 获取结束的第一个触点;
         * @param t => 滑动结束后滑行的距离
         * @param swing => 滑行的速度
         */
        function touchEnd(e) {

            try {

                e.preventDefault();

                var touch = e.changedTouches[0];
                endPos = touch.pageY - startPos;

                var t1 = 0;
                var t2 = 0;
                var t3 = 0;

                if (endPos < 10 && endPos > -10) {

                	movePos = 0;

                }

                if (x < division) {

                    endPos1 = endPos;

                    swing1 = movePos / 20;
                    $('#year ul').stop(true, true);

                    /*定时滑行*/
                    timing1 = setInterval(function() {

                        t1 += swing1;
                        swing1 *= 0.96;

                        /*
                         * @param l => 滑动对象的最终 top 值
                         * @param len => 滑动对象的 top 的最大转换单个子项个数
                         */
                        l1 = endPos1 + yearTop + t1;
                        len1 = yearLen - 2;

                        /*限制 t 的范围*/
                        if (l1 >= templateHei * 2) {

                            t1 = templateHei * 2 - move1;
                            swing1 = 0;

                        } else if (l1 <= -(len1 * templateHei)) {

                            t1 = -(templateHei * len1) - move1;
                            swing1 = 0;

                        }


                        if (Math.abs(swing1) < 1) {

                            clearInterval(timing1);

                            /*滑动的个数*/
                            s1 = parseInt(-l1 / templateHei) + 2;

                            /*滑行的余数*/
                            surplus = -l1 % templateHei;

                            /*判断余数是否大于 单个高度的 二分之一*/
                            if (surplus > templateHei / 2) {

                                s1 += 1;

                            }

                            if (s1 >= yearLen - 1) {

                                s1 = yearLen - 1;

                            } else if (s1 <= 0) {

                                s1 = 0;

                            }

                            year = minY + s1;

                            $('#year ul').animate({ 'top': 4 - s1 * 2 + 'em' }, 'fast');

                        }
                        
                        $('#year ul').css('top', move1 + t1);

                    }, 30);

                } else if (x > division && x < division * 2) {

                    endPos2 = endPos;

                    swing2 = movePos / 20;
                    $('#month ul').stop(true, true);

                    /*定时滑行*/
                    timing2 = setInterval(function() {

                        t2 += swing2;
                        swing2 *= 0.96;

                        /*
                         * @param l => 滑动对象的最终 top 值
                         * @param len => 滑动对象的 top 的最大转换单个子项个数
                         */
                        l2 = endPos2 + monthTop + t2;
                        len2 = monthLen - 2;

                        /*限制 t 的范围*/
                        if (l2 >= templateHei * 2) {

                            t2 = templateHei * 2 - move2;
                            swing2 = 0;

                        } else if (l2 <= -(len2 * templateHei)) {

                            t2 = -(templateHei * len2) - move2;
                            swing2 = 0;

                        }

                        if (Math.abs(swing2) < 1) {

                            clearInterval(timing2);

                            /*滑动的个数*/
                            s2 = parseInt(-l2 / templateHei) + 2;

                            /*滑行的余数*/
                            surplus = -l2 % templateHei;

                            /*判断余数是否大于 单个高度的 二分之一*/
                            if (surplus > templateHei / 2) {

                                s2 += 1;

                            }

                            if (s2 >= monthLen - 1) {

                                s2 = monthLen - 1;

                            } else if (s2 <= 0) {

                                s2 = 0;

                            }

                            month = s2 + 1;
                            fn.setDay();

                            $('#month ul').animate({ 'top': 4 - s2 * 2 + 'em' }, 'fast');

                        }

                        $('#month ul').css('top', move2 + t2);

                    }, 30);

                } else {

                    endPos3 = endPos;

                    swing3 = movePos / 20;
                    $('#day ul').stop(true, true);

                    /*定时滑行*/
                    timing3 = setInterval(function() {

                        t3 += swing3;
                        swing3 *= 0.96;

                        /*
                         * @param l => 滑动对象的最终 top 值
                         * @param len => 滑动对象的 top 的最大转换单个子项个数
                         */
                        l3 = endPos3 + dayTop + t3;
                        len3 = dayLen - 2;

                        /*限制 t 的范围*/
                        if (l3 >= templateHei * 2) {

                            t3 = templateHei * 2 - move3;
                            swing3 = 0;

                        } else if (l3 <= -(len3 * templateHei)) {

                            t3 = -(templateHei * len3) - move3;
                            swing3 = 0;

                        }

                        if (Math.abs(swing3) < 1) {

                            clearInterval(timing3);

                            /*滑动的个数*/
                            s3 = parseInt(-l3 / templateHei) + 2;

                            /*滑行的余数*/
                            surplus = -l3 % templateHei;

                            /*判断余数是否大于 单个高度的 二分之一*/
                            if (surplus > templateHei / 2) {

                                s3 += 1;
                                
                            }

                            if (s3 >= dayLen - 1) {

                                s3 = dayLen - 1;

                            } else if (s3 <= 0) {

                                s3 = 0;

                            }

                            day = s3 + 1;

                            $('#day ul').animate({ 'top': 4 - s3 * 2 + 'em' }, 'fast');

                        }

                        $('#day ul').css('top', move3 + t3);

                    }, 30);

                }

            } catch (e) {

                // alert('touchEnd:' + e.message);
            };

        };

        function bindEvent(e) {

            touchPanel.addEventListener('touchstart', touchSatrt, false);
            touchPanel.addEventListener('touchmove', touchMove, false);
            touchPanel.addEventListener('touchend', touchEnd, false);

        };

        function isTouchDevice(e) {

            try {

                bindEvent();

            } catch (e) {

                alert('不支持TouchEvent事件！' + e.message);

            }
        };

        isTouchDevice();
    };

}
