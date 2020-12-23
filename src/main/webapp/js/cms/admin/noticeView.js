$(function(){
	
	//noticeViewObj.create();
});

var noticeViewObj = {
	
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


function updatePage(noticeNo){
	
	document.location.href = "/admin/notice/update.do?noticeNo="+noticeNo;
}


function fileDownLoad(fileNo){
	
	location.href=('/file/'+ fileNo + '/download.do');
	//location.href=( fileNo + '/download.do');
}
