var turnplate = {
	restaraunts: [], //大转盘奖品名称
	colors: [], //大转盘奖品区块对应背景颜色
	outsideRadius: 275, //大转盘外圆的半径
	textRadius: 155, //大转盘奖品位置距离圆心的距离
	insideRadius: 50, //大转盘内圆的半径
	startAngle: 0, //开始角度
	imgs:[],
	bRotate: false //false:停止;ture:旋转
};

$(document).ready(function() {
//	alert($(window).width()+","+$(window).height());
	var mySwiper = new Swiper('.text .swiper-container', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop : true,
        direction : 'vertical',
	})
	
	
	
	$(".close,.notwin_btn,.success_btn,.xy_btn").click(function(){
		$(this).parent().removeClass("bounceInDown");
		$(this).parent().siblings().removeClass("bounceInDown");
		$(this).parents(".layer").hide();
	})
	
	$(".win_btn").click(function(){
		$(this).parents(".win_layer").removeClass("bounceInDown");
		$(this).parents(".win_layer").siblings().removeClass("bounceInDown");
		$(".info_layer").addClass("bounceInDown");
	})
	
	$(".info_btn").click(function(){
		$(this).parents(".info_layer").removeClass("bounceInDown");
		$(this).parents(".info_layer").siblings().removeClass("bounceInDown");
		$(".success_layer").addClass("bounceInDown");
	})
	
	$(".wheel_btn01").click(function(){
		$(".layer").show();
		$(".rule_layer").addClass("bounceInDown").siblings().removeClass("bounceInDown");
	})
	
	$(".wheel_btn02").click(function(){
		$(".layer").show();
		$(".prize_layer").addClass("bounceInDown").siblings().removeClass("bounceInDown");
	})
	
	try {
        $(".have_prize,.rule_wrap p").mCustomScrollbar({});
    }catch (e) {
        console.log(00)
    }
	
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["飞鹤奶粉1", "谢谢惠顾2", "飞鹤奶粉3", "谢谢惠顾4", "飞鹤奶粉5", "谢谢惠顾6", "飞鹤奶粉7", "谢谢惠顾8"];
	turnplate.colors = ["#fff", "#efefef", "#fff", "#efefef", "#fff", "#efefef", "#fff", "#efefef"];
	turnplate.imgs = ["images/0.png","images/1.png","images/2.png","images/3.png","images/0.png","images/1.png","images/2.png","images/3.png"];
	var rotateTimeOut = function() {
		$('#wheelcanvas').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function(item, txt) {
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
		if(angles < 270) {
			angles = 270 - angles;
		} else {
			angles = 360 - angles + 270;
		}
		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 8000,
			callback: function() {
//				alert(txt);
				
				if(txt.indexOf("奶粉") > 0) {
					$(".layer").show();
					$(".win_layer").addClass("bounceInDown").siblings().removeClass("bounceInDown");
				} else if(txt.indexOf("谢谢惠顾") >= 0) {
					$(".layer").show();
					$(".notwin_layer").addClass("bounceInDown").siblings().removeClass("bounceInDown");
				}

				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};

	$('.pointer').click(function() {
		if(turnplate.bRotate) return;
		turnplate.bRotate = !turnplate.bRotate;
		//获取随机数(奖品个数范围内)
		var item = rnd(1, turnplate.restaraunts.length);
//		var item = 8;
		//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
		rotateFn(item, turnplate.restaraunts[item - 1]);
		
		//console.log(item);
	});
	
	//提前加载，提供缓存
	for(var i = 0; i < turnplate.imgs.length; i++){
		var img = new Image(); //创建一个Image对象，实现图片的预下载  
    	img.src = turnplate.imgs[i]; 
	}
});

function rnd(n, m) {
	var random = Math.floor(Math.random() * (m - n + 1) + n);
	return random;

}

//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function() {
	drawRouletteWheel();
};
 
