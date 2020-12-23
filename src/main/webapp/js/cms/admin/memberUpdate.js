$(function(){
	
	$.isEmail = function(value){
		var chk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		return chk.test(value);
	}; 
	
	//memberUpdateObj.create();
});

var memberUpdateObj = {
	
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

//목록돌아가기
function fn_list(){
	
	$('#memberForm').attr('action','/admin/member/list.do').submit();
}

//사용자 정보수정
function fn_submit(){
	
	if(confirm("수정 하시겠습니까?")){
		
		var URL="/admin/member/updateProc.do";	
	    var formData = $("#memberForm").serialize();
		
	    $.ajax({
	    	type:"POST",
            async:false,
	        url:URL,
			data : formData,
			success : function(result) {  
				
				alert("수정되었습니다.");
				$('#memberForm').attr('action','/admin/member/list.do').submit();
			},
			error : function(xhr, status, error) {
				console.log(error);
				alert("요청실패(서버상태:" + status + ")"); 
			}
		});
	}
}

//비밀번호재발급 (비밀번호를 사용자정보 수정페이지에 출력하는방식)
function fn_pwInit(userId){
	
	$("#memberForm").attr("action","/admin/member/pwInit.do?userId="+userId);
	$("#memberForm").removeAttr("onsubmit");
	$("#memberForm").submit();   
}

//사용자 정보삭제
function fn_remove(userId){
	
	
	if(confirm("회원삭제 하시겠습니까?")){
		
		var URL="/admin/member/delete.do";	
		
	    $.ajax({
	    	type:"POST",
            async:false,
            dataType :"json" ,
            url:URL,
    		data : {
    			"userId" : userId
    		},
			success : function(result) {  
				
				alert("삭제되었습니다.");
				
				fn_wrapLoading();
				location.href=('/admin/member/list.do');
			},
			error : function(xhr, status, error) {
				console.log(error);
				alert("요청실패(서버상태:" + status + ")"); 
			}
		});
	}
}