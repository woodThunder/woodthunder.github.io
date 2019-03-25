$(function() {
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
		var str = '<li><a href="javascript:;"><span>&times;</span><i>' + val + '</i></a></li>'
		$(".channel_follow ul").append(str);
		five();
	})
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