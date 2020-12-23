var fileObj = {
		
		/**
		 * 업로드 파일 다운로드
		 * @param fileNo
		 * @returns
		 */
		fileDownLoad : function(fileNo){
			
			location.href=("/file/"+ fileNo + "/download.do");
		}
		
}