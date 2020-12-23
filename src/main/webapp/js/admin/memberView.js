$(function(){
	memberViewObj.create();
})
memberViewObj={
	
	create: function(){
		var that = this;
		
		that.init();
		that.bind();
	},
	
	init : function(){
		var that = this;
	},
	
	bind : function(){
		var that = this;
		
	}
	
}
function submitBtn(){
	$.ajax({
		url : "/admin/member/updateProc.do",			
		type : "POST",
		data : $("#updateMember").serialize(),
		dataType : "json",
		success : function(result) {
			if(result.result == 1){
				alert("수정완료")
				location.href="/admin/member/list.do"
			}else{
				alert("서버 ERROR")
			}
		}
	})
}