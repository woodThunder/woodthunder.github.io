var slotScrollHeight;
//是否有抽奖机会
var isSlotFlag = true;
var game_list_item_h;
var gameLen;

var game_init;
//是否中奖：0未中奖 1中奖
var prize_flag = 1;
//中奖的唯一标识
var prize_index = "1";


var prizeObj = [
	{"photo":"images/prize_img01.png","tit":"飞鹤鲜享之旅","info":"客服将于48小时内与您取得联系并确认相关事宜。准备开启飞鹤--扎龙湿地牧场之旅吧！"},
	{"photo":"images/prize_img02.png","tit":"戴森吹风机","info":"稍后我们会以代金券形式发至您的星妈优选账户中，您可在星妈优选中查看并使用代金券，免费领取戴森吹风机1个！  "},
	{"photo":"images/prize_img03.png","tit":"现金红包 ","info":"红包将从飞鹤星妈会后台发出！因活动参与人数较多，发放速度或有延迟，将于24小时内发放完毕。<br> 红包自发放起24小时之内有效<br>请注意查收！"},
	{"photo":"images/prize_img04.png","tit":"星妈优选360积分","info":"稍后我们将把积分发放至您的星妈优选账户中，请注意查收！积分在手，星妈优选随便买！"}
]
$(document).ready(function() {
	//引导页
	try{
		var mySwiper = new Swiper('.lead .swiper-container', {
			direction: 'vertical',
//			initialSlide: 4,
			onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
//				console.log(swiper.activeIndex)
				swiperAnimateCache(swiper); //隐藏动画元素 
				swiperAnimate(swiper); //初始化完成开始动画
			},//onSlideChangeEnd
			onTransitionEnd: function(swiper) {
//				console.log(swiper.activeIndex)
				swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			}
		})
	}catch(e){
		//TODO handle the exception
	}
	
	$(".game-goods-ul").each(function(e){
		$(this).append($(this).find("li:eq(0)").clone());
	})
	
	//老虎机页面的显示
	$(".lead_btn").click(function(){
		$(".lead").hide();
		$(".slot").show();
		game_list_item_h= $(".game-goods-ul li").height();
		gameLen = $("#game1 ul li").length;
	    pushLi();
//		$('.prizelist_wrap').liMarquee({
//	    	direction: 'up'
//	    });
//		scroll("pic","demo1","demo2");
		
	})
	
	var isFlag = GetQueryString("isFlag");
	
	if(isFlag){
//		alert(isFlag)
		$(".lead_btn").click();
	}
	
	//老虎机摇奖按钮
	$(".slot_btn_go, .number_btn").click(function(){
		if(isSlotFlag == false){
			$(".noprize_layer").show();
			$(".noprize_layer_wrap").addClass("bounceInDown_x");
		}else{
//			var phone = $(".number_txt").val();
//			if($.trim(phone) == ""){
//				alert("手机号码不能为空");  
//		        return false; 
//			}else{
//			    if(!(/^1[34578]\d{9}$/.test(phone))){ 
//			        alert("手机号码有误，请重填");  
//			        return false; 
//			    }else{
//			    	$(".slot_btn_go, .number_btn").off("click")
//					$('body,html').scrollTop(0);
//					move();
//				}
//			}
//			未中奖时的随机数
			game_init = randNum2(gameLen);
//			console.log(game_init)
			move();
		}
	})
	
	//中奖弹窗关闭
	$(".prize_layer_close").click(function(){
		$(".prize_layer").hide();
		$(".prize_layer_wrap").removeClass("bounceInDown_x");
	})
	
	//无抽奖机会弹窗关闭
	$(".noprize_layer_close").click(function(){
		$(".noprize_layer").hide();
		$(".noprize_layer_wrap").removeClass("bounceInDown_x");
	})
	
	//点击规则按钮滑动到底部规则
	$(".slot_btn_rule").click(function(){
		var _top = $(".rules").offset().top;
		$("body,html").stop().animate({scrollTop:_top});
	})
	
	//按钮--我的
	$(".slot_btn_my").click(function(){
		getSlotHeight()
//		alert(slotScrollHeight)
		$(".slot").hide();
		$(".my_tabs ul li:nth-child(2)").click();
		$(".my").show();
	})
	//按钮--奖品展示
	$(".slot_btn_prize").click(function(){
		getSlotHeight()
		$(".slot").hide();
		$(".my_tabs ul li:nth-child(1)").click();
		$(".my").show();
	})
	//按钮--分享有礼  无抽奖机会--按钮--分享有礼
	$(".slot_btn_share, .noprize_layer_share").click(function(){
		getSlotHeight()
		$(".slot").hide();
		$(".share").show();
		$(".noprize_layer").hide();
		$(".noprize_layer_wrap").removeClass("bounceInDown_x");
	})
	
	//无抽奖机会--按钮--附近门店
	$(".noprize_layer_store").click(function(){
		getSlotHeight()
		$(".slot").hide();
		$(".store").show();
		$(".noprize_layer").hide();
		$(".noprize_layer_wrap").removeClass("bounceInDown_x");
	})
	
	//按钮--返回
	$(".my_back").click(function(){
//		alert(slotScrollHeight)
		$(".my, .share, .store").hide();
		$(".slot").show();
		$(window).scrollTop(slotScrollHeight)
		
	})
	
	//我的奖品--切换
	$(".my_tabs ul li").click(function(){
		var _index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".my_list").eq(_index).addClass("on").siblings().removeClass("on");
	})
	
	
	
	//附近门店--下拉
	$(".store_sel_top").click(function(e){
		e.stopPropagation();
		$(".store_sel_wrap").toggle();
	})
	$(".store_sel_wrap ul li").each(function(){
		$(this).click(function(){
			$(".store_pos").html($(this).find("span").text());
			$(".store_sel_wrap").hide()
		})
	})
	$(document).click(function(){
		$(".store_sel_wrap").hide()
	})
	$(".store_sel_wrap").click(function(e){
		e.stopPropagation();
	})
	
