package kr.co.cms.upload.service.impl;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.cms.upload.FileInfoVO;

/////////////////////////////////////////////
/// @class fileMapper
/// kr.co.djgwis.upload.service.impl \n
///   ㄴ fileMapper.java
/// @section 클래스작성정보
///    |    항  목       |      내  용       |
///    | :-------------: | -------------   |
///    | Company | (주)SodaSys |    
///    | Author | "jdAhn" |
///    | Date | 2019. 7. 17. 오후 3:03:44 |
///    | Class Version | v1.0 |
///    | 작업자 | "jdAhn", Others... |
/// @section 상세설명
/// - 이 클래스는 파일 맵퍼 클래스입니다.
///   -# 
/////////////////////////////////////////////
@Mapper("fileMapper")
public interface FileMapper {

	/////////////////////////////////////////////
	/// @fn selectOne
	/// @brief 함수 간략한 설명 : 단 건 조회
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param fileNo
	/// @return 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	public FileInfoVO selectOne(Long fileNo);

	/////////////////////////////////////////////
	/// @fn insert
	/// @brief 함수 간략한 설명 : 등록 
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param fileInfoVO
	/// @return 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	public Integer insert(FileInfoVO fileInfoVO);
	
	/////////////////////////////////////////////
	/// @fn delete
	/// @brief 함수 간략한 설명 : 삭제
	/// @remark
	/// - 함수의 상세 설명 : 
	/// @param fileNo
	/// @return 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	//public Integer delete(Long fileNo);
}
