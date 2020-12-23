package kr.co.cms.admin.service;

import java.util.HashMap;
import java.util.List;

public interface AdminService {
	//사용자관리
	public List<HashMap<String, Object>> selectMemberList(HashMap<String, Object> params);
	public int selectMemberListCount(HashMap<String, Object> params);
	public int memberIdCheck(HashMap<String, Object> params);	
	public Integer deleteUser(String userId);
	
	//공지사항
	public List<HashMap<String, Object>> selectNoticeList(HashMap<String, Object> params);
	public int selectNoticeListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectNotice(HashMap<String, Object> params);
	public Integer insertNotice(HashMap<String, Object> params);
	public Integer updateNotice(HashMap<String, Object> params);
	public Integer deleteNotice(long noticeNo);
	public Integer deleteNoticeFile(long noticeNo);
	
	//권한관리
	public List<HashMap<String, Object>> selectAuthList(HashMap<String, Object> params);
	public Integer insertAuth(HashMap<String, Object> params);
	public Integer updateAuth(HashMap<String, Object> params);
	public Integer deleteAuth(HashMap<String, Object> params);
	
	//권한메뉴
	public List<HashMap<String, Object>> selectAuthMenuList(HashMap<String, Object> params);
	public int menuInsertProc(HashMap<String, Object> params);
	public int menuDeleteProc(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectMenuGroupList(HashMap<String, Object> params);
	public int menuAllDeleteProc(HashMap<String, Object> params);
	
	//자료실
	public List<HashMap<String, Object>> selectRecsroomList(HashMap<String, Object> params);
	public int selectRecsroomListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectRecsroom(HashMap<String, Object> params);
	public Integer insertRecsroom(HashMap<String, Object> params);
	public Integer updateRecsroom(HashMap<String, Object> params);
	public Integer deleteRecsroom(long recsroomNo);
	public Integer deleteRecsroomFile(long recsroomNo);
	
	//요청게시판
	public List<HashMap<String, Object>> selectReqList(HashMap<String, Object> params);
	public int selectReqListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectReq(HashMap<String, Object> params);
	public Integer insertReq(HashMap<String, Object> params);
	public Integer updateReq(HashMap<String, Object> params);
	public Integer deleteReq(long reqNo);
	public Integer deleteReqFile(long reqNo);	
	
	//메뉴리스트
	public List<HashMap<String, Object>> selectMenuList(HashMap<String, Object> params);
	public Integer insertMenu(HashMap<String, Object> params);
	public Integer updateMenu(HashMap<String, Object> params);
	public Integer deleteMenu(String menuCode);
	
	//로그 현황
	public List<HashMap<String, Object>> selectLogSttusList(HashMap<String, Object> params);
	public int selectLogSttusListCount(HashMap<String, Object> params);
	
	public List<HashMap<String, Object>> selectSysYearList(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectSysYearStat(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectSysMonStat(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectSysDayStat(HashMap<String, Object> params);
	
}
