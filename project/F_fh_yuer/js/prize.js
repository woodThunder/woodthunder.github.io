
var game_list_item_h= $(".game-goods-ul li").height();
var gameLen = $("#game1 .game-goods-ul li").length;
//是否中奖：0未中奖 1中奖
var prize_flag = 1;
//中奖的唯一标识
var prize_index = "2";


$(function(){
	
	$(".tt_img03,.bandit_btn").click(function(){
		var phone = $(".tt_inp").val();
		if($.trim(phone) == ""){
			alert("手机号码不能为空");  
	        return false; 
		}else{
		    if(!(/^1[34578]\d{9}$/.test(phone))){ 
		        alert("手机号码有误，请重填");  
		        return false; 
		    }else{
				$(".bandit_btn").addClass("on");
				$(".tt_btn i,.bandit i").addClass("on");
				$('body,html').scrollTop(0);
				move();
			}
		}
	})
	
})

//写入，初始化奖品的滚动
function pushLi(){
	var game_init = randNum2(gameLen);
	console.log(game_init)
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
			prize(prize_index,$(this))
		}
		
//		console.log($(this))
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
  	console.log("a:"+a+" ,b:"+b+" ,c:"+c)
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