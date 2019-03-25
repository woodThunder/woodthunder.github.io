$(document).ready(function(){
	five();
	$(window).resize(function(){
		five();
	})
	
	
	$(document).on("click",".channel_follow ul li a",function(){
		var val = $(this).find("i").text();
		$(this).parent().remove();
		var str = '<li><a href="javascript:;">' + val + '</a></li>'
		$(".channel_nofollow ul").append(str);
	})
	$(document).on("click",".channel_nofollow ul li a",function(){
		var val = $(this).text();
		$(this).parent().remove();
		var str = '<li><a href="javascript:;"><span>×</span><i>' + val + '</i></a></li>'
		$(".channel_follow ul").append(str);
		five();
	})


// 获取UserAgent
var u = navigator.userAgent;
// 安卓
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// IOS
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

if(isAndroid){
  $("body").addClass('android');
}
else{$("body").removeClass('android');}





	//搜索下拉框结果
	$(document).on("click",".search_txt",function(){
		$(this).blur();
      	$(".search_box").show();
      	$(".search_box .search_txt").focus();
	})

	$(document).on("click",".baby_delete",function(){
      $(this).next(".baby_search_follow").find(".baby_search_list").remove();
	})

  $(document).on("click",".baby_search_list li span",function(){
      $(this).parent("li").remove();
  })

	$(document).on("click",".baby_close",function(){
      $(this).parents(".search_box").hide();
	})

	//--------------公用选项卡切换
    $(document).on("click", ".tab-box .tab-a", function () {    
        $(this).addClass("on").siblings().removeClass("on");
        var ii=$(this).index();
        //$.getScript("../javascript/ratio-img.js");
        $(this).parents(".tab-box").find(".tab-b").eq(ii).show().siblings().hide();
    })
    //
    $(".tab-box").each(function (i) {
        $(this).find(".tab-a:eq(0)").click();
    });
    


    //--------------收缩展开
    $(document).on("click",".inte_tit",function(){
        $(this).parents("li").toggleClass('on');
        if($(this).parents("li").hasClass('on')){
        	$(this).parents("li").find(".inte_con").slideUp("slow");
        }
        else{
            $(this).parents("li").find(".inte_con").slideDown("slow");
        }
    })
	//end

    //--------------取消收藏
    $(document).on("click",".favorite dd .btn",function(){
       $(this).parent("dd").remove();
       if($(".favorite dd").size() < 1){
        $(".favorite").find("p").show();
       }
       else{
        $(".favorite").find("p").hide();
       }
    })
    //end



})


function five(){
	$(".channel_follow .channel_list li i").each(function(){
		var len = $.trim($(this).text()).length;
		if(len == 5){
			if($(window).width() <= 350){
				$(this).css({
					"float":"right",
					"margin-right":"5px",
					"font-size":"10px"
				})
			}else{
				$(this).css({
					"font-size":"10px"
				})
			}
			
		}
	})
}
