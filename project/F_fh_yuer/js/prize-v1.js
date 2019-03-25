$.extend({
    luckGame: function(options) {
    	var defaults = {
    	        'gameLen': '3',
    	        'game_pagesize':6,//生成多少圈同样的东西
    	        'zj_arr': { //中奖数组，第一个表示是否中奖，第二个中奖号码
    	        	'is_win':1,
    	        	'number':2
    	        }
    	    };
         var settings = $.extend(defaults, options);
         w_config={
         	'w':$(window).width(),
         	'h':$(window).height()
         }
         var gameArr=[];
         var gameLen=settings.gameLen;
         var game_list_h='';
         var game_init=randNum2();
         var game_list_item_h=0;

          //每次进来随机3个数字，来启动当前的选择的状态
        for (var i = 0; i < 3; i++) {
          	
          	game_init.push(Math.floor(Math.random() * gameLen));
        }
        createGame();
        $(window).resize(function(){
         	
         	createGame();
        })
        function createGame(){
          	getHeight();
          	setLi();
          	pushLi(gameArr);
          	start();
        }

        function getHeight(){
          	w_config={
          		'w':$(window).width(),
          		'h':$(window).height()
          	}
          	game_list_item_h= $(".game-goods-ul").height();
        }


          //设置奖品
          function setLi(){
          	$(".game-goods-ul").each(function(){
          		var con = $(this).html();
          		for (var j = 1; j <= settings.game_pagesize; j++) {
	          		$(this).append(con);
	          	}
          		
          	})
          }
          //写入，初始化奖品的滚动
          function pushLi(arr){
          	console.log(game_list_item_h);
          	$(".game-goods-ul").each(function(e){
          		game_list_h=$(this).height();
//        		console.log('game_list_item_h',game_init);
          		y = game_list_h*game_init[e];
//        		console.log(e)
          		$(this).css({
          			'transition-duration': '0ms',
          			'transform':'translate(0px, -'+y+'px)'
          		})
          	});
          	
          	
          }
          
          function start(){
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
		          		//如果中奖
		          		if(settings.zj_arr.is_win==1)
		          		{
		          			
		          			$(".game-goods-ul").each(function(e){
		
		          				setTimeout(function(){
		          					y=(settings.zj_arr.number+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
		          					$(".game-goods-ul").eq(e).css({
		          						'transition-duration': '800ms',
		          						'transform':'translate(0px, -'+y+'px)'
		          					})
		          				}, e*300);
		          				//判断最后面是否完毕
		          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					y=settings.zj_arr.number*game_list_item_h;
		          				    $(".game-goods-ul").css({
		          				    	'transition-duration': '0ms',
		          				    	'transform':'translate(0px, -'+y+'px)'
		          				    })
		          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          				    
		          				    //弹窗在这里体现
		          				    
		          				})
		          			})
		          			
		          		}else
		          		{
		          			
		          			numrand=randNum2();
		          			console.log(numrand);
		          			//不中奖的时候
		          			$(".game-goods-ul").each(function(e){
		          				y2=(numrand[0])*game_list_item_h;
		          				y3=(numrand[1])*game_list_item_h;
		          				y4=(numrand[2])*game_list_item_h;
		          				setTimeout(function(){
		          					y=(numrand[e]+settings.gameLen*(settings.game_pagesize-1))*game_list_item_h;
		          					$(".game-goods-ul").eq(e).css({
		          						'transition-duration': '800ms',
		          						'transform':'translate(0px, -'+y+'px)'
		          					})
		          				}, e*300);
		          				//判断最后面是否完毕
		          				$("#game3").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          				    $(".game-goods-ul").eq(2).css({
		          				    	'transition-duration': '0ms',
		          				    	'transform':'translate(0px, -'+y4+'px)'
		          				    })
		          				    $("#game3").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          				})
		          				$("#game2").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          				    $(".game-goods-ul").eq(1).css({
		          				    	'transition-duration': '0ms',
		          				    	'transform':'translate(0px, -'+y3+'px)'
		          				    })
		          				    $("#game2").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          				})
		          				$("#game1").find(".game-goods-ul").on("webkitTransitionEnd", function() {
		          					
		          				    $(".game-goods-ul").eq(0).css({
		          				    	'transition-duration': '0ms',
		          				    	'transform':'translate(0px, -'+y2+'px)'
		          				    })
		          				    $("#game1").find(".game-goods-ul").unbind("webkitTransitionEnd");
		          				})
		          			})
		
		          		}
	          		
	          		}
				}    
          	})
          }
          function randNum2(){
          	a=Math.floor(Math.random() * gameLen);
          	b=Math.floor(Math.random() * gameLen);
          	c=Math.floor(Math.random() * gameLen);
          	arr=[];
          	if(a==b)
          	{
          		return randNum2();
          	}else
          	{
          		return arr=[a,b,c];
          	}
          }
    }
})

$(function(){
	var num = 1;
	console.log(Math.random())
	if(Math.random() < 0.5){
		num = 0;
	}
	$.luckGame({
	 	'zj_arr': {
	 		'is_win':num,//1为中奖
	 		'number':2//从0算起，就是3了
	 	},
	 	'gameLen': $(".game-goods-ul li").lengh
	});
	 
	
})

