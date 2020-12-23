//서브 left메뉴
$(function(){
	var acodian = {
	
	  click: function(target) {
	    var _self = this,
	      $target = $(target);
	    $target.on('click', function(e) {
	      e.preventDefault();
	      var $this = $(this);
	      if ($this.next('.sub_aside').css('display') == 'none') {
	        $('.sub_aside').slideUp();
	        _self.onremove($target);
	
	        $this.addClass('has_sub_on');
	        $this.next().slideDown();
	      } else {
	        $('.sub_aside').slideUp();
	        _self.onremove($target);
	
	      }
	    });
	  },
	  onremove: function($target) {
	    $target.removeClass('has_sub_on');
	  }
	};
	acodian.click('.menulink');
});

// 탭 메뉴
$(function(){

	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show(); 
	$(".tab_content:first").show();

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
	
});

//팝업
function popup() {
    $('[data-pop-btn]').click(function(e) {
		e.preventDefault();	
        $('[data-pop-window="' + $(this).data('pop-btn') + '"]').show();
    });
}

function closePopup() {
    $('.popup-close').click(function() {
        $(this).parents('.popup-wrap').hide();
    });

}

$(function() {
    closePopup();
    popup();
});

//datepicker
$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});
