package kr.co.cms.cmmn.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.cms.cmmn.service.CmmnService;
import kr.co.cms.security.UserVO;


@Service("cmmnService")
public class CmmnServiceImpl implements CmmnService {
	
	@Resource(name="cmmnMapper")
	private CmmnMapper cmmnMapper;
	
	/*@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;*/
	
	@Autowired
	private ShaPasswordEncoder shaPasswordEncoder;
	
	
	@Override
	public UserVO findOne(String userId) {
		
		return cmmnMapper.findOne(userId);
	}
	
	@Override
	public Integer insertUser(UserVO userVO) {
		
		userVO.setPassword(shaPasswordEncoder.encodePassword(userVO.getPassword(), userVO.getUserId()));
		Integer rowCount = cmmnMapper.insertUser(userVO);
		cmmnMapper.insertUserAuth(userVO);
		return rowCount;
	}	

	@Override
	public Integer updateUser(HashMap<String, Object> params) {
		
		Integer rowCount = cmmnMapper.updateUser(params);
		return rowCount;
	}
	
	@Override
	public Integer updateUserAuth(HashMap<String, Object> params) {
		
		Integer rowCount = cmmnMapper.updateUserAuth(params);
		return rowCount;
	}
	
	@Override
	public Integer memberIdCheck(HashMap<String, Object> params){
		
		return cmmnMapper.memberIdCheck(params);
	}
	
	@Override
	public void updatePwInit(UserVO userVO) {
		
		cmmnMapper.updatePwInit(userVO);
	}
	
	@Override
	public List<HashMap<String, Object>> authCheck(HashMap<String, Object> params) {
		
		return cmmnMapper.selecAuthCheck(params);
	}
	
	@Override
   	public HashMap<String, Object> selectAcountView(HashMap<String, Object> params)  {
		
   		return cmmnMapper.selectAcountView(params);
   	}
	
	
	@Override
	public Integer updateAcount(UserVO userVO) {
		
		Integer rowCount = cmmnMapper.updateAcount(userVO);
	
		return rowCount;
	}
	
	@Override
	public Integer updateAcountPw(UserVO userVO) {
		
		userVO.setPassword(shaPasswordEncoder.encodePassword(userVO.getPassword(), userVO.getUserId()));
		Integer rowCount = cmmnMapper.updateAcountPw(userVO);
	
		return rowCount;
	}
	
	
	@Override
	public void insertLoginLog(HashMap<String, Object> params) {
		
		cmmnMapper.insertLoginLog(params);
	}
	
	@Override
	public void insertSystemLog(HashMap<String, Object> params) {
		
		cmmnMapper.insertSystemLog(params);
	}

}
