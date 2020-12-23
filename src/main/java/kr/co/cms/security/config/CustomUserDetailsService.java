package kr.co.cms.security.config;

import javax.annotation.Resource;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import kr.co.cms.cmmn.service.impl.CmmnMapper;
import kr.co.cms.security.UserVO;

public class CustomUserDetailsService implements UserDetailsService  {
	
	@Resource(name="cmmnMapper")
	private CmmnMapper cmmnMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		String userId = username;
		UserVO user = cmmnMapper.findOne(userId);
		
		if(user == null){
			throw new UsernameNotFoundException(username);
		}
		
		return user;
	}

}
