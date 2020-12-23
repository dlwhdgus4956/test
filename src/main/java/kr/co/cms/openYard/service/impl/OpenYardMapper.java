package kr.co.cms.openYard.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.cms.security.UserVO;

@Mapper("openYardMapper")
public interface OpenYardMapper {
	
	//사용자 - 공지사항
	List<HashMap<String, Object>> selectNoticeList(HashMap<String, Object> params) ;
	int selectNoticeListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectNotice(HashMap<String, Object> params) ;
	
	//사용자 - 자료실
	List<HashMap<String, Object>> selectRecsroomList(HashMap<String, Object> params) ;
	int selectRecsroomListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectRecsroom(HashMap<String, Object> params) ;
	
	//사용자 - 요청게시판
	List<HashMap<String, Object>> selectReqList(HashMap<String, Object> params) ;
	int selectReqListCount(HashMap<String, Object> params);
	HashMap<String, Object> selectReq(HashMap<String, Object> params) ;
	public Integer insertReq(HashMap<String, Object> params);
	public Integer updateReq(HashMap<String, Object> params);
	public Integer deleteReq(long reqNo);
	public Integer deleteReqFile(long reqNo);
	
}
