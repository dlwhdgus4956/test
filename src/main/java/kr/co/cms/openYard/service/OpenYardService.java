package kr.co.cms.openYard.service;

import java.util.HashMap;
import java.util.List;

import kr.co.cms.security.UserVO;

public interface OpenYardService {
	
	//공지사항
	public List<HashMap<String, Object>> selectNoticeList(HashMap<String, Object> params);
	public int selectNoticeListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectNotice(HashMap<String, Object> params);	
	
	//자료실
	public List<HashMap<String, Object>> selectRecsroomList(HashMap<String, Object> params);
	public int selectRecsroomListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectRecsroom(HashMap<String, Object> params);
	
	//요청게시판
	public List<HashMap<String, Object>> selectReqList(HashMap<String, Object> params);
	public int selectReqListCount(HashMap<String, Object> params);
	public HashMap<String, Object> selectReq(HashMap<String, Object> params);
	public Integer insertReq(HashMap<String, Object> params);
	public Integer updateReq(HashMap<String, Object> params);
	public Integer deleteReq(long reqNo);
	public Integer deleteReqFile(long reqNo);
	

}
