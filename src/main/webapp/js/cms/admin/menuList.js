$(function(){
	
	fn_setDatePicker("schFrDate");
	fn_setDatePicker("schToDate");
	
	//authMenuListObj.create();
});

var menuListObj = {
		
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




function dataInsert() {
	
	var URL="/admin/menu/insertProc.do";	
	
	var menuCode = $("#imenuCode").val();
	var menuNm = $("#imenuNm").val();
	var menuUrl =  $("#imenuUrl").val();
	var upperMenuCode =  $("#iupperMenuCode").val();
	var upperMenuCode2 =  $("#iupperMenuCode2").val();
	
	$.ajax({
        type:"POST",
        async:false,
        dataType :"json" ,
        enctype: "multipart/form-data",
        url:URL,
		data : {
			menuCode : menuCode,
			menuNm : menuNm,
			menuUrl : menuUrl,
			upperMenuCode : upperMenuCode,
			upperMenuCode2 : upperMenuCode2
		},
		success : function(result) {
			
			alert("등록되었습니다");
			document.location.href = "/admin/menu/list.do";
			
		},
		error : function(xhr, status, error) {
			console.log(error);
			alert("요청실패(서버상태:" + status + ")");
		}
	}); 
}

function dataUpdate(menuCode2,menuCode,menuNm,menuUrl,upperMenuCode,upperMenuCode2) {
	
	var URL="/admin/menu/updateProc.do";	
	
	var menuCode2 = $("#"+menuCode2).val();
	var menuCode = $("#"+menuCode).val();
	var menuNm = $("#"+menuNm).val();
	var menuUrl = $("#"+menuUrl).val();
	var upperMenuCode = $("#"+upperMenuCode).val();
	var upperMenuCode2 = $("#"+upperMenuCode2).val();
	
	
	$.ajax({
        type:"POST",
        async:false,
        dataType :"json" ,
        enctype: "multipart/form-data",
        url:URL,
		data : {
			menuCode2 : menuCode2,
			menuCode : menuCode,
			menuNm : menuNm,
			menuUrl : menuUrl,
			upperMenuCode : upperMenuCode,
			upperMenuCode2 : upperMenuCode2
		},
		success : function(result) {
			
			alert("등록되었습니다");
			document.location.href = "/admin/menu/list.do";
			
		},
		error : function(xhr, status, error) {
			console.log(error);
			alert("요청실패(서버상태:" + status + ")");
		}
	}); 
}

function dataDelete(menuCode) {
	
	var URL="/admin/menu/deleteProc.do";	
	
	var result = confirm("해당 메뉴정보를 삭제하시겠습니까?");
	if(result){
		$.ajax({
	        type:"POST",
	        async:false,
	        dataType :"json" ,
	        enctype: "multipart/form-data",
	        url:URL,
			data : {
				menuCode : menuCode
			},
			success : function(result) {
				
				alert("삭제되었습니다");
				document.location.href = "/admin/menu/list.do";	
				//location.href=("<c:url value='/dataMng/dataUpdateList.do'/>?authcgg="+encodeURI(encodeURIComponent(auth)));
				
			},
			error : function(xhr, status, error) {
				console.log(error);
				alert("요청실패(서버상태:" + status + ")");
			}
		}); 
	}
} 