$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//noticeListObj.create();
});

var logSttusListObj = {
	
		create : function(){
			var that = this;
			
			that.bind();
			that.init();
		},
		
		bind : function(){
			var that = this;
			
		},
		
		init : function(){
			var that = this;
			
		}
}



function goList(page) {

	if(typeof(page) == "undefined") $("#currentPage").val(1);
    else $("#currentPage").val(page); 
	//fn_wrapLoading();
	$('#searchFrm').attr('action','/admin/logSttus/list.do').submit();
}

