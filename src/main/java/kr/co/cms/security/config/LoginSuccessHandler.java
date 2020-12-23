package kr.co.cms.security.config;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import egovframework.example.cmmn.EgovSampleOthersExcepHndlr;
import kr.co.cms.cmmn.service.CmmnService;
import kr.co.cms.security.UserVO;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	///공통서비스
	@Resource(name="cmmnService")
	private CmmnService cmmnService;
	
	/// logger
	final Logger logger = LoggerFactory.getLogger(EgovSampleOthersExcepHndlr.class);
	
	private String loginidname;
    private String defaultUrl;
    
    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStratgy = new DefaultRedirectStrategy();
    
    HashMap<String, Object> params = new HashMap<>();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		
		resultRedirectStrategy(request, response, authentication);		//로그인성공시 Redirect URL
		clearAuthenticationAttributes(request);							//로그인성공 전 로그인실패 에러세션 제거
		
	}
	
	public String getLoginidname() {
        return loginidname;
    }
 
    public void setLoginidname(String loginidname) {
        this.loginidname = loginidname;
    }
 
    public String getDefaultUrl() {
        return defaultUrl;
    }
 
    public void setDefaultUrl(String defaultUrl) {
        this.defaultUrl = defaultUrl;
    }
    
    
    protected void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        
        if(savedRequest!=null) {
        	
            String targetUrl = savedRequest.getRedirectUrl();
            redirectStratgy.sendRedirect(request, response, targetUrl);
        } else {
        	
        	HashMap<String, Object> params = new HashMap<>();
        	
        	UserVO user = (UserVO) authentication.getPrincipal();
        	String getUserId = user.getUserId();
        	String getUserNm = user.getName();
        	String getIp = insertJoinUsLog(request);
        	
        	params.put("userId", getUserId);
        	params.put("userNm", getUserNm);
        	params.put("userIp", getIp);
        	
        	
        	//사이트접속기록 DB insert
        	//cmmnService.insertLoginLog(params);
        	
            redirectStratgy.sendRedirect(request, response, defaultUrl);
        }
        
    }
    
    protected void clearAuthenticationAttributes(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session==null) return;
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
    
    //접속자 ip 확인
    public String insertJoinUsLog(HttpServletRequest request){
    	
    	 String ip = request.getHeader("X-Forwarded-For");
    	 
         logger.info(">>>> X-FORWARDED-FOR : " + ip);
  
         if (ip == null) {
             ip = request.getHeader("Proxy-Client-IP");
             logger.info(">>>> Proxy-Client-IP : " + ip);
         }
         if (ip == null) {
             ip = request.getHeader("WL-Proxy-Client-IP");
             logger.info(">>>> WL-Proxy-Client-IP : " + ip);
         }
         if (ip == null) {
             ip = request.getHeader("HTTP_CLIENT_IP");
             logger.info(">>>> HTTP_CLIENT_IP : " + ip);
         }
         if (ip == null) {
             ip = request.getHeader("HTTP_X_FORWARDED_FOR");
             logger.info(">>>> HTTP_X_FORWARDED_FOR : " + ip);
         }
         if (ip == null) {
             ip = request.getRemoteAddr();
         }
         
         logger.info(">>>> Result : IP Address : "+ip);
         
         //Log.TraceLog(ip);
  
         return ip;
    	
    }

    /**
     * 
     * 로그인 성공시, 실패카운터초기화 구현안함 (DB구조 설계필요)
     * https://to-dy.tistory.com/94?category=720806
     * 
     */
    




    
}
