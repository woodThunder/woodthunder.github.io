$(document).ready(function () {

	//按钮点击顶部视频播放
	$(".v_btn1").click(function () {
		$(".v1").show();
		$(".v1").get(0).play();
		//		$(".v1").get(0).currentTime = 0;
	})

	//	$(".v1").get(0).addEventListener("pause",function(){
	//      $(this).hide();
	//	});

	//顶部更多视频点击滑动到指定位置
	$(".more_video").click(function () {
		$("html,body").stop().animate({
			scrollTop: $(".more_tit").offset().top
		});
	})




	//获取焦点事件
	//	$('.x_box').click(function(e){
	//      e.stopPropagation();
	//      $(".x_box .bottom textarea").focus();
	//  })

	//说说我的态度点击弹出事件
	$(".com_in_txt").click(function (e) {
		e.stopPropagation();
		$(".x_box .bottom .title .choice dl").show();
		$(".x_box .bottom .title .choice dl:nth-child(1)").addClass("on").siblings().removeClass("on");
		if ($('.x_box').hasClass("on")) {
			$(".x_box .bottom textarea").focus();
			return false;
		} else {
			$('.x_box').addClass("on");
			$(".x_box .bottom textarea").focus();
		}
	})

	//关闭文本域事件
	$(document).click(function () {
		$('.x_box').removeClass("on");
	})

	//新鲜派支持事件
	$(".fresh .support").click(function (e) {
		e.stopPropagation();
		$(".x_box .bottom .title .choice dl:nth-child(1)").show().addClass("on").siblings().removeClass("on").hide();
		$(".x_box .bottom .title .choice dl:nth-child(2)").hide();
		if ($('.x_box').hasClass("on")) {
			$(".x_box .bottom textarea").focus();
			return false;
		} else {
			$('.x_box').addClass("on");
			$(".x_box .bottom textarea").focus();
		}

	})
	//传统派支持事件
	$(".tradit .support").click(function (e) {
		e.stopPropagation();
		$(".x_box .bottom .title .choice dl:nth-child(2)").show().addClass("on").siblings().removeClass("on").hide();
		$(".x_box .bottom .title .choice dl:nth-child(1)").hide();
		if ($('.x_box').hasClass("on")) {
			$(".x_box .bottom textarea").focus();
			return false;
		} else {
			$('.x_box').addClass("on");
			$(".x_box .bottom textarea").focus();
		}

	})
	//单选按钮事件
	$('.x_box .bottom .title .choice dl').click(function () {
		//		$(".x_box .bottom textarea").focus();
		if ($(this).hasClass("on")) {
			return false;
		} else {
			$(this).addClass('on').siblings().removeClass('on');
		}
	})

	//文本域字数限制提示
	$(".x_box .bottom a.send").click(function () {

		var _len = $(".x_box .bottom textarea").val().length;
		if (_len > 0) {
			if (_len < 5 || _len > 200) {
				alert("输入字数需要5~200字之间哟");
			} else {
				$(".x_box").hide();
				location.href = "prize.html";
			}
		} else {
			$(".x_box").hide();
			location.href = "prize.html";
		}
	})

	//更多视频列表点击弹出视频弹窗事件
	$(".wrap_in2 .head a").click(function (e) {
		e.preventDefault();
		$(".main").addClass("cur");
		$("#video").attr("src", $(this).attr("href"));
		$("#video").get(0).play();

		$("#video").get(0).addEventListener('play', function () {
			$('.main').addClass('on');
		}, false);

		$(".wrap").hide();
		$("body").addClass('off');
	})


	//视频弹窗关闭事件
	$(".close").click(function () {
		$('.main').removeClass('cur');
		$(".wrap").show();
		$("#video").attr("src", "");
		$("body").removeClass('off');
	})


	//分享弹出
	$(".head_icon2").click(function () {
		$(".layer,.layer_share").show();
	})


	//分享关闭

	$(".share_close").click(function () {
		$(".layer,.layer_share").hide();
	})

	//微信分享弹出
	$(".weixin").click(function () {
		$(".weixin_layer").show();
	})
	//微信分享关闭
	$(".weixin_layer").click(function () {
		$(this).hide();
	})

	//海报分享弹出
	$(".poster").click(function () {
		$(".poster_layer").show();
	})
	//海报分享关闭
	$(".poster_close").click(function () {
		$(this).parents(".poster_layer").hide();
	})

	//点赞事件
	$(document).on('click', '.good', function(){
		
			var num = parseInt($(this).find("p").text());
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				num = num - 1;
			} else {
				$(this).addClass("on");
				num = num + 1;
			}
			$(this).find("p").text(num);
	})
	$(".good").each(function () {
		
	})
	$(".zan").each(function () {
		$(this).click(function () {
			//			var num = parseInt($(this).find("p").text());
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				//				num = num - 1;

			} else {
				$(this).addClass("on");
				//				num = num + 1;
			}
			//			$(this).find("p").text(num);
		})
	})


	//关注事件
	$(".content .sidebar .follow").click(function () {
		$(".layer,.layer_follow").show();
	})
	//关闭关注事件
	$(".follow_close").click(function () {
		$(".layer,.layer_follow").hide();
	})

	//信息框关闭事件
	$(".info_btn").click(function () {
		$(".layer_info").hide();
	})

	var is_weixin = (function () {
		return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
	})();
	if (is_weixin) {
		$(".layer_info").show();
	} else {
		$(".layer_info").hide();
	}


	$(".pk_wrap").each(function () {

		$W = $(this);
		//		console.log($W.index())
		//中间
		$M = $W.find(".pk_m");

		//左边
		$L = $W.find(".pk_l")

		//左边文字
		$L_txt = $L.find(".pk_txt")


		//右边
		$R = $W.find(".pk_r");

		//右边文字
		$R_txt = $R.find(".pk_txt")

		$L_p = (parseFloat($L.find(".p1 i").text()) / 100).toFixed(1);
		//		console.log($L_p)
		$L.width(Math.floor(($W.width() - $M.width()) * $L_p)-1);

		$R_p = (parseFloat($R.find(".p1 i").text()) / 100).toFixed(1);
		//		console.log($R_p)
		$R.width(Math.floor(($W.width() - $M.width()) * $R_p)-1);

		if ($L.width() < $L_txt.width()) {
			if (Math.floor($L.find(".p1 i").text()) == 0) {
				$L.remove();;
				$M.remove();
				$R.width(Math.floor($W.width()))
			} else {
				$L.width(Math.floor($L_txt.width()));
				$R.width(Math.floor($W.width() - $M.width() - $L.width()));
			}

		}
		if ($R.width() < $R_txt.width()) {
			if (Math.floor($R.find(".p1 i").text()) == 0) {
				$R.remove();;
				$M.remove();
				$L.width(Math.floor($W.width()))
			} else {
				$R.width(Math.floor($R_txt.width()));
				$L.width(Math.floor($W.width() - $M.width() - $R.width()));
			}
		}


	})

	//红包弹窗关闭事件
	close(".money_close", ".layer,.layer_money");
	close(".dlb_close", ".layer,.layer_dlb");
	close(".zc_close", ".layer,.layer_zc");
	close(".xy_close", ".layer,.layer_xy");
	close(".xff_close", ".layer,.layer_xff");

	$('.onprize').slide({
		mainCell: ".onprize-list ul",
		autoPlay: true,
		effect: "topMarquee",
		vis: 5,
		interTime: 40
	})

	$('.new_list_more').click(function () {
		var data = {
			'imgurl': 'images/yuer_head04.jpg',
			'name': 'Sa宝妈',
			'label': '新鲜派',
			'msg': '美食圈的朋友们投票一半一半',
			'num': 0
		}
		var str = '<li><img src="'+ data.imgurl +'" class="yuer_head fl" /><dl class="fr"><dt>'+ data.name +'<div class="tips t1">'+ data.label +'</div></dt><dd><p>'+ data.msg +'</p></dd></dl><div class="good"><div class="good_img"><img src="images/icon03.png" class="good_img_no" /><img src="images/icon03_on.png" class="good_img_yes" /></div><p>'+data.num+'</p></div><div class="clear"></div></li>';
		$('.new_list ul').append(str);
	})
})

function close(btn, layer) {
	$(btn).click(function () {
		$(layer).hide();
	})
}