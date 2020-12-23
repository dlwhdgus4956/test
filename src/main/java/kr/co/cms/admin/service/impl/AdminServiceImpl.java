package kr.co.cms.admin.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.example.cmmn.EgovSampleOthersExcepHndlr;
import kr.co.cms.admin.service.AdminService;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

	/// logger
	final Logger logger = LoggerFactory.getLogger(EgovSampleOthersExcepHndlr.class);	
	
	///관리자맵퍼
	@Resource(name="adminMapper")
	public AdminMapper adminMapper;

	//사용자리스트
	@Override
   	public List<HashMap<String, Object>> selectMemberList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectMemberList(params);
   	}
	
	//사용자리스트카운트
	public int selectMemberListCount(HashMap<String, Object> params){
		return adminMapper.selectMemberListCount(params);
	}
	
	//사용자 아이디중복검사
	@Override
	public int memberIdCheck(HashMap<String, Object> params){
		return adminMapper.memberIdCheck(params);
	}
	
	//사용자 삭제
	@Override
	public Integer deleteUser(String userId) {
		
		adminMapper.deleteUserAuth(userId);
		Integer rowCount = adminMapper.deleteUser(userId);
		return rowCount;
	}
	
	
	//공지사항 리스트
	@Override
   	public List<HashMap<String, Object>> selectNoticeList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectNoticeList(params);
   	}
	
	//공지사항 리스트 카운트
	public int selectNoticeListCount(HashMap<String, Object> params){
		return adminMapper.selectNoticeListCount(params);
	}
	
	//공지사항 상세내역
	@Override
   	public HashMap<String, Object> selectNotice(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectNotice(params);
   	}
	
	//공지사항 등록
	@Override
	public Integer insertNotice(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.insertNotice(params);
		return rowCount;
	}

	//공지사항 수정
	@Override
	public Integer updateNotice(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.updateNotice(params);
		return rowCount;
	}

	//공지사항 삭제
	@Override
	public Integer deleteNotice(long noticeNo) {
		
		Integer rowCount = adminMapper.deleteNotice(noticeNo);
		return rowCount;
	}
	
	//공지사항 파일 삭제
	@Override
	public Integer deleteNoticeFile(long noticeNo) {
		
		Integer rowCount = adminMapper.deleteNoticeFile(noticeNo);
		return rowCount;
	}

	//권한리스트
	@Override
	public List<HashMap<String, Object>> selectAuthList(HashMap<String, Object> params) {
		
		return adminMapper.selectAuthList(params);
	}
	
	//권한리스트 등록
	@Override
	public Integer insertAuth(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.insertAuth(params);
		return rowCount;
	}

	//권한리스트 수정
	@Override
	public Integer updateAuth(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.updateAuth(params);
		return rowCount;
	}

	//권한리스트 삭제
	@Override
	public Integer deleteAuth(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.deleteAuth(params);
		return rowCount;
	}

	//권한별메뉴리스트
	@Override
	public List<HashMap<String, Object>> selectAuthMenuList(HashMap<String, Object> params) {
		
		return adminMapper.selectAuthMenuList(params);
	}

	//메뉴단건등록
	@Override
	public int menuInsertProc(HashMap<String, Object> params) {
		
		//등록일자 등록
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar c1 = Calendar.getInstance();
        String getDate= sdf.format(c1.getTime());
        
        params.put("regDate",getDate);
		
		return adminMapper.menuInsertProc(params);
	}

	//메뉴단건삭제
	@Override
	public int menuDeleteProc(HashMap<String, Object> params) {
		
		return adminMapper.menuDeleteProc(params);
	}

	//메뉴리스트조회
	@Override
	public List<HashMap<String, Object>> selectMenuGroupList(HashMap<String, Object> params) {
		
		return adminMapper.selectMenuGroupList(params);
	}

	//메뉴일괄삭제
	@Override
	public int menuAllDeleteProc(HashMap<String, Object> params) {
		
		return adminMapper.menuAllDeleteProc(params);
	}
	
	// 자료실
	@Override
   	public List<HashMap<String, Object>> selectRecsroomList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectRecsroomList(params);
   	}
	
	//자료실 리스트 카운트
	public int selectRecsroomListCount(HashMap<String, Object> params){
		return adminMapper.selectRecsroomListCount(params);
	}
	
	//자료실 상세내역
	@Override
   	public HashMap<String, Object> selectRecsroom(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectRecsroom(params);
   	}
	
	//자료실 등록
	@Override
	public Integer insertRecsroom(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.insertRecsroom(params);
		return rowCount;
	}

	//자료실 수정
	@Override
	public Integer updateRecsroom(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.updateRecsroom(params);
		return rowCount;
	}

	//자료실 삭제
	@Override
	public Integer deleteRecsroom(long recsroomNo) {
		
		Integer rowCount = adminMapper.deleteRecsroom(recsroomNo);
		return rowCount;
	}
	
	//자료실 파일 삭제
	@Override
	public Integer deleteRecsroomFile(long recsroomNo) {
		
		Integer rowCount = adminMapper.deleteRecsroomFile(recsroomNo);
		return rowCount;
	}
	
	// 요청게시판
	@Override
   	public List<HashMap<String, Object>> selectReqList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectReqList(params);
   	}
	
	//요청게시판 리스트 카운트
	public int selectReqListCount(HashMap<String, Object> params){
		return adminMapper.selectReqListCount(params);
	}
	
	//요청게시판 상세내역
	@Override
   	public HashMap<String, Object> selectReq(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectReq(params);
   	}
	
	//요청게시판 등록
	@Override
	public Integer insertReq(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.insertReq(params);
		return rowCount;
	}

	//요청게시판 수정
	@Override
	public Integer updateReq(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.updateReq(params);
		return rowCount;
	}

	//요청게시판 삭제
	@Override
	public Integer deleteReq(long reqNo) {
		
		Integer rowCount = adminMapper.deleteReq(reqNo);
		return rowCount;
	}
	
	//자료실 파일 삭제
	@Override
	public Integer deleteReqFile(long reqNo) {
		
		Integer rowCount = adminMapper.deleteReqFile(reqNo);
		return rowCount;
	}
	
	//메뉴리스트
	@Override
	public List<HashMap<String, Object>> selectMenuList(HashMap<String, Object> params) {
		
		return adminMapper.selectMenuList(params);
	}
	
	//메뉴리스트 등록
	@Override
	public Integer insertMenu(HashMap<String, Object> params) {
		
		Integer rowCount = adminMapper.insertMenu(params);
		return rowCount;
	}

	//메뉴리스트 수정
	@Override
	public Integer updateMenu(HashMap<String, Object> params) {
		
		adminMapper.updateMenu2(params);
		Integer rowCount = adminMapper.updateMenu(params);
		return rowCount;
	}
	
	

	//메뉴리스트 삭제
	/*@Override
	public Integer deleteMenu(long menuNo) {
		
		Integer rowCount = adminMapper.deleteMenu(menuNo);
		return rowCount;
	}*/
	@Override
	public Integer deleteMenu(String menuCode) {
		adminMapper.deleteMenu2(menuCode);
		Integer rowCount = adminMapper.deleteMenu(menuCode);
		return rowCount;
	}
	
	//로그현황 리스트
	@Override
   	public List<HashMap<String, Object>> selectLogSttusList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectLogSttusList(params);
   	}
	
	public int selectLogSttusListCount(HashMap<String, Object> params){
		return adminMapper.selectLogSttusListCount(params);
	}
	
	//시스템별로그통계
	@Override
   	public List<HashMap<String, Object>> selectSysYearList(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectSysYearList(params);
   	}
	
	@Override
   	public List<HashMap<String, Object>> selectSysYearStat(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectSysYearStat(params);
   	}
	
	@Override
   	public List<HashMap<String, Object>> selectSysMonStat(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectSysMonStat(params);
   	}
	
	@Override
   	public List<HashMap<String, Object>> selectSysDayStat(	HashMap<String, Object> params)  {
		
   		return adminMapper.selectSysDayStat(params);
   	}
	
}