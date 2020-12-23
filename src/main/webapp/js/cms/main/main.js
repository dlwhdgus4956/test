$(function(){
	mainObj.create();
})

var mainObj ={
	
	create : function(){
		var that = this;
		
		this.bind();
		this.init();
	},
	bind : function(){
		var that = this;
		popup();
		closePopup();
		loginPopup()
		
	},
	init : function(){
		var that = this;
	}
}
//팝업
function popup() {
    $('[data-pop-btn]').click(function() {
        $('[data-pop-window="' + $(this).data('pop-btn') + '"]').show();
    });
}

function closePopup() {
    $('.popup-close').click(function() {
        $(this).parents('.popup-wrap').hide();
    });

}
function loginPopup() {
	if($("#error").text() !=''){
		$("#loginPopup").show();
	}
}