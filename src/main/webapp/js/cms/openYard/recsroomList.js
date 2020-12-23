$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//noticeListObj.create();
});

var recsroomListObj = {
	
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
	
	$('#searchFrm').attr('action','/openYard/recsroom/insert.do').submit();
}

//자료실 삭제
function fn_delete(recsroom){
	
	if(confirm("삭제 하시겠습니까?")){
		var URL="/openYard/recsroom/delete.do";	
		$.ajax({
			type: 'POST',
			url: URL,
		    async:false,
            dataType :"json" ,
            url:URL,
		    data : {
	   			"noticeNo" : noticeNo
	   		},
		   
		   success: function(result){
			   
			   alert("삭제되었습니다.");
			   location.href=('/openYard/recsroom/list.do');
			   
			   //fn_wrapLoading();
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}

function view(recsroomNo){
	
	$('#searchFrm').attr('action','/openYard/recsroom/view.do?recsroomNo='+recsroomNo).submit();
}

function goList(page) {

	if(typeof(page) == "undefined") $("#currentPage").val(1);
    else $("#currentPage").val(page); 
	//fn_wrapLoading();
	$('#searchFrm').attr('action','/openYard/recsroom/list.do').submit();
}

