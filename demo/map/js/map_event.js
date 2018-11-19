$(document).ready(function(){
	$(".map_nav a").click(function(){
		$(".map_loading").show();
		$(this).addClass("active").siblings().removeClass("active");
		var arr = $(this).attr('data-w').split(",");
		if($(this).hasClass("build")){
			Map.search(arr, $(this).attr('data-i'),$(this).index()+1,ary)
		}else{
			Map.search(arr, $(this).attr('data-i'),$(this).index()+1)
		}
		
	})
	$(".map_nav a:eq(0)").click();
	
	$(document).on("click",".map_tabs a",function(){
		if($(this).hasClass("cur")){
			return false;
		}
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".map_cc ul").eq($(this).index()).show().siblings().hide();
		$(".map_con ul").mCustomScrollbar({});
	})
})
