package kr.co.cms.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class UserVO implements UserDetails {
	
	//회원아이디
	private String userId;
	//회원비밀번호
	private String password; 
	//권한등급아이디
	private String authorities; 
	//회원이름
	private String name; 
	//회원이메일
	private String email;
	//계정활성화여부
	private boolean enabled;
	
	private Long fileNo;
	
	private String tel;
	
	private String dept;
	
	private String managedCode;
    
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
		auth.add(new SimpleGrantedAuthority(authorities));
		return auth;
	}
	@Override
	public String getUsername() {
		return userId;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public Long getFileNo() {
		return fileNo;
	}
	public void setFileNo(Long fileNo) {
		this.fileNo = fileNo;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getManagedCode() {
		return managedCode;
	}
	public void setManagedCode(String managedCode) {
		this.managedCode = managedCode;
	}
}
