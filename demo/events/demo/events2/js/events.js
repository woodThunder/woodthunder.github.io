window.onload = function(){	
	/*企业荣誉左侧轮播....................................................start*/
    var swiper = new Swiper('.about_history .part_1 .swiper-container', {
        slidesPerView: 11,
        centeredSlides: true,
        mousewheelControl: true,
        direction :'vertical',
        initialSlide :5,//设定初始化时slide的索引。
        resistanceRatio : 0.3,
        followFinger : true,
        slideToClickedSlide: true,//设置为true则点击slide会过渡到这个slide。
        breakpoints: { 
            1023: {
              slidesPerView: 7,
              initialSlide :4,
            }
        },
        onTouchMove: function (swiper) {
            //jQuery.getScript("../js/ratio-img.js");
            his_position();
            hisAjax($(".swiper-slide-active a").attr("href"));
        },
        onTouchEnd: function (swiper) {
            //jQuery.getScript("../js/ratio-img.js");
            his_position();
            hisAjax($(".swiper-slide-active a").attr("href"));
        },
        onSlideChangeStart: function (swiper) {
            //jQuery.getScript("../js/ratio-img.js");
            his_position();
            hisAjax($(".swiper-slide-active a").attr("href"));
        },
        onInit: function(swiper){
            //jQuery.getScript("../js/ratio-img.js");
            his_position();
            hisAjax($(".swiper-slide-active a").attr("href"));

        }
    });
    function his_position() {
        $(".swiper-slide").removeClass("prev_nth2Mode next_nth2Mode prev_nth3Mode next_nth3Mode prev_nth4Mode next_nth4Mode prev_nth5Mode next_nth5Mode prev_nth6Mode next_nth6Mode");
        $(".swiper-slide-active").prev().addClass("prev_nth2Mode");
        $(".swiper-slide-active").next().addClass("next_nth2Mode");
        $(".swiper-slide-active").prev().prev().addClass("prev_nth3Mode");
        $(".swiper-slide-active").next().next().addClass("next_nth3Mode");
        $(".swiper-slide-active").prev().prev().prev().addClass("prev_nth4Mode");
        $(".swiper-slide-active").next().next().next().addClass("next_nth4Mode");
        $(".swiper-slide-active").prev().prev().prev().prev().addClass("prev_nth5Mode");
        $(".swiper-slide-active").next().next().next().next().addClass("next_nth5Mode");
        $(".swiper-slide-active").prev().prev().prev().prev().prev().addClass("prev_nth6Mode");
        $(".swiper-slide-active").next().next().next().next().next().addClass("next_nth6Mode");
    }
    function hisAjax(url) {
        $.ajax({
            url: url,
            type: "GET",
            success: function (msg) {
                $('#content').html(msg)
            }
        });
    }
    $(".about_history .part_1 .swiper-slide a").click(function(event){
        event.preventDefault(); 
    });
}