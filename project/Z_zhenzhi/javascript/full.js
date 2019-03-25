$(document).ready(function(){
	audioAutoPlay('media');

	$('#imgwrap').imagesLoaded( function() {
	  // 图片加载后执行的方法
	  full();
	});
	
//		$("#media").get(0).play();
	$("#audio_btn").click(function(){
		var audio = $("#media");
		if(audio.get(0).paused){                 
		    audio.get(0).play();
		    $(this).addClass("rotate");
		}else{
		    audio.get(0).pause();
		    $(this).removeClass("rotate");
		}
	})
//	
//	$(".fp-auto-height.fp-section").height($(".fp-auto-height .fp-tableCell").height());
	
})
function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {//微信
       play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {//易信
              play();
        }, false);
    document.addEventListener("touchstart",play, false);
}
function full(){
	$('#dowebok').fullpage({
    	scrollBar: true,
//	    	slidesNavigation: true, //slide分页
    	loopHorizontal: false,//slide是否循环滑动
    	afterRender: function () {
    		$(".loading").hide();
    		setTimeout(function(){$(".section:nth-child(1)").addClass("on");},0)
//	    		$(".sectionBg").addClass("on");
            $(".section:first-child").find(".animated").each(function () {
                add($(this));
            });
//              $(".section3").find(".animated").each(function () {
//                  $(this).css("opacity","0");
//              });
        },
        //滚动前的回调函数
        onLeave: function (index, nextIndex) {
//          	console.log(index, nextIndex);
			$(".section" + index).find(".animated").each(function () {
                reduce($(this));
            });
            $(".section" + nextIndex).find(".animated").each(function () {
                add($(this));
            });
              
        	if(nextIndex == 3){
                $(".section" + nextIndex).find(".animated").each(function () {
                    reduce($(this));
                });
        		$(".slide.active").find(".animated").each(function () {
//          			$(this).css("display","block");
                    add($(this));
                });
        	}
                
        },
        afterSlideLoad: function (anchorLink,index,slideIndex,direction) {
        	
//              $(".slide").find(".animated").each(function () {
//                  reduce($(this));
//              });
//              $(".slide"+slideIndex).find(".animated").each(function () {
//                  add($(this));
//              });

            if(slideIndex==1||slideIndex==2){
            	$(".fp-controlArrow.fp-prev").addClass("disabled");
            }
        },
        onSlideLeave: function (anchorLink,index,slideIndex,direction,nextSlideIndex) {
            if(nextSlideIndex==1||nextSlideIndex==2){
            	$(".fp-controlArrow.fp-prev").addClass("disabled");
            }
            if(nextSlideIndex==3){
            	$(".fp-controlArrow.fp-prev").removeClass("disabled");
            }
            
            
//          	console.log(anchorLink,index,slideIndex,nextSlideIndex)
        	$(".slide"+slideIndex).find(".animated").each(function () {
                reduce($(this));
            });
            $(".slide"+nextSlideIndex).find(".animated").each(function () {
                add($(this));
            });
            console.log(index,slideIndex);
        }
    });
    //获取有animated类的data属性值，并增加对应的样式
    function add(ele) {
        var name = ele.data("animated-name"), time = ele.data("animated-time"),
                delay_time = ele.data("animated-delay-time"), style = ele.attr("style");
        if (style !== "undefined") {
            ele.data("original", style);
        }
        ele.css({
            "-webkit-animation-name": name,
            "animation-name": name,
            "-webkit-animation-duration": time,
            "animation-duration": time,
            "-webkit-animation-delay": delay_time,
            "animation-delay": delay_time
        })
    }

    //移除增加的样式
    function reduce(ele) {
        var original = ele.data("original");
        ele.removeAttr("style", "animation-name");
        if (original !== null) {
            ele.attr("style", original);
        }
    }
}