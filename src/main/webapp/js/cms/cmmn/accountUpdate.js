$(function(){
	
	$.isUserPW = function(value){
		var chk = /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;//영문숫자특수부호9~20자 조합해야
		return chk.test(value);
	};
	
	//accountUpdateObj.create();
});

var accountUpdateObj = {
		
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
function goMain(){
	var that = this;
	
	document.location.href = "/main/main.do";
}

//개인정보수정
function accUpdate(){
	var that = this;
	
	if(confirm("등록 하시겠습니까?")){
		var URL="/cmmn/account/updateProc.do";	
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
			   document.location.href = "/main/main.do";
		   },
		   error : function(xhr, status, error) {
			   console.log(error);
			   alert("요청실패(서버상태:" + status + ")"); 
			}
		});
		
	}
}
