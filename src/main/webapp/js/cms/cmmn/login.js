$(function(){
	
	//loginObj.create();
});

var loginObj = {
		
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

/**
 * 엔터처리
 * @returns
 */
function enterkey(){
	
	if(window.event.keyCode == 13){
		login();
	}
}


/**
 *  로그인
 */
function login(){
	var that = this;
	
	$('#loginForm').submit();
}  

/**
 *  회원가입
 */
function signUp(){
	var that = this;	
	
	location.href = "/cmmn/member/signUpPage.do";
}