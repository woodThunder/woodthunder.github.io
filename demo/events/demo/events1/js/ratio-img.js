$(function () {
    imgratio()//初始化图片ratio

    setTimeout(function () {
        imgratio();
    }, 200)

    $(".ratio-img").each(function (index, element) {
        $(this).attr({ "src": $(this).data("src") });//图片预加载 
    });

    //窗口改变大小回调ratio；
    var rtime = new Date();
    var timeout = false;
    var delta = 200;
    $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta); //resize只回调最后一次
        }
    });
    function resizeend() {  //window.resize回调
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            imgratio()//ratio
        }
    }
    //
})
function imgratio() {//图片 ratio方法调用
    $(".ratio-img").each(function (index, element) {
        if ($(this).is(":visible")) {
            $(this).css({ height: Math.floor($(this).width() * $(this).data("ratio")) });
        }
    });
}
//无图图像
var nullimg = '/images/null.gif';
function lod(t) {
    t.onerror = null;
    t.src = nullimg
}
$(function () {
    $(".ratio-img").each(function () {
        if ($(this).attr("src") == "") {
            $(this).attr({ "src": nullimg })
        }
    })
})