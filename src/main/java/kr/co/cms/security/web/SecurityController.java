package kr.co.cms.security.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {

	
	//공통 - 로그인페이지
	@RequestMapping(value="/login.do")
	public String loginPage() throws Exception{
		
		return "cms/main/main";
	}
	
	//공통 - 접근차단페이지
	@RequestMapping(value="/access_denied_page.do")
	public String accessDeniedPage(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		//세션초기화
		HttpSession session = request.getSession();
		if (session != null){
			session.invalidate();
		}
		
        return "cms/main/main";
    }
}
