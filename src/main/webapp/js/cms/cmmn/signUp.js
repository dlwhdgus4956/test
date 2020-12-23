$(function(){
	
	$.isUserID = function(value){
		var chk = /^[a-z0-9_-]{5,12}$/;
		return chk.test(value);
	};
	
	$.isUserPW = function(value){
		var chk = /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;//영문숫자특수부호9~20자 조합해야
		//var chk = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/;//영문소문숫자특수부호6~12자 조합해야		
		//var chk = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-z]).*$/;
		return chk.test(value);
	};
	
	//signUpObj.create();
});

var signUpObj = {
	
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

//아이디 중복검사
function fn_idCheck(){
	
	if($.trim($("#userId").val())==""){
		alert("아이디를 입력해주세요");
		$("#userId").focus();
		return;
	}	
	if(    $.isUserID($.trim($("#userId").val())) ==false ){
		alert("아이디는 5~12자의 영문소문자, 숫자만 가능합니다.");
		$("#userId").focus();
		return;
	}
	var param = '?userId=' + $.trim($("#userId").val());
	//동일한 파라미터로 호출하면 캐시가 남아있어 기존결과를 불러오기 때문에 
	//unique한 더미 값으로 파라미터 추가  
	//param += '&timestmp=' + Math.round(Math.random()* (new Date().getTime()));
	
	$.ajax({
		type: "GET", 
		url : '/cmmn/member/idCheck.do'+param,
		dataType: "text",		
		async : false,
		success: function(RES) {
			if($.trim(RES)=="Y"){
				alert("사용가능한 아이디 입니다");
				$("#checkId").val($.trim($("#userId").val()));
				return;
			}else{
				alert("이미 등록된 아이디 입니다");
				$("#checkId").val("");
				return;
			} 
		},error: function(){
			alert("ID중복체크 실패");
			return;
		}
	});
}

//사용자가입
function signUp(){
	var that = this;
	//$('#userForm').attr('action','/cmm/signUp.do').submit();
	
	if($.trim($("#userId").val())==""){
		alert("아이디를 입력해주세요");
		$("#userId").focus();
		return;
	}
	if(    $.isUserID($.trim($("#userId").val())) ==false ){
		alert("아이디는 5~12자의 영문소문자, 숫자만 가능합니다.");
		$("#userid").focus();
		return;
	}	
	if($.trim($("#checkId").val())!=$.trim($("#userId").val())){
		alert("아이디 중복체크를 하십시오.");
		return;
	}
	if($.trim($("#password").val())==""){
		alert("비밀번호를 입력하십시오.");
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
	if( $("#email").val() == ""){
		alert("이메일을 입력하십시오.");
		$("#email").focus();
		return;
	} 
	
	if(confirm("등록 하시겠습니까?")){
		var URL="/cmmn/member/insertProc.do";	
	    var formData = $("#userForm").serialize();
		
	    $.ajax({
	    	type:"POST",
            async:false,
	        url:URL,
			data : formData,
			success : function(result) {  
				
				alert("신청되었습니다.");
				document.location.href = "/main/main.do";
			},
			error : function(xhr, status, error) {
				console.log(error);
				alert("요청실패(서버상태:" + status + ")"); 
			}
		});
	}
	
}

//취소
function back(){
	var that = this;
	
	if(confirm("가입을 취소 하시겠습니까?")){
		location.href = "/login.do";
	}
}