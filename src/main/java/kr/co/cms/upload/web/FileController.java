package kr.co.cms.upload.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.example.cmmn.EgovSampleOthersExcepHndlr;
import kr.co.cms.upload.FileInfoVO;
import kr.co.cms.upload.service.FileService;

/////////////////////////////////////////////
/// @class fileController
/// kr.co.djgwis.upload.web \n
///   ㄴ fileController.java
/// @section 클래스작성정보
///    |    항  목       |      내  용       |
///    | :-------------: | -------------   |
///    | Company | (주)SodaSys |    
///    | Author | "jdAhn" |
///    | Date | 2019. 7. 17. 오후 3:00:40 |
///    | Class Version | v1.0 |
///    | 작업자 | "jdAhn", Others... |
/// @section 상세설명
/// - 이 클래스는 파일컨트롤러 클래스입니다.
///   -# 
/////////////////////////////////////////////
@Controller
@RequestMapping("/file/")
public class FileController {
	
	/// 파일서비스
	@Resource
	FileService fileService;

	/// logger
	final Logger logger = LoggerFactory.getLogger(EgovSampleOthersExcepHndlr.class);

	/////////////////////////////////////////////
	/// @fn downLoad
	/// @brief 함수 간략한 설명 : 파일 다운로드
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param fileNo
	/// @param request
	/// @param response
	/// @param userAgent
	/// @throws Exception 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	@RequestMapping(value="{fileNo}/download.do")
	public void downLoad(@PathVariable("fileNo") Long fileNo, HttpServletRequest request, HttpServletResponse response,  @RequestHeader(value="User-Agent") String userAgent) throws IOException {
		
		FileInfoVO fileInfo = fileService.selectOneFile(fileNo);
		
		InputStream is = new FileInputStream(fileInfo.getFileStrePath()+fileInfo.getFileOrgNm());
		OutputStream os = response.getOutputStream();
		try{
			String fileName = fileInfo.getFileOrgNm();
			String docName = null;
			
			if(StringUtils.contains(userAgent, "MSIE") || StringUtils.contains(userAgent, "rv:11.0") || StringUtils.contains(userAgent, "Chrome")) {
				docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20")+";";
			}
			else {
				docName = "\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"";
			}
			response.setHeader("Content-Disposition", "attachment; filename="+docName);
			
			IOUtils.copy(is,  os);
		} catch (IOException e) {
			logger.error("FILE-ERROR:파일 에러");
		} finally {
			is.close();
			os.close();
		}
		
	}
	
	/////////////////////////////////////////////
	/// @fn ImageView
	/// @brief 함수 간략한 설명 : 
	/// @remark
	/// - 함수의 상세 설명 : 썸네일
	/// @param fileNo
	/// @param request
	/// @param response
	/// @param userAgent
	/// @throws IOException 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	@RequestMapping(value="{fileNo}/imageView.do")
	public void ImageView(@PathVariable("fileNo") Long fileNo, HttpServletRequest request, HttpServletResponse response, @RequestHeader(value="User-Agent") String userAgent) throws IOException{

		FileInfoVO fileInfo = fileService.selectOneFile(fileNo);
		
		InputStream is = new FileInputStream(fileInfo.getFileStrePath()+fileInfo.getFileStreNm());
		OutputStream os = response.getOutputStream();
		try{
			String fileName = fileInfo.getFileOrgNm();
			String docName = null;
			
			if(StringUtils.contains(userAgent, "MSIE") || StringUtils.contains(userAgent, "rv:11.0") || StringUtils.contains(userAgent, "Chrome")) {
				docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20")+";";
			}
			else {
				docName = "\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"";
			}
			response.setHeader("Content-Disposition", "attachment; filename="+docName);
			
			IOUtils.copy(is, os);
			
		} catch (IOException e) {
			logger.error("FILE-ERROR:파일 에러");
		} finally {
			is.close();
			os.close();
		}
		
	}
	
}
