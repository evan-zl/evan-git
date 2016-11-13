/*
 * 跳棋 
 */

$(function() {
    var children = document.querySelectorAll(".child");
    var face_1 = document.querySelectorAll(".face_1");

    var index = 0;
    var index_ = 0;

    function set() {
        face_1[index].style.border = "2px solid red";
        children[index].setAttribute("class", "list" + Number(index + 1) + " child mark")
        for (var i = 0; i < children.length; i++) {
            if (i != index) {
                face_1[i].style.border = "2px solid #000";
                children[i].setAttribute("class", "list" + Number(i + 1) + " child");
            }
        }
    };

    $(".btn").click(function() {
        $(this).val("prohibit!").attr("disabled", "disabled");
        var ran = Math.random() * 6 + 1;
        ran = parseInt(ran);
        $(".step").text("恭喜你，前进 " + ran + " 步！");

        function jump() {
            index_ += 1;
            index++;
            if (index > children.length - 1) {
                index = children.length - 1 - ran + index_ - 1;
                $(".btn").removeAttr("disabled").val("Click Me!");
                set();
                return index_ = 0;
            }
            set();

            if (index_ >= ran && index < children.length) {
                $(".btn").removeAttr("disabled").val("Click Me!");
                var go = children[index].getAttribute("data-go");
                go = Number(go);
                if (go > 0) {
                    alert("恭喜你！继续前进 " + go + " 格！");
                } else if (go < 0) {
                    alert("很遗憾！倒退 " + go + " 格");
                }
                index = index + go;
                set();
                if (index == children.length - 1) {
                    $(document.body).css('overflow', 'hidden');
                    $(".over").css("display", "block");
                }
                return index_ = 0;
            }
            setTimeout(function() { jump(); }, 500);
        }
        jump();
    });
});