function drawRouletteWheel() {
	var canvas = document.getElementById("wheelcanvas");
	if(canvas.getContext) {
		//根据奖品个数计算圆周角度
		var arc = Math.PI / (turnplate.restaraunts.length / 2);
//		console.log(turnplate.restaraunts.length)
//		console.log(arc);
//		console.log(Math.PI);
		var ctx = canvas.getContext("2d");
		//在给定矩形内清空一个矩形
		ctx.clearRect(0, 0, 640, 640);
		//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
		ctx.strokeStyle = "#FFBE04";
		//font 属性设置或返回画布上文本内容的当前字体属性
		ctx.font = '20px Microsoft YaHei';
		for(var i = 0; i < turnplate.restaraunts.length; i++) {
			var angle = turnplate.startAngle + i * arc;
			ctx.fillStyle = turnplate.colors[i];
			ctx.beginPath();
			//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
			ctx.arc(320, 320, turnplate.outsideRadius, angle, angle + arc, false);
			ctx.arc(320, 320, turnplate.insideRadius, angle + arc, angle, true);
			ctx.stroke();
			ctx.fill();
			//锁画布(为了保存之前的画布状态)
			ctx.save();

			//----绘制奖品开始----
			ctx.fillStyle = "#333333";
			var text = turnplate.restaraunts[i];
			var line_height = 17;
			//translate方法重新映射画布上的 (0,0) 位置
			ctx.translate(320 + Math.cos(angle + arc / 2) * turnplate.textRadius, 320 + Math.sin(angle + arc / 2) * turnplate.textRadius);
			
			//rotate方法旋转当前的绘图
			ctx.rotate(angle + arc / 2 + Math.PI / 2);
//			console.log(angle+","+arc / 2+","+Math.PI / 2);
			
			//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			
			
			/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
			/*
			if(text.indexOf("M") > 0) { //流量包
				var texts = text.split("M");
				for(var j = 0; j < texts.length; j++) {
					ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
					if(j == 0) {
						ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
					} else {
						ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
					}
				}
			} else if(text.indexOf("M") == -1 && text.length > 6) { //奖品名称长度超过一定范围 
				text = text.substring(0, 6) + "||" + text.substring(6);
				var texts = text.split("||");
				for(var j = 0; j < texts.length; j++) {
					ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				}
			} else {
				ctx.font = '20px Microsoft YaHei'
				//在画布上绘制填色的文本。文本的默认颜色是黑色
				//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			}
			*/
			
			//添加对应图标,也可以通过在页面上获取图片然后在添加图标
			preImage(turnplate.imgs[i],function(x,y,width,height){
				//ctx.save();   //保存当前环境的状态。
		        ctx.drawImage(this,x,y,width,height);                    
		        //ctx.restore(); //返回之前保存过的路径状态和属性。
		    },{"x":-40,"y":-105,"width":80,"height":80})
			
			
			/*
			if(text.indexOf("奶粉") > 0) {
				var img = document.getElementById("milk-img");
				img.onload = function() {
					ctx.drawImage(img, -30, -105);
				};
				ctx.drawImage(img, -30, -105);
			} else if(text.indexOf("谢谢惠顾") >= 0) {
				var img = document.getElementById("sorry-img");
				img.onload = function() {
					ctx.drawImage(img, -40, -105);
				};
				ctx.drawImage(img, -40, -105);
			}
			*/
			//把当前画布返回（调整）到上一个save()状态之前 
			ctx.restore();
			//----绘制奖品结束----
		}
	}
}

function preImage(url,callback,wo){  
    var img = new Image(); //创建一个Image对象，实现图片的预下载  
    img.src = url;  
	if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
        callback.call(img,wo.x,wo.y,wo.width,wo.height);  
        return; // 直接返回，不用再处理onload事件  
    }  
    img.onload = function () { //图片下载完毕时异步调用callback函数。  
        callback.call(img,wo.x,wo.y,wo.width,wo.height);//将回调函数的this替换为Image对象  
    }; 
    
} 

