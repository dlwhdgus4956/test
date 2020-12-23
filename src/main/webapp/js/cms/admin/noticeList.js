$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//noticeListObj.create();
});

var noticeListObj = {
	
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
	
	$('#searchFrm').attr('action','/admin/notice/insert.do').submit();
}

//공지사항삭제
function fn_delete(noticeNo){
	
	if(confirm("삭제 하시겠습니까?")){
		var URL="/admin/notice/delete.do";	
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
			   location.href=('/admin/notice/list.do');
			   
			   //fn_wrapLoading();
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}

function view(noticeNo){
	
	$('#searchFrm').attr('action','/admin/notice/view.do?noticeNo='+noticeNo).submit();
}

function goList(page) {

	if(typeof(page) == "undefined") $("#currentPage").val(1);
    else $("#currentPage").val(page); 
	//fn_wrapLoading();
	$('#searchFrm').attr('action','/admin/notice/list.do').submit();
}

