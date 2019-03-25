
var timer1,timer2,timer3,timer,videoTimer1,videoTimer2,videoTitTimer,videoTitTimer1,slideTo2,slideTo3;			       
var jj=1,zz=3;
var mySwiper,aniFlag = true;
var browser={ 
	versions:function(){ 
		var u = navigator.userAgent, app = navigator.appVersion; 
		return { 
			trident: u.indexOf('Trident') > -1, //IE内核 
			presto: u.indexOf('Presto') > -1, //opera内核 
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器 
			iPad: u.indexOf('iPad') > -1, //是否iPad 
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
		};
	}()
}
	


$(document).ready(function(){
	
	// 获取UserAgent
	var u = navigator.userAgent;
	// 安卓
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	// IOS
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	
	var loadtimer;
	
	var audio = $("#media");
	
	$(".container").click(function(){
		mySwiper.stopAutoplay();
	})
	var hammer1 = document.getElementById("container");
	var mc1 = new Hammer(hammer1);
	
	mc1.on("swipe", function(ev) {
		mySwiper.stopAutoplay();
	})

	//音乐兼容
	audioAutoPlay('media');
//	autoPlayMusic();
	
	//通过音乐的播放时长判断页面的加载
	/*
	audio.get(0).currentTime = 0;
	var aaa = setInterval(function(){
		if(audio.get(0).currentTime > 0){
			imgload();
			clearInterval(aaa);
			$("body").click();
		}
		
		console.log(audio.get(0).duration);
//		console.log(audio.get(0).currentTime);
	},100);
	*/
	
	var loadingMask = $(".x_num span");
	var num = parseInt($(".x_num span").text());
	var audFlag = true;
	$({
        property: 0
    }).animate({
        property: 99
    }, {
        duration: 300,
        step: function() {
            var percentage = Math.round(this.property);
            loadingMask.text(percentage);
            //页面加载后执行 &&document.readyState == "complete"
        	var aaa = setInterval(function(){
				if(!isNaN(audio.get(0).duration)&&audFlag){
//					alert(11)
					loadingMask.text(100);
					clearInterval(aaa);
					setTimeout(function(){
						imgload();
					},800);
					audFlag = false;
				}
			},100);  
        }
	});
	
	
	/*
	var aaa = setInterval(function(){
		if(!isNaN(audio.get(0).duration)){
			imgload();
			clearInterval(aaa);
			$("body").click();
		}
		
		console.log(audio.get(0).duration);
	},100);
	*/
	
	//音乐控制按钮（播放/暂停）
	$("#audio_btn").click(function(){
		
		if(audio.get(0).paused){                 
		    audio.get(0).play();
		    $(this).addClass("rotate");
		}else{
		    audio.get(0).pause();
		    $(this).removeClass("rotate");
		}
	})
	
	$(".three1").click(function(){
		$(".zz,.xlayer,.xlayer1").show();
	})
	$(".three2").click(function(){
		$(".zz,.xlayer,.xlayer2").show();
	})
	$(".three3").click(function(){
		$(".zz,.xlayer,.xlayer3").show();
	})
	
	$(".close").click(function(){
		$(".zz,.xlayer,.xlayer_list").hide();
	})
//	for(var i=125; i<240; i++){
//		var $img = '<img src="images/02/02'+i+'.jpg"/>'
//		$(".video2").append($img);
//	}
	
})





window.onload=function(){
	
	var hammer = document.getElementById("hammer");
	var mc = new Hammer(hammer);
	
	mc.on("swiperight", function(ev) {
    	clearInterval(timer1);
    	rightMove();
//  	dh();
	})
	mc.on("swipeleft", function(ev) {
		console.log("swipeleft");
    	clearInterval(timer1);
    	leftMove();
//  	dh();
	})
}




function rightMove(){
	$(".three").addClass("th"+jj);
	if(jj>=3){
		jj=1;
		$('.three').removeClass("th1 th2 th3");
	}else{
		jj++;
	}
//	console.log("right:"+jj);
}

function leftMove(){
	
	if(jj<=1){
		jj=3;
		$('.three').addClass("th1 th2 th3").removeClass("th3");
	}else{
		jj--;
		$(".three").removeClass("th"+jj);
		
	}
//	console.log("left:"+jj);
}

function dh(){
	timer1 = setInterval(function(){
		rightMove();
	},5000);
}


