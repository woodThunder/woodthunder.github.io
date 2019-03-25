
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
// 获取UserAgent
var u = navigator.userAgent;
// 安卓
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// IOS
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

$(document).ready(function(){
	
	
	
	var progressCount=0;
	
	var audFlag = true;
	
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
	
	var videobox = document.getElementById("videobox");
	var videohammer = new Hammer(videobox);
	videohammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	videohammer.on("swipeup", function(ev) {
		videohide()
		
	})
	
	function videohide(){
		$("#videobox,#video").hide(0,function(){
			$("#video").get(0).pause();
			$("#video").get(0).currentTime=0;
			mySwiper.slideTo(3);
			$("#media").get(0).play();
			$("#audio_btn").addClass("rotate").show();
//			var de = document;
//		    if (de.exitFullscreen || de.mozCancelFullScreen || de.webkitCancelFullScreen) {
//		        
//		    }
			
		});
	}
	
	$("#video").get(0).addEventListener("ended", function () {
        alert(11);
    });
	
	
	$(".xuanchuan2_icon_box,.chanpin2_icon_box,.xuanchuan2,.chanpin2").click(function(){

		$(".videobox").show();
		var videotimer = setInterval(function(){
			if($("#video").get(0).currentTime>0){
				$("#video").show();
				clearInterval(videotimer);
			}
		},100)
		$("#video").get(0).play();
		$("#media").get(0).pause();
		$("#audio_btn").removeClass("rotate").hide();
		
		if (window.orientation == 0 || window.orientation == 180){//竖屏的时候
            $("#video").width($(window).height());
            $("#video").height($(window).width());
        	var _w = $("#video").width();
        	var _h = $("#video").height();
        	var _l = -(_w-_h)/2;
            $("#video").css({
        		"marginLeft": _l,
        		"marginTop": -_l,
        	})
        }else{
        	$("#video").attr("style","none")
        }
	})
	$(window).resize(function(){
		if (window.orientation == 0 || window.orientation == 180){//竖屏的时候
            $("#video").width($(window).height());
            $("#video").height($(window).width());
        	var _w = $("#video").width();
        	var _h = $("#video").height();
        	var _l = -(_w-_h)/2;
            $("#video").css({
        		"marginLeft": _l,
        		"marginTop": -_l,
        	})
        }else{
        	$("#video").attr("style","none")
        }
	})

	
	//音乐兼容
	audioAutoPlay('media');

	
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
	
	/*监听音乐是否播放*/
	audio.get(0).addEventListener("play", function () {
       $("#audio_btn").addClass("rotate");	 
    });

    
	
	$('#container').imagesLoaded().progress( function( instance, image ) {
		var getBodyImgSize=$("body img").size();
		if(progressCount==getBodyImgSize-1){
			var aaa = setInterval(function(){
				if(!isNaN(audio.get(0).duration)&&audFlag){
					$(".x_num span").text(100);
					clearInterval(aaa);
					setTimeout(function(){
						imgload();
					},1000);
					audFlag = false;
				}
			},100);  
		}else{
			progressCount+=1;
            $(".x_num span").text(Math.floor(progressCount/getBodyImgSize*100));
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


//音乐兼容
function audioAutoPlay(id){
	var audio = document.getElementById(id);
    audio.play();
//  $("#video")[0].play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
//      $("#video")[0].play();
        document.removeEventListener("touchstart",play, false);
    }, false);
}



function imgload(){
//	$('#container').imagesLoaded( function() {
		
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
			noSwiping : true,
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
		    onTransitionEnd: function(swiper){ 
		    	if(!aniFlag){
		        	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		        }
		        console.log(swiper.activeIndex);
		        var flag = false;
		        
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
//	});
}



