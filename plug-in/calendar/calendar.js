/*
 * 日历插件
 */
function calendar(obj) {

    var calendarText = '';
    calendarText += '<div id="calendar">';
    calendarText += '<div class="top">';
    calendarText += '<a id="reduceMonth" href="javascript:;" class="icon toLeft"></a>';
    calendarText += '<div class="date center"><span id="year"></span>年<span id="month"></span>月</div>';
    calendarText += '<a id="addMonth" href="javascript:;" class="icon toRight"></a>';
    calendarText += '</div>';
    calendarText += '<div class="bot center">';
    calendarText += '<div id="week">';
    calendarText += '<ul class="clearFix">';
    calendarText += '<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>';
    calendarText += '</ul></div>';
    calendarText += '<div id="days">';
    calendarText += '</div></div></div>';

    /*
     * 呼出插件
     */
    obj.parent().after(calendarText);

    /*
     * @param data => 获取当前日期
     * @param year => 获取当前年份
     * @param month => 获取当天月份
     * @param days => 当前月份的天数
     * @param weekStart => 每个月第一天的星期
     * @param execute => 执行函数
     */
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var days;
    var weekStart;

    /*
     * @param wl => 获取星期的长度
     */
    var wl = $('#week li').length;

    var fn = {

        days: function(month) {
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

        setDay: function(days) {
            /*
             * 重置天数列表
             */
            date.setDate(1);
            weekStart = date.getDay();

            if (weekStart <= 5 && days <= 30 || weekStart > 5 && days < 30 || weekStart < 5) {


                $('#days').html('<ul class="clearFix"></ul>');
                for (var i = 1; i <= wl * 5; i++) {

                    $('#days ul').append('<li><span class="day"></span></li>');

                };

            } else if (weekStart >= 5 && days > 29) {

                $('#days').html('<ul class="clearFix"></ul>');
                for (var i = 1; i <= wl * 6; i++) {

                    $('#days ul').append('<li><span class="day"></span></li>');

                };

            }
        },

        showYearAndMonth: function() {
            /*
             * 显示当前年月
             */
            $('#year').html(year);
            $('#month').html(month);

        },

        showDays: function(days, weekStart) {

            var day = 1;
            $('#days li').each(function(n) {

                if (n >= weekStart) {

                    $(this).data('day', day).find('.day').html(day);

                     $(this).click(function() {

                        var d = $(this).data('day');

                        var day = $(this).find('.day').html();                      

                        $(this).html('<span class="day">' + day + '</span>');
                       
                        obj.val(year + '年' + month + '月' + d + '日');
                        $(this).css('color', '#e67a31').siblings().css('color', '#999');

                    });

                    day++;
                }

                if (day > days) {

                    return false;
                }

            });
        },

        execute: function() {

            fn.days(month);
            fn.setDay(days);
            fn.showYearAndMonth();
            fn.showDays(days, weekStart);

        }
    }


    fn.execute();


    /*
     * 查询下月份
     */
    $('#addMonth').click(function() {

        month++;
        if (month > 12) {

            year++;
            month = 1;
        }

        date.setMonth(month - 1);
        date.setYear(year);

        fn.execute();

    });

    /*
     * 查询上月份
     */
    $('#reduceMonth').click(function() {

        month--;
        if (month < 1) {

            year--;
            month = 12;
        }

        date.setMonth(month - 1);
        date.setYear(year);

        fn.execute();
    });
}
