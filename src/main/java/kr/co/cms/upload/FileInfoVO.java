package kr.co.cms.upload;

/////////////////////////////////////////////
/// @class FileInfoVO
/// kr.co.djgwis.upload \n
///   ㄴ FileInfoVO.java
/// @section 클래스작성정보
///    |    항  목       |      내  용       |
///    | :-------------: | -------------   |
///    | Company | (주)SodaSys |    
///    | Author | "jdAhn" |
///    | Date | 2019. 7. 17. 오후 3:53:05 |
///    | Class Version | v1.0 |
///    | 작업자 | "jdAhn", Others... |
/// @section 상세설명
/// - 이 클래스는 파일정보테이블 모델VO 클래스입니다.
///   -# 
/////////////////////////////////////////////
public class FileInfoVO {

	/// 일련번호
	private Long fileNo;
	/// 파일원본명칭
	private String fileOrgNm;
	/// 파일저장명칭
	private String fileStreNm;
	/// 파일저장경로
	private String fileStrePath;
	/// 파일사이즈
	private Long fileSize;
	/// 파일타입
	private String fileType;
	/// 파일확장자
	private String fileExtsn;
	
	
	public Long getFileNo() {
		return fileNo;
	}
	public void setFileNo(Long fileNo) {
		this.fileNo = fileNo;
	}
	public String getFileOrgNm() {
		return fileOrgNm;
	}
	public void setFileOrgNm(String fileOrgNm) {
		this.fileOrgNm = fileOrgNm;
	}
	public String getFileStreNm() {
		return fileStreNm;
	}
	public void setFileStreNm(String fileStreNm) {
		this.fileStreNm = fileStreNm;
	}
	public String getFileStrePath() {
		return fileStrePath;
	}
	public void setFileStrePath(String fileStrePath) {
		this.fileStrePath = fileStrePath;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getFileExtsn() {
		return fileExtsn;
	}
	public void setFileExtsn(String fileExtsn) {
		this.fileExtsn = fileExtsn;
	}
	
}