function audioAutoPlay(id){
    var audio1 = document.getElementById(id),
        play = function(){
	        audio1.play();
	        document.removeEventListener("touchstart",play, false);
	    };
    audio1.play();
    document.addEventListener("WeixinJSBridgeReady", function () {//微信
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {//易信
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}


function imgload(){
	$('#imgwrap').imagesLoaded( function() {
		
		var leng1 = $('.video1 img').length;
		var leng2 = $('.video2 img').length;
		var titleng1 = $('.video1_tit img').length;
		
//		console.log(leng1 + ", " + leng2)
		var cc=0,tt=1,flag1=true,flag2=true;
		
		function titplays1(){
//			++tt;
			$('.video1_tit img').eq(tt).addClass('on').siblings().removeClass('on');
			tt++;
			if(tt>=titleng1){
//				alert(tt)
				tt=0;
				clearInterval(videoTitTimer);
			}
		}
		
		function plays1(){
			$('.video1 img').eq(cc).addClass('on').siblings().removeClass('on');
			cc++;
//			alert(cc)
			if(cc>=leng1){
				cc=0;
				clearInterval(videoTimer1);
			}
//			console.log(cc)
		}
		function plays2(){
			$('.video2 img').eq(cc).addClass('on').siblings().removeClass('on');
			cc++;
			if(cc>=leng2){
				cc=0;
				clearInterval(videoTimer2);
			}
//			console.log(cc)
		}
		
		mySwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		    //mousewheelControl: true,//设置为true时，能使用鼠标滚轮控制slide滑动。
			//watchSlidesProgress: true,
//			scrollbar:'.swiper-scrollbar',
			//slidesPerView: 'auto',// 'auto'则自动根据slides的宽度来设定数量。
//			initialSlide: 4,
			loop: true,
			autoplay: 5000,
			onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
				$(".loading,.load-wrap").hide();
				//$(".swiper-slideout:nth-child(1)").addClass("on")
		        swiperAnimateCache(swiper); //隐藏动画元素 
		        if(aniFlag){
		        	swiperAnimate(swiper); //初始化完成开始动画
		        	aniFlag = false;
		        }
		    }, 
//		    onTouchEnd: function(swiper, event){
//		    	console.log(event);
//		    },
		    //onSlideChangeEnd
		    onTransitionEnd: function(swiper){ 
		    	if(!aniFlag){
		        	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		        }
		        //console.log(swiper.activeIndex);
		        var flag = false;
		        
		        if(swiper.activeIndex == 2){
		        	if(flag1){
		        		$(".video2 img").eq(0).addClass("on").siblings().removeClass("on");
			        	$(".video2_tit img").removeClass("on");
			        	clearInterval(videoTimer2);
			        	clearTimeout(videoTitTimer1);
			        	clearTimeout(slideTo3);
			        	cc=0;
			        	videoTimer1=setInterval(plays1,60);
			        	videoTitTimer=setInterval(titplays1,5490);
//			        	slideTo2=setTimeout(function(){
//			        		mySwiper.slideTo(3);
//			        	},13000);
			        	flag1=false;
		        	}
		        	flag2=true;
		        	
		        }else if(swiper.activeIndex == 3){
		        	if(flag2){
		        		$(".video1 img").eq(0).addClass("on").siblings().removeClass("on");
			        	$('.video1_tit img').eq(0).addClass('on').siblings().removeClass('on');
			        	clearInterval(videoTimer1);
			        	clearInterval(videoTitTimer);
			        	clearTimeout(slideTo2);
			        	cc=0;
			        	tt=1;
			        	videoTimer2=setInterval(plays2,60);
			        	videoTitTimer1=setTimeout(function(){
			        		$(".video2_tit img").addClass("on");
			        	},9000);
//			        	slideTo3=setTimeout(function(){
//			        		mySwiper.slideTo(4);
//			        	},16000);
			        	flag2=false;
		        	}
		        	flag1=true;
		        	
		        }else{
		        	flag1=true;
		        	flag2=true;
//		        	alert(22);
		        	clearInterval(videoTimer2);
		        	clearInterval(videoTimer1);
		        	clearInterval(videoTitTimer);
		        	clearTimeout(videoTitTimer1);
		        	clearTimeout(slideTo2);
		        	clearTimeout(slideTo3);
		        	cc=0;
		        	tt=1;
		        	$(".video1 img").eq(0).addClass("on").siblings().removeClass("on");
		        	$(".video2 img").eq(0).addClass("on").siblings().removeClass("on");
		        	$('.video1_tit img').eq(0).addClass('on').siblings().removeClass('on');
		        	$(".video2_tit img").removeClass("on");
		        }
		        
		        //loop循环影响每一个slide的位置
		        if(swiper.activeIndex == 5){
		        	jj = 1;
//					dh();
		        }else{
					clearInterval(timer1);
					$('.three').removeClass("th1 th2 th3");
					$(".zz,.xlayer,.xlayer_list").hide();
		        }
		    } 
		});
	});
}
