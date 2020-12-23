package kr.co.cms.cmmn.service;

import java.util.HashMap;
import java.util.List;

import kr.co.cms.security.UserVO;


public interface CmmnService {

	//로그인
	public UserVO findOne(String userId);
	//사용자추가
	public Integer insertUser(UserVO userVO);
	//사용자수정
	public Integer updateUser(HashMap<String, Object> params);
	public Integer updateUserAuth(HashMap<String, Object> params);
	//아이디중복검사
	public Integer memberIdCheck(HashMap<String, Object> params);
	//비밀번호초기화
	public void updatePwInit(UserVO userVO);
	
	//메뉴권한검사
	public List<HashMap<String, Object>> authCheck(HashMap<String, Object> params);
	
	//사용자 정보 상세내역
	public HashMap<String, Object> selectAcountView(HashMap<String, Object> params);
	//사용자 정보 수정
	public Integer updateAcount(UserVO userVO);
	//사용자 비밀번호수정
	public Integer updateAcountPw(UserVO userVO);
	
	
	//접속로그
	public void insertLoginLog(HashMap<String, Object> params);
	public void insertSystemLog(HashMap<String, Object> params);

}
