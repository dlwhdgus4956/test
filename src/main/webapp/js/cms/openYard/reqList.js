$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//noticeListObj.create();
});

var reqListObj = {
	
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

function addPage(){
	
	$('#searchFrm').attr('action','/openYard/req/insert.do').submit();
}

//자료실 삭제
function fn_delete(reqNo){
	
	if(confirm("삭제 하시겠습니까?")){
		var URL="/openYard/req/delete.do";	
		$.ajax({
			type: 'POST',
			url: URL,
		    async:false,
            dataType :"json" ,
            url:URL,
		    data : {
	   			"reqNo" : reqNo
	   		},
		   
		   success: function(result){
			   
			   alert("삭제되었습니다.");
			   location.href=('/openYard/req/list.do');
			   
			   //fn_wrapLoading();
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}

function view(reqNo){
	
	$('#searchFrm').attr('action','/openYard/req/view.do?reqNo='+reqNo).submit();
}

function goList(page) {

	if(typeof(page) == "undefined") $("#currentPage").val(1);
    else $("#currentPage").val(page); 
	//fn_wrapLoading();
	$('#searchFrm').attr('action','/openYard/req/list.do').submit();
}

