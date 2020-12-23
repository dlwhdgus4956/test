package kr.co.cms.cmmn.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.cms.security.UserVO;

@Mapper("cmmnMapper")
public interface CmmnMapper {
	
	public UserVO findOne (String userId);
	public Integer insertUser(UserVO userVO);
	public void insertUserAuth(UserVO userVO);
	public Integer updateUser(HashMap<String, Object> params);
	public Integer updateUserAuth(HashMap<String, Object> params);
	//public void updateUserAuth(HashMap<String, Object> params);
	public Integer memberIdCheck(HashMap<String, Object> params);
	public void updatePwInit(UserVO userVO);

	public List<HashMap<String, Object>> selecAuthCheck(HashMap<String, Object> params);
	
	HashMap<String, Object> selectAcountView(HashMap<String, Object> params) ;
	public Integer updateAcount(UserVO userVO);
	public Integer updateAcountPw(UserVO userVO);
	
	public List<HashMap<String, Object>> selectLeftMenu(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectMenu(HashMap<String, Object> params);
	public List<HashMap<String, Object>> selectAcceptAuth(HashMap<String, Object> params);
	
	public List<HashMap<String, Object>> selectBestLeftMenu(HashMap<String, Object> params);
	
	//접속로그
	public void insertLoginLog(HashMap<String, Object> params);
	public void insertSystemLog(HashMap<String, Object> params);
	
}
