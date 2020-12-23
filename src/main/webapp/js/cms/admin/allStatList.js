$(document).ready(function() {
	
	fn_setDatePicker("schFrDate");
	//fn_setDatePicker("schToDate");
	
});

var allStatListObj = {
	
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
	$('#searchFrm').attr('action','/admin/logStat/allList.do').submit();
}

function displayMenu(index) {
	var index = index.value;
	
    if (index == 1) {

    	$("#page1").show();
        $("#page2").hide();
        $("#page3").hide();
        
        $("#graph_box").show();
        $("#graph_box2").hide();
        $("#graph_box3").hide();
        
    	$("#yyGbn").show();
        $("#mmGbn").hide();
        $("#schDate").hide();
    }else if(index == 2){
    	$("#page1").hide();
        $("#page2").show();
        $("#page3").hide();
        
        $("#graph_box").hide();
        $("#graph_box2").show();
        $("#graph_box3").hide();
        
    	$("#yyGbn").show();
        $("#mmGbn").show();
        $("#schDate").hide();
    }else if(index == 3){
    	$("#page1").hide();
        $("#page2").hide();
        $("#page3").show();
        
        $("#graph_box").hide();
        $("#graph_box2").hide();
        $("#graph_box").show();
        
        $("#yyGbn").hide();
        $("#mmGbn").hide();
        $("#schDate").show();
    }else {
    	$("#page1").show();
        $("#page2").hide();
        $("#page3").hide();
        
        $("#graph_box").show();
        $("#graph_box2").hide();
        $("#graph_box3").hide();
        
    	$("#yyGbn").show();
    	$("#mmGbn").hide();
        $("#schFrDate").hide();
    }

}

