package kr.co.cms.upload.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;



import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.exception.FdlException;
import kr.co.cms.upload.FileInfoVO;

/////////////////////////////////////////////
/// @class fileService
/// kr.co.djgwis.upload.service \n
///   ㄴ fileService.java
/// @section 클래스작성정보
///    |    항  목       |      내  용       |
///    | :-------------: | -------------   |
///    | Company | (주)SodaSys |    
///    | Author | "jdAhn" |
///    | Date | 2019. 7. 17. 오후 3:04:53 |
///    | Class Version | v1.0 |
///    | 작업자 | "jdAhn", Others... |
/// @section 상세설명
/// - 이 클래스는 파일서비스 입니다.
///   -# 
/////////////////////////////////////////////
public interface FileService {

	/////////////////////////////////////////////
	/// @fn selectOneFile
	/// @brief 함수 간략한 설명 : 
	/// @remark
	/// - 함수의 상세 설명 : 파일 단건 조회
	/// @param fileNo
	/// @return 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	public FileInfoVO selectOneFile(Long fileNo);
	
	/////////////////////////////////////////////
	/// @fn addFile
	/// @brief 함수 간략한 설명 : 파일 등록
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param multipartFile
	/// @param nextSeq
	/// @param fileType
	/// @return
	/// @throws FdlException
	/// @throws IOException 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	public FileInfoVO addFile(HttpServletRequest request, MultipartFile multipartFile, Long nextSeq, String fileType) throws FdlException, IOException;
	
	/////////////////////////////////////////////
	/// @fn removeFile
	/// @brief 함수 간략한 설명 : 파일 삭제
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param fileNo
	/// @return 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	//public Integer removeFile(Long fileNo);
	
}
