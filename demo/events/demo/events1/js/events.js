var winw, histabWidth, histabLength, histabIndex, hisLength;
var slickFlag = true;
var clickFlag = true;
var rightFlag = false;
var leftFlag = false;
var mySwiper, activeIndex = 0;
/*.....................................................................start*/

//初始化
function his_Int() {
	
	//swiper
	mySwiper = new Swiper('.history_cont .swiper-container', {
		prevButton: '.history_cont .prev',
		nextButton: '.history_cont .next',
		slidesPerView: 32,
		breakpoints: {
			//当宽度小于等于1024
			1023: {
				slidesPerView: 20
			},
			540: {
				slidesPerView: 10
			}
		},
		onInit: function(){
			
		}

	})
	
	setTimeout(function(){
		//总长度
		histabLength = $('.history_tab li').length;
		
		//每一段的长度
		histabWidth = $('.history_tab li').eq(0).width();
	//	histabWidth = $('.history_tab').width()/mySwiper.params.slidesPerView
		
		//当前的下标
		histabIndex = 0;
		
		//默认有按钮可点击
		$('.history_tab .but a.next').addClass('on');
		
		//总长度小于页面显示长度  左右按钮隐藏
		if(histabLength < mySwiper.params.slidesPerView) {
			$('.history_tab .but').fadeOut().hide();
		} else {
			$(".history_tab").mouseover(function() {
				$('.history_tab .but').fadeIn().show();
			})
			$('.history_tab').mouseleave(function() {
	
				$('.history_tab .but').fadeOut().hide();
			})
		}
		
		
		//
		$(".history_tab li").eq(0).addClass('an');
		$(".history_tab li:nth-child(10n+1)").addClass('an');
	
		$(".history_tab li.an").each(function() {
			$(".history_tab li.an:odd").addClass("cur");
			$(".history_tab li.an").last().addClass("last");
			$(".history_tab li.last").nextAll().addClass("last-after");
	
			$(".history_tab li.last-after").each(function() {
				if($(".history_tab li.last-after").length >= 10) {
					$(".history_tab li.last").removeClass("last");
				}
			})
	
		})
		
		//十年间隔线
//		console.log(histabWidth)
		$(".his_radian").width(histabWidth * 10);
		$(".his_radian").css({
			'margin-left': histabWidth / 2
		})
	},200)
}

function histabSlide() {
	$('.history_tab .but a.prev,.history_tab .but a.next').addClass('on');
	if(histabIndex > histabLength - 1) {
		histabIndex = histabLength - 1;
	}
	if(histabIndex < 0) {
		histabIndex = 0;
	}
	$('.history_tab li').eq(histabIndex).addClass('on').siblings().removeClass('on');
	
	var pageIndex = $('.history_tab li').eq(histabIndex).find('a');
	doortabAjax(pageIndex);
	
	if(histabIndex < 1) {
		$('.history_tab .but a.prev').removeClass('on');
	}
	if(histabIndex > histabLength - 2) {
		$('.history_tab .but a.next').removeClass('on');
	}
}

/*ajax调取数据*/
function doortabAjax(pageIndex) {
	var url = pageIndex.attr('href')
	if(url == null) return false;
	$.ajax({
		type: "GET",
		url: url,
		success: function(msg) {
			$('#content').html($(msg).find('#content').html())
			imgratio();
			$(".his_list dd").mCustomScrollbar("destroy");
			$(".his_list dd").mCustomScrollbar({
				advanced: {
					updateOnContentResize: true,
				},
			});
			$(".his_list dd li").eq(0).addClass("on");
			$(".his_list dd li").hover(function() {
				$(".his_list dt li").eq($(this).index()).fadeIn().show().siblings().fadeOut().hide();
				$(this).addClass("on").siblings().removeClass("on");
			})

		}
	})
}

$(document).on('click', '.history_tab .but a.prev', function() {
	histabIndex--;
	//判断之前的slide，第一个含有a的下标
	for(var i = histabIndex; i >= 0; i--) {
		if($('.history_tab li').eq(i).find('a').attr('href') != "") {
			histabIndex = i;
			histabSlide();
			swiperTo();
			return false;
		}
	}
})
$(document).on('click', '.history_tab .but a.next', function() {
	histabIndex++;
	//判断之后的slide，第一个含有a的下标
	for(var i = histabIndex; i < histabLength; i++) {
		//console.log("i：" + i)
		//console.log($('.history_tab .swiper-slide').eq(i).find('a').attr('href') != "")
		if($('.history_tab li').eq(i).find('a').attr('href') != "") {
			histabIndex = i;
			histabSlide();
			swiperTo();
			return false;
		}

	}

})
$(document).on('click', '.history_tab li', function(e) {
	
	//判断时候有ajax链接
	var txt = $(this).find("p").text();
	if($(this).find("a").attr("href") == "") {
		alert(txt+"年没有大事件发生哟！")
		return false;
	}
	//阻止默认事件
	if(window.event) {
		//IE中阻止函数器默认动作的方式  
		window.event.returnValue = false;
	} else {
		//阻止默认浏览器动作(W3C)  
		e.preventDefault();
	}
	
	histabIndex = $(this).index();
	histabSlide();
	swiperTo();
	
})


function swiperTo(){
	var change = histabLength - mySwiper.params.slidesPerView;
	if(histabIndex > change) {
		mySwiper.slideTo(change);
	} else {
		mySwiper.slideTo(histabIndex);
	}
}
/*............................................................end*/

$(function() {
	winw = $(window).width();
	his_Int();
	$(".history_tab li").eq(0).click()
})


$(window).resize(function() {
	winw = $(window).width();
	his_Int();
	$(".history_tab li").eq(0).click()
});