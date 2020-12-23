$(function(){
	
	//noticeViewObj.create();
});

var reqViewObj = {
	
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
	
	document.location.href = "/openYard/req/list.do";
}


function updatePage(reqNo){
	
	document.location.href = "/openYard/req/update.do?reqNo="+reqNo;
}


function fileDownLoad(fileNo){
	
	location.href=('/file/'+ fileNo + '/download.do');
	//location.href=( fileNo + '/download.do');
}
