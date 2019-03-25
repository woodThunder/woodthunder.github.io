$(function(){

    if(document.getElementById("history-page")){
        new WOW().init();
    }


    if(document.getElementById("inner-header")){
        var last_update=0;//定义一个变量记录上一次摇动的时间
        function initDev(){
            //判断移动浏览器是否支持运动传感器事件
            if(window.DeviceMotionEvent){
                //添加一个事件监听器
                window.addEventListener('devicemotion',deviceMotionHandler,false);
            }else{
                alert('not support mobile event');
            }
        }
        //运动传感器处理
        function deviceMotionHandler(eventData){
            //获取含重力加速
            var acceleration=eventData.accelerationIncludingGravity;
            var curTime=new Date().getTime();//获取当前时间戳
            var diffTime=curTime-last_update;
            if(diffTime>100){
                last_update=curTime;//记录上一次摇动的时间
                x=acceleration.x;//获取加速度X方向
                y=acceleration.y;//获取加速度X方向
                $(".inner-header-pic1").css({"transform": "translateX("+x*1+"px)"});
                $(".inner-header-pic2").css({"transform": "translateX("+x*4+"px)"});
                $(".inner-header-pic3").css({"transform": "translateX("+x*2+"px)"});
                $(".inner-header-pic4").css({"transform": "translateX("+x*1+"px)"});
                $(".inner-header-pic5").css({"transform": "translateX("+x*4+"px)"});
                $(".inner-header-pic6").css({"transform": "translateX("+x*1+"px)"});
                $(".inner-header-pic7").css({"transform": "translateX("+x*3+"px)"});
                //记录上一次加速度
                last_x=x;
                last_y=y;
            }
        }
        initDev();
    }


    if(document.getElementById("product-page")){
        var autoTimer=null;
        var swiper = new Swiper('.swiper-container',{
            effect : 'fade',
            fade: {
                crossFade: false,
            }
        });
        var hammerBlo=true;
        var hammerCount=0;
        var hammertime = new Hammer(document.getElementById("product_banner"));
        hammertime.on("swipeleft", swipeLeftHandler)
        hammertime.on("swiperight", swipeRightHandler)
        $(".product_banner_l").click(swipeLeftHandler)
        $(".product_banner_r").click(swipeRightHandler)
        autoTimer=setInterval(function(){
            swipeLeftHandler();
        },5000)

        $(document).on("touchstart", function(e) {
            clearInterval(autoTimer);
        })
        function swipeLeftHandler(){
            if(hammerBlo==true){
                hammerBlo=false;
                if(hammerCount>=4){
                    hammerCount=0;
                }else{
                    hammerCount++;
                }
                $(".product_inter").attr("href","interlocution.html?index="+(hammerCount));
                swiper.slideTo(hammerCount, 1000, false);
                ajaxFun($(".swiper-slide-pr"+hammerCount).attr("data-url"),$(".swiper-slide-pr"+hammerCount));
                $(".product_banner li:eq(0)").removeClass().addClass("product_item5");
                $(".product_banner li:eq(1)").removeClass().addClass("product_item1");
                $(".product_banner li:eq(2)").removeClass().addClass("product_item2");
                $(".product_banner li:eq(3)").removeClass().addClass("product_item3");
                $(".product_banner li:eq(4)").removeClass().addClass("product_item4");
                setTimeout(function(){
                    $(".product_banner li:eq(0)").appendTo($(".product_banner ul"));
                    hammerBlo=true;
                },800)
            }
        }

        function swipeRightHandler(){
            if(hammerBlo==true){
                hammerBlo=false;
                if(hammerCount<=0){
                    hammerCount=4;
                }else{
                    hammerCount--;
                }
                $(".product_inter").attr("href","interlocution.html?index="+(hammerCount));
                swiper.slideTo(hammerCount, 1000, false);
                ajaxFun($(".swiper-slide-pr"+hammerCount).attr("data-url"),$(".swiper-slide-pr"+hammerCount));
                $(".product_banner li:eq(0)").removeClass().addClass("product_item2");
                $(".product_banner li:eq(1)").removeClass().addClass("product_item3");
                $(".product_banner li:eq(2)").removeClass().addClass("product_item4");
                $(".product_banner li:eq(3)").removeClass().addClass("product_item5");
                $(".product_banner li:eq(4)").removeClass().addClass("product_item1");
                setTimeout(function(){
                    $(".product_banner li:last-child").prependTo($(".product_banner ul"));
                    hammerBlo=true;
                },800)
            }
        }


        ajaxFun($(".swiper-slide-pr0").attr("data-url"),$(".swiper-slide-pr0"));
        new WOW().init();



        var last_update=0;//定义一个变量记录上一次摇动的时间

        function initDev(){
            //判断移动浏览器是否支持运动传感器事件
            if(window.DeviceMotionEvent){
                //添加一个事件监听器
                window.addEventListener('devicemotion',deviceMotionHandler,false);
            }else{
                alert('not support mobile event');
            }
        }

        //运动传感器处理
        function deviceMotionHandler(eventData){
            //获取含重力加速
            var acceleration=eventData.accelerationIncludingGravity;
            var curTime=new Date().getTime();//获取当前时间戳
            var diffTime=curTime-last_update;
            if(diffTime>100){
                last_update=curTime;//记录上一次摇动的时间
                x=acceleration.x;//获取加速度X方向
                y=acceleration.y;//获取加速度X方向
                $(".shake-bg").css({"marginLeft": x*3});
                $(".shake-bg2").css({"marginLeft": x*6});
                $(".shake-slide1").css({"marginLeft": x*7});
                $(".shake-slide2").css({"marginLeft": x*5});
                $(".shake-slide3").css({"marginLeft": x*10});
                $(".shake-slide4").css({"marginLeft": x*8});
                $(".shake-slide5").css({"marginLeft": x*9});
                //记录上一次加速度
                last_x=x;
                last_y=y;
            }
        }


        function ajaxFun(url,target){
            $.ajax({
                url:url,
                type:"GET",
                success: function (msg) {
                    target.html(msg);
                    target.siblings().html("");
                    new WOW().init();
                    initDev();
                }
            });
        }
    }


    if(document.getElementById("letter-page")){
        setTimeout(function(){
        new WOW().init();
        },1000)

        var domSpeed=100;
        var domSpeed1=50;
        //标题
        var domTitle=$(".letter-article h4");
        domTitle.css("opacity",1);
        var str=domTitle.text();
        var strs=str.split("");
        domTitle.html("");
        for(var i=0; i<strs.length; i++){
            domTitle.append("<span class='wow fadeIn'>"+strs[i]+"</span>");
        }
        //        var domTitleSpan=$(".letter-article h4 span");
        //        domTitleSpan.each(function(i){
        //            $(".letter-article h4 span:eq("+i+")").stop().delay(i*domSpeed).animate({"opacity":1});
        //        })
        //内容
        var domArticle=$(".letter-article p");
        domArticle.css("opacity",1);
        var strArticle="";
        var strArticles={};
        domArticle.each(function(){
            strArticle=$(this).text();
            strArticles=strArticle.split("");
            $(this).html("");
            $(this).append("<b>&nbsp;</b>");
            $(this).append();
            for(var i=0; i<strArticles.length; i++){
                $(this).append("<i><em class='wow fadeIn'>"+strArticles[i]+"</em></i>");
            }
        })

        // $(".letter-box1").click(function(){
        //     $("#letter-video").get(0).play();
        // })
        //        setTimeout(function(){
        //            var domTitleEm=$(".letter-article em");
        //            domTitleEm.each(function(i){
        //                $(".letter-article em:eq("+i+")").stop().delay(i*domSpeed1).animate({"opacity":1});
        //            })
        //        },2000)

        //        $(window).scroll(function(){
        //            $(".letter-article em").each(function(i){
        //                $(".letter-article em:eq("+i+")").stop();
        //                if($(this).offset().top<=$(window).scrollTop()){
        //                    $(this).animate({"opacity":1});
        //                }
        //            })
        //        })
    }

    $(document).on("click",".video_bg,.video_bg > a",function(){
        $(".video_bg,.video_outer").fadeOut(600);
        setTimeout(function(){
            $(".video_bg,.video_outer").remove();
        },600)
    })
})



function videoPlay(dataImg,dataVideo){
    $("body").append("<div class='video_bg'><a href='javascript:void(0)'></a></div>");
    $("body").append("<video class='video_outer' poster='"+dataImg+"' src='"+dataVideo+"' controls='controls'></video>");
    $(".video_bg").fadeIn();
    $(".video_outer").fadeIn();
}