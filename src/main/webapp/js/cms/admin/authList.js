$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//authListObj.create();
});

var authListObj = {
		
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

function authMenu(auth){

	document.location.href = "/admin/authMenu/list.do?auth="+auth;
}

function dataInsert() {
	
	var URL="/admin/auth/insertProc.do";	
	
	var authorities = $("#iauthorities").val();
	var authNm = $("#iauthNm").val();
	var rem =  $("#irem").val();
	
	
	$.ajax({
        type:"POST",
        async:false,
        dataType :"json" ,
        enctype: "multipart/form-data",
        url:URL,
		data : {
			authorities : authorities,
			authNm : authNm,
			rem : rem
		},
		success : function(result) {
			
			alert("등록되었습니다");
			document.location.href = "/admin/auth/list.do";
			
		},
		error : function(xhr, status, error) {
			console.log(error);
			alert("요청실패(서버상태:" + status + ")");
		}
	}); 
}

function dataUpdate(authorities,authNm,rem) {
	
	var URL="/admin/auth/updateProc.do";	
	
	
	var authorities = $("#"+authorities).val();
	var authNm = $("#"+authNm).val();
	var rem = $("#"+rem).val();
	
	
	$.ajax({
        type:"POST",
        async:false,
        dataType :"json" ,
        enctype: "multipart/form-data",
        url:URL,
		data : {
			authorities : authorities,
			authNm : authNm,
			rem : rem
		},
		success : function(result) {
			
			alert("등록되었습니다");
			document.location.href = "/admin/auth/list.do";
			
		},
		error : function(xhr, status, error) {
			console.log(error);
			alert("요청실패(서버상태:" + status + ")");
		}
	}); 
}

function dataDelete(authorities) {
	
	var URL="/admin/auth/deleteProc.do";	
	
	var result = confirm("해당 메뉴정보를 삭제하시겠습니까?");
	if(result){
		$.ajax({
	        type:"POST",
	        async:false,
	        dataType :"json" ,
	        enctype: "multipart/form-data",
	        url:URL,
			data : {
				authorities : authorities
			},
			success : function(result) {
				
				alert("삭제되었습니다");
				document.location.href = "/admin/auth/list.do";	
				//location.href=("<c:url value='/dataMng/dataUpdateList.do'/>?authcgg="+encodeURI(encodeURIComponent(auth)));
				
			},
			error : function(xhr, status, error) {
				console.log(error);
				alert("요청실패(서버상태:" + status + ")");
			}
		}); 
	}
} 