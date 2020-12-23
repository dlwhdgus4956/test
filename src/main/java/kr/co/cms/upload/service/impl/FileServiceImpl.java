package kr.co.cms.upload.service.impl;

import java.io.File;
import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import kr.co.cms.upload.FileInfoVO;
import kr.co.cms.upload.service.FileService;

/////////////////////////////////////////////
/// @class fileServiceImpl
/// kr.co.djgwis.upload.service.impl \n
///   ㄴ fileServiceImpl.java
/// @section 클래스작성정보
///    |    항  목       |      내  용       |
///    | :-------------: | -------------   |
///    | Company | (주)SodaSys |    
///    | Author | "jdAhn" |
///    | Date | 2019. 7. 17. 오후 3:04:29 |
///    | Class Version | v1.0 |
///    | 작업자 | "jdAhn", Others... |
/// @section 상세설명
/// - 이 클래스는 
///   -# 
/////////////////////////////////////////////
@Service("fileService")
public class FileServiceImpl extends EgovAbstractServiceImpl implements FileService {

	/// 파일맵퍼
	@Resource
	FileMapper fileMapper;
	
	/// 메세지 소스
	@Resource
    private MessageSource messageSource;
	
	@Resource(name = "fileProperties")
	protected EgovPropertyService fileProperties;
	
	/** ID Generation */
	@Resource(name = "fileNoGnrService")
	private EgovIdGnrService fileNoGnrService;
	
	///properties 설정
	// 작업중
	
	@Override
	public FileInfoVO selectOneFile(Long fileNo) {
		return fileMapper.selectOne(fileNo);
	}
	
	/////////////////////////////////////////////
	/// @fn 
	/// @brief (Override method) 함수 간략한 설명
	/// @remark
	/// - 오버라이드 함수의 상세 설명
	/// @see kr.co.djgwis.upload.service.FileService#addFile(org.springframework.web.multipart.MultipartFile, java.lang.Long, java.lang.String)
	/////////////////////////////////////////////
	@Override
	public FileInfoVO addFile(HttpServletRequest request, MultipartFile multipartFile, Long nextSeq, String fileType) throws FdlException, IOException {
		
		String globalFilePath = fileProperties.getString("Globals.file.path");

		Long fileNo = nextSeq;
		String fileOrgNm = multipartFile.getOriginalFilename();
		String fileStrePath = globalFilePath + File.separator;
		String fileExtsn = FilenameUtils.getExtension(fileOrgNm);
		String fileStreNm = fileType + "_" + fileNo + FilenameUtils.EXTENSION_SEPARATOR_STR + fileExtsn;
		
		String filePath = fileStrePath + fileOrgNm;
		
		// 디스크에 파일 저장
		FileUtils.forceMkdir(new File(fileStrePath));
		File file = storeFile(multipartFile, filePath);
		
		FileInfoVO fileInfo = new FileInfoVO();
		fileInfo.setFileNo(fileNo);
		fileInfo.setFileOrgNm(fileOrgNm);
		fileInfo.setFileStreNm(fileStreNm);
		fileInfo.setFileStrePath(fileStrePath);
		fileInfo.setFileSize(file.length());
		fileInfo.setFileType(fileType);
		fileInfo.setFileExtsn(fileExtsn);
		
		//파일정보T DB등록
		fileMapper.insert(fileInfo);
		
		return fileInfo;
	}
	
	/////////////////////////////////////////////
	/// @fn storeFile
	/// @brief 함수 간략한 설명 : 디스크에 파일 저장
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param file
	/// @param toFilePath
	/// @return
	/// @throws IOException 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	private File storeFile(MultipartFile multipartFile, String filePath) throws IOException {
		File toFile = new File(filePath);
		if(toFile == null || !toFile.isFile()) {
			toFile.createNewFile();
		}
		multipartFile.transferTo(toFile);
		return toFile;
	}

	/////////////////////////////////////////////
	/// @fn 
	/// @brief (Override method) 함수 간략한 설명 : 삭제
	/// @remark
	/// - 오버라이드 함수의 상세 설명
	/// @see kr.co.djgwis.upload.service.FileService#removeFile(java.lang.Long)
	/////////////////////////////////////////////
	/*@Override
	public Integer removeFile(Long fileNo) {
		return fileMapper.delete(fileNo);
	}*/
	
}
