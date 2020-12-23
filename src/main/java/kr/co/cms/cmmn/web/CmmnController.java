package kr.co.cms.cmmn.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.cms.cmmn.service.CmmnService;
import kr.co.cms.cmmn.service.impl.CmmnServiceImpl;
import kr.co.cms.cmmn.util.CommonUtil;
import kr.co.cms.cmmn.util.Paging;
import kr.co.cms.security.UserVO;
import kr.co.cms.upload.service.FileService;
import net.sf.json.JSONSerializer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class CmmnController {
	
	//공통서비스
	@Resource(name="cmmnService")
	private CmmnService cmmnService;
	
	/** ID Generation */
	@Resource(name = "fileNoGnrService")
	private EgovIdGnrService fileNoGnrService;
	
	/** 파일서비스 */
	@Resource(name = "fileService")
	private FileService fileService;
	
	///logger
	private static final Logger LOGGER = LoggerFactory.getLogger(CmmnServiceImpl.class);
	
	@Autowired
	private ShaPasswordEncoder shaPasswordEncoder;
	
	
	//공통 - 회원가입페이지
	@RequestMapping(value="/cmmn/member/signUpPage.do")
	public String signUpPage() throws Exception{
		
		return "/cms/cmmn/signUp";
	}
	
	//공통 - ID값 체크
	@RequestMapping(value="/cmmn/member/idCheck.do")	
	@ResponseBody 
	public void idCheck(ModelMap model, HttpServletRequest request,HttpServletResponse response)  {
		HashMap<String, Object> params = new  HashMap<String, Object>();
		params.put("userId", CommonUtil.isNull(request.getParameter("userId"), ""));
		
	    int listCount = cmmnService.memberIdCheck(params);
	    String returnStr = "Y";
	    if(listCount > 0)
	    	returnStr = "N";
	    
	    try {
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().print(returnStr);
			response.flushBuffer();
		} catch (IOException e) {
			LOGGER.error("아이디중복체크 프로세스부분 오류로인한 예외발생");
		}
	}
	
	//공통 - 사용자등록
	@RequestMapping(value="/cmmn/member/insertProc.do", method = RequestMethod.POST)
	@ResponseBody 
	public ModelAndView insertUser2( HttpServletResponse response, HttpServletRequest request, @ModelAttribute("userVO") UserVO userVO, @RequestParam HashMap<String, Object> params, BindingResult bindingResult, Model model) throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");			
		
		String defaultRole = "ROLE_USER";
		userVO.setAuthorities(defaultRole);
		
		int result = cmmnService.insertUser(userVO);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//메뉴권한체크
	@RequestMapping(value="/cmmn/authCheck.do")
	public ModelAndView authCheck(HttpServletResponse response, HttpServletRequest request){
		
		HashMap<String, Object> params = new HashMap<>();
		ModelAndView mv = new ModelAndView("jsonView");
		
		String auth = CommonUtil.isNull(request.getParameter("auth"), "");
		String getUrl = CommonUtil.isNull(request.getParameter("getUrl"), "");
		params.put("auth", auth);
		params.put("getUrl", getUrl);

		List<HashMap<String, Object>> result = cmmnService.authCheck(params);
		System.out.println("result::::::::::::::::::::::::::::" + result);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//내계정상세내역
	@RequestMapping(value = "/cmmn/account/view.do")
	public String accountView( HttpServletRequest request , Model model, @RequestParam HashMap<String, Object> params, Authentication authentication) throws Exception {
		
		String userId = "";
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		userId = userDetails.getUsername();
		
		params.put("userId", userId);
		HashMap<String, Object> result = cmmnService.selectAcountView(params);
		
		model.addAttribute("params", params);
		model.addAttribute("result", result);
		
		return "/cms/cmmn/accountUpdate";
	}
	
	//내계정수정
	@RequestMapping(value="/cmmn/account/updateProc.do")
	public ModelAndView accountUpdate(HttpServletResponse response, HttpServletRequest request, @ModelAttribute("userVO") UserVO userVO, @RequestParam HashMap<String, Object> params, BindingResult bindingResult, Model model){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		int result = cmmnService.updateAcount(userVO);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//비밀번호수정페이지
	@RequestMapping(value = "/cmmn/account/pwView.do")
	public String accountPwView( HttpServletRequest request , Model model, @RequestParam HashMap<String, Object> params, Authentication authentication) throws Exception {
		
		String userId = "";
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		userId = userDetails.getUsername();
		
		params.put("userId", userId);
		HashMap<String, Object> result = cmmnService.selectAcountView(params);
		
		model.addAttribute("params", params);
		model.addAttribute("result", result);
		
		return "/cms/cmmn/accountPwUpdate";
	}
	
	//내계정 비밀번호 수정전 체크
	@RequestMapping(value="/cmmn/account/pwCheck.do")
	public ModelAndView accountPwCheck(@RequestParam("cpassword") String pass1, Authentication authentication,@RequestParam HashMap<String, Object> params,HttpServletRequest request){
	
		ModelAndView mv = new ModelAndView("jsonView");
		
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		String pass2 = userDetails.getPassword();
		
		String userId = CommonUtil.isNull(request.getParameter("userId"), "");
		pass1 = shaPasswordEncoder.encodePassword(pass1, userId);
		
		String returnStr = "";
		
		if(pass1.equals(pass2)){
			returnStr = "Y";
		}
		
		mv.addObject("result", returnStr);
		
		return mv;
	}
	
	//내계정 비밀번호 수정
	@RequestMapping(value="/cmmn/account/pwUpdateProc.do")
	public ModelAndView accountPwUpdate(HttpServletResponse response, HttpServletRequest request, @ModelAttribute("userVO") UserVO userVO, @RequestParam HashMap<String, Object> params, BindingResult bindingResult, Model model){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		int result = cmmnService.updateAcountPw(userVO);
		
		mv.addObject("result", result);
		
		return mv;
	}
	
	
	
	//시스템 로그찍기
	public  void logUrl(String logUrl,HttpServletRequest request ,Authentication authentication){
    	
    	HashMap<String, Object> params = new HashMap<>();
    	
    	String ip = request.getHeader("X-Forwarded-For");
   	 
 
        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null) {
            ip = request.getRemoteAddr();
        }
    	
        UserVO user = (UserVO) authentication.getPrincipal();
        
    	String getUserId = user.getUserId();
    	String getUserNm = user.getName();
    	
    	String reqUrl = logUrl;
    	//String reqUrlNm = logNm;
    	
    	params.put("userId", getUserId);
    	params.put("userNm", getUserNm);
    	params.put("userIp", ip);
    	
    	params.put("reqUrl", reqUrl);
    	//params.put("reqUrlNm", reqUrlNm);
    	
    	//사이트접속기록 DB insert
    	cmmnService.insertSystemLog(params);
    	
    }
	
}
