$(function(){
	
	//noticeUpdateObj.create();
});

var noticeUpdateObj = {
	
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
	
	document.location.href = "/admin/notice/list.do";
}

//수정하기
function fn_update(){
	
	if(confirm("수정 하시겠습니까?")){
		var URL="/admin/notice/updateProc.do";	
		var form = $('#insertForm')[0];
		var formData = new FormData(form);
		$.ajax({
		   url: URL,
		   processData: false,
		   contentType: false,
		   data: formData,
		   type: 'POST',
		   success: function(result){
			   alert("등록되었습니다.");
			   
			   //fn_wrapLoading();
			   $('#searchForm').attr('action','/admin/notice/list.do').submit();
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}

//파일삭제
function fn_removeFile(noticeNo){
	
	if(confirm("파일을 삭제 하시겠습니까?")){
		var URL="/admin/notice/deleteFile.do";	
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
			   
			   //fn_wrapLoading();
			   $(".dynamicArea").html("");
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
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
			   
			   //fn_wrapLoading();
			   location.href=('/admin/notice/list.do');
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}

function fileDownLoad(fileNo){
	
	location.href=('/file/'+ fileNo + '/download.do');
	//location.href=( fileNo + '/download.do');
}
