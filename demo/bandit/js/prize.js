var game_list_item_h= $(".game-goods-ul li").height();
var gameLen = $("#game1 ul li").length;

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

$(function(){
	console.log(game_list_item_h)
//	pushLi();
	$(".slot_btn_go, .number_btn").click(function(){
		var phone = $(".number_txt").val();
		if($.trim(phone) == ""){
			alert("手机号码不能为空");  
	        return false; 
		}else{
		    if(!(/^1[34578]\d{9}$/.test(phone))){ 
		        alert("手机号码有误，请重填");  
		        return false; 
		    }else{
		    	$(".slot_btn_go, .number_btn").off("click")
//				$('body,html').scrollTop(0);
				move();
			}
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
})

//写入，初始化奖品的滚动
function pushLi(){
	var game_init = randNum2(gameLen);
	console.log(game_init)
	console.log(game_list_item_h)
  	$(".game-goods-ul").each(function(e){
		$(this).css({
			'top': -game_list_item_h*game_init[e]
		})
	})
}

function move(){
	$(".game-goods-ul").each(function(e){
		$(this).append($(this).find("li:eq(0)").clone());
		setTimeout(function(){
			$(".game-goods-ul").eq(e).animate({top: -(gameLen-1)*game_list_item_h+"px"},200,"linear",function(){
				$(this).css("top","0")
				ani($(this))
			})
		}, e*300);
	})
}

//滑动
function ani(_this){
	_this.animate({top: -(gameLen-1)*game_list_item_h+"px"},200,"linear",function(){
		$(this).css("top","0");
		if(prize_flag == 0){
			return ani($(this));
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

//随机数组
function randNum2(gameLen){
  	var a=random(0, gameLen);
  	var b=random(0, gameLen);
  	var c=random(0, gameLen);
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