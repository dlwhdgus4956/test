package kr.co.cms.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("adminMapper")
public interface AdminMapper {
	
	//관리자 - 사용자관리
	List<HashMap<String, Object>> selectMemberList(HashMap<String, Object> params) ;
	int selectMemberListCount(HashMap<String, Object> params);
	int memberIdCheck(HashMap<String, Object> params);
	Integer deleteUser(String userId);
	void deleteUserAuth(String userId);
	
	//관리자 - 공지사항
	List<HashMap<String, Object>> selectNoticeList(HashMap<String, Object> params) ;
	int selectNoticeListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectNotice(HashMap<String, Object> params) ;
	public Integer insertNotice(HashMap<String, Object> params);
	public Integer updateNotice(HashMap<String, Object> params);
	public Integer deleteNotice(long noticeNo);
	public Integer deleteNoticeFile(long noticeNo);
	
	//관리자 - 권한리스트
	List<HashMap<String, Object>> selectAuthList(HashMap<String, Object> params) ;
	public Integer insertAuth(HashMap<String, Object> params);
	public Integer updateAuth(HashMap<String, Object> params);
	public Integer deleteAuth(HashMap<String, Object> params);
	
	//권한메뉴관리
	List<HashMap<String, Object>> selectAuthMenuList(HashMap<String, Object> params);
	int menuInsertProc(HashMap<String, Object> params);
	int menuDeleteProc(HashMap<String, Object> params);
	List<HashMap<String, Object>> selectMenuGroupList(HashMap<String, Object> params);
	int menuAllDeleteProc(HashMap<String, Object> params);
	
	//관리자 - 로그
	List<HashMap<String, Object>> selectLogSttusList(HashMap<String, Object> params) ;
	int selectLogSttusListCount(HashMap<String, Object> params);
	
	//로그통계
	List<HashMap<String, Object>> selectSysYearList(HashMap<String, Object> params) ;
	List<HashMap<String, Object>> selectSysYearStat(HashMap<String, Object> params) ;
	List<HashMap<String, Object>> selectSysMonStat(HashMap<String, Object> params) ;
	List<HashMap<String, Object>> selectSysDayStat(HashMap<String, Object> params) ;
	
	//관리자 - 자료실
	List<HashMap<String, Object>> selectRecsroomList(HashMap<String, Object> params) ;
	int selectRecsroomListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectRecsroom(HashMap<String, Object> params) ;
	public Integer insertRecsroom(HashMap<String, Object> params);
	public Integer updateRecsroom(HashMap<String, Object> params);
	public Integer deleteRecsroom(long recsroomNo);
	public Integer deleteRecsroomFile(long recsroomNo);
	
	//관리자 - 요청게시판
	List<HashMap<String, Object>> selectReqList(HashMap<String, Object> params) ;
	int selectReqListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectReq(HashMap<String, Object> params) ;
	public Integer insertReq(HashMap<String, Object> params);
	public Integer updateReq(HashMap<String, Object> params);
	public Integer deleteReq(long reqNo);
	public Integer deleteReqFile(long reqNo);
	
	//관리자 - 메뉴리스트
	List<HashMap<String, Object>> selectMenuList(HashMap<String, Object> params) ;
	public Integer insertMenu(HashMap<String, Object> params);
	public Integer updateMenu(HashMap<String, Object> params);
	public Integer updateMenu2(HashMap<String, Object> params);
	public Integer deleteMenu(String menuCode);
	public Integer deleteMenu2(String menuCode);

}
