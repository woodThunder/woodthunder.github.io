$(function() {
	// 获取UserAgent
	var u = navigator.userAgent;
	// 安卓
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	// IOS
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	
	if(isAndroid){
	  $("body").addClass('android');
	}
	else{
		$("body").removeClass('android');
	}
	
	
	$(".interlocution .tabs ul li").click(function() {
		$(this).addClass("on").siblings().removeClass("on");
		var link = $(this).data("src");
		cityAjax(link);
	})
//	$(".interlocution .tabs ul li:eq(0)").click();
	var index = request("index");
	
	$(".interlocution .tabs ul li:eq(" + index + ")").click();
	
//	育儿贴士
	var childcare = new Swiper('.swiper-childcare', {
		spaceBetween: 15,
		pagination: {
		    el: '.swiper-childcare .swiper-pagination',
		},
		//loop: true,
		//loopedSlides: 5, //looped slides should be the same
		//		navigation: {
		//			nextEl: '.swiper-button-next',
		//			prevEl: '.swiper-button-prev',
		//		},
		
	});
	
	
	$(document).on("click",".editinfo .channel_nofollow ul li a",function(){
		$(this).toggleClass("on");
	})
	
	var now = new Date().Format("yyyy-MM-dd");
	var currYear = (new Date()).getFullYear();
	
	$(document).on("click",".nogrow_box",function(){
   		$(".nogrow_layer").show();
   	})
	$(document).on("click",".nogrow_layer .nogrow_layer_mask",function(){
   		$(".nogrow_layer").hide();
   	})
	
	
//	私人订制-上传照片-时间mibiscroll
	$('#nowtime').attr("placeholder",now);
	
	$('#nowtime').mobiscroll().date({
        theme: 'android-ics light',
        display: 'bottom',
        lang: 'zh',
        startYear: currYear - 50, //开始年份
		endYear: currYear + 50, //结束年份
		dateFormat: 'yy-mm-dd'
    });
	
	
	/*私人订制-疫苗详情*/
	 $('#vaccined_status_mobiscroll').mobiscroll().select({
        theme: 'android-ics light',
        display: 'bottom',
        lang: 'zh',
        headerText: '选择接种状态',
        onSelect: function(valueText, inst) {
        	$(".status_img").attr("src","../images/vaccine_icon_status0"+ inst.values +".png")
		}
    });
    
    /*星妈课堂-课程预告*/
   	$(document).on("click",".preview_c .take",function(){
   		$(".preview_c .preview_c_img").toggle();
   		if(!$(this).hasClass("on")){
   			$(this).addClass("on");
   			$(this).find("i").html("展开");
   		}else{
   			$(this).removeClass("on");
   			$(this).find("i").html("收起");
   		}
   	})
   	
   	
   	/*星妈课堂-邀请卡页面*/
   	$(".thumb-inner-list .thumb-item").eq(0).addClass("active");
   	$(document).on("click",".thumb-inner-list .thumb-item",function(){
// 		$("img#image").attr("src",$(this).data('card'));
		if($(this).hasClass("active")){
			return;
		}else{
   			$(this).addClass("active").siblings().removeClass("active");
   		}
   	})
   	
   	$(document).on("click",".tutorial-btn",function(){
   		$(".notice").show();
   	})
   	$(document).on("click",".notice .message_btn,.notice .mask",function(){
   		$(".notice").hide();
   	})
   	
   	
   	$(document).on("click",".mask,.remove-btn",function(){
   		$(".co-dialog").hide();
   	})
   	$(document).on("click",".side-btn",function(){
   		$(".co-dialog").show();
   	})
// 	try{
// 		$("body").mCustomScrollbar({});
// 	}catch(e){
// 		//TODO handle the exception
// 	}
   	
	
})

window.onload = function(){
//	alert($(".card_list > img").width())
	$(".card_list").width($(".card_list > img").width());
}

function cityAjax(url) {
	$.ajax({
		url: url,
		success: function(msg) {
			$('.interlocution .con ul').html(msg);
		}
	});
}

function request(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for(i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}


/*时间格式化*/
Date.prototype.Format = function (fmt) {   
    var o = {  
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds() //秒   
    };  
    if (/(y+)/.test(fmt)){ //根据y的长度来截取年  
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o){  
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    }  
    return fmt;  
}  
/*时间补0的方法*/
function padLeftZero(str) {  
    return ('00' + str).substr(str.length);  
} 


