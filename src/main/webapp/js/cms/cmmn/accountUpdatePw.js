$(function(){
	
	$.isUserPW = function(value){
		var chk = /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;//영문숫자특수부호9~20자 조합해야
		return chk.test(value);
	};
	
	//accountUpdatePwObj.create();
});

var accountUpdatePwObj = {
		
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
	
	document.location.href = "/main/main.do";
}

function pwCheck(){
	
	if($.trim($("#cpassword").val())==""){
		alert("현재 비밀번호를 입력하십시오.");
		$("#cpassword").focus();
		return;
	}
	
	var getPw = $("#cpassword").val();
	var userId = $("#userId").val();
	var URL = "/cmmn/account/pwCheck.do";	
	$.ajax({
    	type:"GET",
        async:false,
        url:URL,
		data : {
			"cpassword" : getPw,
			"userId" : userId
		},
		success : function(result) {  
			
			if(result.result){
				
				accUpdate();
			}else {
				
				$("#cpassword").val("");
				$("#Password").val("");
				$("#Password2").val("");
				
				 alert("기존 비밀번호가 일치하지 않습니다.");
			}
			
		},
		error : function(xhr, status, error) {
			
			alert("요청실패(서버상태:" + status + ")"); 
		}
	});
}

//개인계정 비밀번호 수정
function accUpdate(){
	
	
	if($.trim($("#password").val())==""){
		alert("비밀번호를 입력하십시오.");
		$("#password").focus();
		return;
	}
	if( $.isUserPW($.trim($("#password").val()))==false){
		alert("비밀번호는 9~20자의 영문, 숫자, 특수문자 조합하여야 합니다.");
		//alert("비밀번호는 6~12자의 영문, 숫자만 가능합니다.");
		$("#password").focus();
		return;
	}
	
	if($.trim($("#password2").val())==""){
		alert("비밀번호 확인을 입력하십시오.");
		$("#password2").focus();
		return;
	}
	if($.trim($("#password").val())!=$.trim($("#password2").val())){
		alert("비밀번호와 비밀번호확인 입력값이 일치하지 않습니다.");
		$("#password").focus();
		return;
	}
	
	if(confirm("등록 하시겠습니까?")){
		var URL="/cmmn/account/pwUpdateProc.do";	
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
