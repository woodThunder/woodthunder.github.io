$(function(){
    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides : true,
        // loop: true
    })
    
    var textValue = '';
    var parentText = {};
    var prevValue = '';
    $('.child_3_line').click(function(){
        parentText = $(this).parents('.swiper-slide').find('.child_text span');
        prevValue = parentText.text();
        $('.text-shadow input').val('');
        $('.text-shadow').fadeIn();
    })
    $('.text-shadow').click(function(){
        $(this).fadeOut();
    })
    $('.text-shadow input').click(function(e){
        e.stopPropagation();
    })
    $('.text-save').click(function(e){
        e.stopPropagation();
        var parent = $('.text-shadow');
        textValue = parent.find('input').val();
        textValue == '' ?  parentText.text(prevValue) : parentText.text(textValue);
        parent.fadeOut();
    })
})