//	腾讯地图--API
	var backurl = "https://net.bangong.cn:805/F_mcy/store.html"
	$(".store_con ul li").click(function(){
		var _x = $(this).data("x");
		var _y = $(this).data("y");
		var _name = $(this).find("dd").text();//location.href
		location.href="https://map.qq.com/nav/drive#routes/page?eword=" + _name + "&epointx="+ _x +"&epointy="+ _y +"&referer=myapp&key=GRTBZ-K5Q66-3HSS4-EKOIG-ZZPWZ-PUFUT&backurl=" + backurl;
	})
	
	//分享有礼
	$(".share_tc_close").click(function(){
		$(".share_tc").hide();
		$(".share_tc_wrap").removeClass("bounceInDown_x");
	})
	
	$(".share_layer_close").click(function(){
		$(".share_layer").hide();
	})
	$(".share_btn,.share_gift_img03").click(function(){
		$(".share_layer").show();
	})
	
	$(".share_tc_tabs ul li").click(function(){
		if($(this).hasClass("on")){
			return false;
		}
		var _index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".share_tc_list").eq(_index).addClass("on").siblings().removeClass("on");
	})
	
	$(".share_btns img").click(function(){
		var _index = $(this).index();
		var _name = ".share_tc_tabs ul li:eq(" + _index + ")";
		$(_name).click()
		
		$(".share_tc").show();
		$(".share_tc_wrap").addClass("bounceInDown_x");
	})  
})

//无限滚动
function scroll(id,id1,id2){
	var speed=10;  
	var tab=document.getElementById(id);  
	var tab1=document.getElementById(id1);  
	var tab2=document.getElementById(id2);  
	tab2.innerHTML=tab1.innerHTML;  
	function Marquee(){  
		if(tab2.offsetHeight-tab.scrollTop<=0)  
			tab.scrollTop-=tab1.offsetHeight;  
		else{  
			tab.scrollTop++;  
		}
//		console.log(tab.scrollLeft);
	}  
	var MyMar=setInterval(Marquee,speed);  
	tab.onmouseover=function() {clearInterval(MyMar)};  
	tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)}; 
}

//获取slot的滚动高度
function getSlotHeight(){
	slotScrollHeight = $(window).scrollTop();
}

//写入，初始化奖品的滚动
function pushLi(){
	var game_init = randNum2(gameLen);
//	console.log(game_init)
//	console.log(game_list_item_h)
  	$(".game-goods-ul").each(function(e){
		$(this).css({
			'top': -game_list_item_h*game_init[e]
		})
	})
}


function move(){
	$(".game-goods-ul").each(function(e){
//		$(this).append($(this).find("li:eq(0)").clone());
		setTimeout(function(){
			$(".game-goods-ul").eq(e).animate({top: -(gameLen-1)*game_list_item_h+"px"},200,"linear",function(){
				$(this).css("top","0")
				ani($(this),e)
			})
		}, e*300);
	})
}

//滑动
function ani(_this,index){
	_this.animate({top: -(gameLen-1)*game_list_item_h+"px"},200,"linear",function(){
		$(this).css("top","0");
		if(prize_flag == 0){
//			return ani($(this));
			noprize(_this,index);
		}else{
			prize(prize_index,$(this));
			setTimeout(function(){
				$(".prize_layer_ph img").attr("src", prizeObj[prize_index].photo);
				$(".prize_layer_con h1").html(prizeObj[prize_index].tit);
				$(".prize_layer_con p").html(prizeObj[prize_index].info);
				$(".prize_layer").show();
				$(".prize_layer_wrap").addClass("bounceInDown_x");
			},1000)
		}
	})
}
//中奖停止滑动
function prize(prize_index,_this){
	_this.find("li").each(function(){
//		console.log($(this).data("index"));
		if($(this).data("index") == prize_index){
			_this.animate({top: -$(this).index()*game_list_item_h+"px"},200,"linear",function(){
				
			})
			return false;
		}
	})
}

//未中奖停止滑动
function noprize(_this,index){
	_this.find("li").each(function(){
		if($(this).data("index") == game_init[index]){
			_this.animate({top: -$(this).index()*game_list_item_h+"px"},200,"linear",function(){
				
			})
			return false;
		}
	})
}

//随机数组
function randNum2(gameLen){
  	var a=random(0, gameLen-1);
  	var b=random(0, gameLen-1);
  	var c=random(0, gameLen-1);
//	console.log("a:"+a+" ,b:"+b+" ,c:"+c)
  	var arr=[];
  	if(a==b)
  	{
  		return randNum2(gameLen);
  	}else
  	{
  		return arr=[a,b,c];
  	}
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function GetQueryString(parm) {
    let reg = new RegExp("(^|&)"+ parm +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);//匹配正则表达式及其分组
    //console.log(r);//["&name=222", "&", "222", "", index: 4, input: "id=1&name=222"]
    if(r!=null) {
		return  unescape(r[2]); 
	} else {
		return null;
	}
}