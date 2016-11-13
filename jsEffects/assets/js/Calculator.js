/*
 * 计算器
 */

var show = document.getElementById('show');

var keys = document.getElementsByTagName('a');

var num = 0; //输入的数值
var result = 0; //计算结果
var numshow = "0"; //显示的数值
var operate = 0; //判断输入状态的标志
var calcul = 0; //判断计算状态的标志
var quit = 0; //防止重复按键的标志

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function() {
        text = this.textContent;
        str = String(show.textContent);

        switch (text) {
            case "AC": //清除
                num = 0;
                result = 0;
                numshow = "0";
                show.textContent = "0"
                break;

            case "←": //退位
                str = (str != "0") ? str : "";
                str = str.substr(0, str.length - 1);
                str = (str != "") ? str : "0";
                show.textContent = str;
                break;

            case ".": //小数点
                str = (str != "0") ? ((operate == 0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"
                for (var i = 0; i < str.length; i++) { //判断是否已经有一个点号
                    if (str.substr(i, 1) == ".") return false; //如果有则不再插入
                }
                str = str + ".";
                show.textContent = str;
                break;

            case "+/-": //正负数
                str = -str;
                show.textContent = str;
                break;

            case "+": //加法
                calculate(); //调用计算函数
                operate = 1; //更改输入状态
                calcul = 1; //更改计算状态
                break;

            case "-":
                calculate();
                operate = 1;
                calcul = 2;
                break;

            case "X":
                calculate();
                operate = 1;
                calcul = 3;
                break;

            case "/":
                calculate();
                operate = 1;
                calcul = 4;
                break;

            case "%":
                calculate();
                operate = 1;
                calcul = 5;
                break;

            case "=":
                calculate();
                operate = 1;
                num = 0;
                result = 0;
                numshow = "0";
                break;

            default:
                str = (str != "0") ? ((operate == 0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值;
                str = str + text; //给当前值追加字符
                show.textContent = str; //刷新显示
                operate = 0; //重置输入状态
                quit = 0; //重置防止重复按键的标志

        }
    }
}

function calculate() {
    numshow = Number(show.textContent);
    if (num != 0 && quit != 1) { //判断前一个运算数是否为零以及防重复按键的状态
        switch (calcul) { //判断要输入状态
            case 1:
                result = num + numshow;
                break;
            case 2:
                result = num - numshow;
                break;
            case 3:
                result = num * numshow;
                break;
            case 4:
                result = num / numshow;
                break;
            case 5:
                result = num % numshow;
                break;
        }
        quit = 1; //避免重复按键
    } else {
        result = numshow;
    }
    numshow = String(result);
    show.textContent = numshow;
    num = result; //存储当前值
}
