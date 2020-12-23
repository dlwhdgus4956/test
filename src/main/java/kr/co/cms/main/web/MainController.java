package kr.co.cms.main.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.cms.cmmn.service.impl.CmmnServiceImpl;


@Controller
public class MainController {
	
	///logger
	private static final Logger LOGGER = LoggerFactory.getLogger(CmmnServiceImpl.class);
	
	/////////////////////////////////////////////
	/// @fn mainPage
	/// @brief 함수 간략한 설명 : 
	/// @remark
	/// - 함수의 상세 설명 : 메인화면
	/// @param request
	/// @param response
	/// @param model
	/// @return
	/// @throws Exception 
	///
	///~~~~~~~~~~~~~{.java}
	/// // 핵심코드
	///~~~~~~~~~~~~~
	/////////////////////////////////////////////
	@RequestMapping(value = "/main/main.do")
	public String mainPage(HttpServletRequest request, HttpServletResponse response, ModelMap model, Authentication authentication) throws Exception{
		
		return "cms/main/main";
	}

}
