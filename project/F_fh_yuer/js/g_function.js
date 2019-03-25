$(function(){
    // var touchtime = new Date().getTime();
    var n=0;
    var timer=null;
    
//  document.body.addEventListener('touchmove' , function(e){
//      e.preventDefault();
//  })
    $('.play-btn').on('click', function(e){
        e.stopPropagation();
        if(!$('.main').hasClass('on')){
            $('.main').addClass('on');
            $('#video').get(0).play();
            $('#video').removeAttr('muted');
            watchVideo();
        }
    })

    $('.content').on('click', function(e){
        clearTimeout(timer);
        n++;
        if(n==1){
            timer=setTimeout(function(){
                if(!$('.main').hasClass('on')){
                    $('.main').addClass('on');
                    $('#video').get(0).play();
                    $('#video').removeAttr('muted');
                }else{
                    $('#video').get(0).pause();
                    $('.main').removeClass('on')
                }
                n=0;
            },400);
        }else if(n==2){
        	console.log("2018");
        	var $heart = $("<img src='images/heart.png' class='heart' />");
        	$(".content").append($heart);
        	var e = event || window.event;
        	var num = Math.random()*10;
            $heart.css({
            	"left": e.clientX,
            	"top": e.clientY,
            	"transform": "translate(-50%,-50%) rotateZ("+ fRandomBy(-30, 30) +"deg)"
            }).show().animate({
            	opacity: 0,
            	width: "150px",
            	left: e.clientX +10,
            	top: e.clientY - 50
            },1000,function(){
            	$(this).remove();
            })
            if(!$('.col').hasClass('on')){
                $('.col').addClass('on');
            }
            n=0;
            
        }
    })
    
    $('.content .sidebar, .content h1, .content h2, .commit-list').on('click', function(e){
        e.stopPropagation();
    })
	
	
	
    $('.content .commit').click(function(){
        $('.commit-list').addClass('on');
        try{
			var $resourceTypeList = $('.resource-type-list');
			$resourceTypeList.infinitescroll({
		        navSelector     : "#more",
		        nextSelector    : "#more a",
		        itemSelector    : ".panel",
		       //pixelsFromNavToBottom: 150,   
//		        clickb          : false,
		        clickobj        : ".load-more-link",
		        behavior: 'local',
  				binder: $('.list-box'),
		        loading:{
		            img: "",
		            msgText: '加载中',
		            finishedMsg: '没有了',
		            finished: function(){
		                $("#infscr-loading").hide();
		            }
		        }, 
		        errorCallback:function(){
		        	$(".load-more-link").hide();
		        }
		
		    }, function(newElements){
		        var $newElems = $(newElements);
		        $resourceTypeList.imagesLoaded(function() {
		        	$newElems.fadeIn();
		        });
		        return;
		    });
		}catch(e){
			//TODO handle the exception
		}
    })

    $('.commit-list .close-btn').click(function(){
        $(this).parents('.commit-list').removeClass('on');
    })

    $(document).click(function(){
        var f = $('.commit-list').hasClass('on');
        if(f){
            $('.commit-list').removeClass('on');
        }
    })

    $('.bottom-box').click(function(e){
        e.stopPropagation();
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.commit-list').removeClass('on');
        }
    })

    $('.bottom-box .bottom').click(function(e){
        e.stopPropagation();
        var _thisp = $(this).parents('.bottom-box');
        if(!_thisp.hasClass('on')){
            _thisp.addClass('on');
            $(this).find('textarea').focus();
        }
    })

    $('.bottom .title .choice dl').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
    })
    
    $("#video").get(0).addEventListener("pause",function(){
	    $('.main').removeClass('on');
	});
	
	$('.content .col').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
    })
//	$(".play-btn").click();
})

function watchVideo() {
    var video = document.getElementById("video"); 
    video.addEventListener('ended', function () {  
        $('.main').removeClass('on');
        video.currentTime = 0;
    }, false);
}

function fRandomBy(under, over){ 
   switch(arguments.length){ 
     case 1: return parseInt(Math.random()*under+1); 
     case 2: return parseInt(Math.random()*(over-under+1) + under); 
     default: return 0; 
   } 
} 