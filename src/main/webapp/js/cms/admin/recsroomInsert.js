$(function(){
	
	//noticeInsertObj.create();
});

var recsroomInsertObj = {
	
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

//목록 돌아가기
function fn_list(){
	
	document.location.href = "/admin/recsroom/list.do";
}

//등록하기
function fn_add(){
	
	if(confirm("등록 하시겠습니까?")){
		var URL="/admin/recsroom/insertProc.do";	
		var form = $('#insertForm')[0];
		var formData = new FormData(form);
		//var formData = $("#insertForm").serialize();
		$.ajax({
		   url: URL,
		   processData: false,
		   contentType: false,
		   data: formData,
		   type: 'POST',
		   success: function(result){
			   alert("등록되었습니다.");
			   
			   //fn_wrapLoading();
			   $('#searchForm').attr('action','/admin/recsroom/list.do').submit();
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}
