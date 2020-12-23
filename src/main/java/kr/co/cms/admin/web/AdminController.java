package kr.co.cms.admin.web;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import egovframework.example.cmmn.EgovSampleOthersExcepHndlr;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.cms.admin.service.AdminService;
import kr.co.cms.cmmn.service.CmmnService;
import kr.co.cms.cmmn.util.CommonUtil;
import kr.co.cms.cmmn.util.Paging;
import kr.co.cms.security.UserVO;
import kr.co.cms.upload.service.FileService;
import net.sf.json.JSONSerializer;

@Controller
public class AdminController {
	
	@Autowired
	private ShaPasswordEncoder shaPasswordEncoder;
	/*@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;*/
	
	@Resource(name = "fileNoGnrService")
	private EgovIdGnrService fileNoGnrService;
	
	//관리자서비스
	@Resource(name="adminService")
	private AdminService adminService;
	
	//공통서비스
	@Resource(name="cmmnService")
	private CmmnService cmmnService;
	
	//파일서비스
	@Resource(name = "fileService")
	private FileService fileService;
	
	/// logger
	final Logger logger = LoggerFactory.getLogger(EgovSampleOthersExcepHndlr.class);	

		
	//사용자등록페이지
	@RequestMapping(value = "/admin/member/insert.do")
	public String memberInsert( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		return "/cms/admin/memberInsert";
	}
	
	//ID값 체크
	@RequestMapping(value="/admin/idCheck.do")	
	@ResponseBody 
	public void idCheck(ModelMap model, HttpServletRequest request,HttpServletResponse response)  {
		HashMap<String, Object> params = new  HashMap<String, Object>();
		params.put("userId", CommonUtil.isNull(request.getParameter("userId"), ""));
		
	    int listCount = adminService.memberIdCheck(params);
	    String returnStr = "Y";
	    if(listCount > 0)
	    	returnStr = "N";
	    
	    
	    try {
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().print(returnStr);
			response.flushBuffer();
		} catch (IOException e) {
			logger.error("아이디중복체크 프로세스부분 오류로인한 예외발생");
		}
	}
	
	//사용자등록
	@RequestMapping(value="/admin/member/insertProc.do", method = RequestMethod.POST)
	public String signUp(@ModelAttribute("userVO") UserVO userVO, BindingResult bindingResult, Model model, RedirectAttributes rttr ) throws Exception {
		
		String defaultRole = "ROLE_USER";
		userVO.setAuthorities(defaultRole);
		
		cmmnService.insertUser(userVO);
		
		return "redirect:/admin/member/list.do";
	}
	
	//사용자정보 조회
	@RequestMapping(value = "/admin/member/view.do")
	public String memberView( HttpServletRequest request , Model model, @RequestParam HashMap<String, Object> params, Authentication authentication) throws Exception {
		
		String userId = CommonUtil.isNull(request.getParameter("userId"), "");
		params.put("userId", userId);
		
		HashMap<String, Object> result = cmmnService.selectAcountView(params);
		List<HashMap<String, Object>> roleObj = adminService.selectAuthList(params);
		
		model.addAttribute("params", params);
		model.addAttribute("result", result);
		model.addAttribute("roleObj", roleObj);
		
		return "/admin/memberView";
	}
	
	//사용자정보수정
	@RequestMapping(value="/admin/member/updateProc.do", method = RequestMethod.POST)
	public ModelAndView userManageUpdate(@RequestParam HashMap<String, Object> params) throws Exception{
		ModelAndView jsonView = new ModelAndView("jsonView");
		int result = cmmnService.updateUser(params);
		cmmnService.updateUserAuth(params);
		jsonView.addObject("result", result);
		return jsonView;
	}
	
	//패스워드 초기화
	@RequestMapping(value = "/admin/member/pwMember.do")
	public String pwMember( HttpServletRequest request , Model model, @RequestParam HashMap<String, Object> params, Authentication authentication) throws Exception {
		
		String userId = CommonUtil.isNull(request.getParameter("userId"), "");
		
		params.put("userId", userId);
		
		HashMap<String, Object> result = cmmnService.selectAcountView(params);
		
		model.addAttribute("params", params);
		model.addAttribute("result", result);
		model.addAttribute("userId", userId);
		
		return "/cms/admin/memberUpdate";
	}
	
	//패스워드 초기화
	@RequestMapping(value="/admin/member/pwInit.do", method = RequestMethod.POST)
	public String pwInit(@ModelAttribute("userVO") UserVO userVO, BindingResult bindingResult, Model model, RedirectAttributes rttr,HttpServletRequest request  ) throws Exception {
		
		String userId = CommonUtil.isNull(request.getParameter("userId"), "");
		userVO.setUserId(userId);
		
		//임시비밀번호
		Random rnd = new Random(System.currentTimeMillis());
		String pwTmp  = "";
		
		for(int i=0 ; i < 9 ; i++){
			int a = rnd.nextInt(9)+1;
			pwTmp += String.valueOf(a);
		}
		
		/*userVO.setPassword(bCryptPasswordEncoder.encode(pwTmp));*/
		userVO.setPassword(shaPasswordEncoder.encodePassword(pwTmp, userVO.getUserId()));
		
		cmmnService.updatePwInit(userVO);
		
		model.addAttribute("pwTmp", pwTmp);
		model.addAttribute("userId", userVO.getUserId());
	
		return "forward:/admin/member/view.do";
	}
	
	//사용자삭제
	@RequestMapping(value="/admin/member/delete.do")
	public ModelAndView memberDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		String userId = CommonUtil.isNull(request.getParameter("userId"), "");
		int result = adminService.deleteUser(userId);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//공지사항리스트
	@RequestMapping(value = "/admin/notice/list.do")
	public String noticeList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		int currentPage = Integer.parseInt(CommonUtil.isNull(request.getParameter("currentPage"), "1"));
		int pageRow = Integer.parseInt(CommonUtil.isNull(request.getParameter("pageRow"), "10"));
		
		int startNo = (currentPage - 1) * pageRow;
		int endNo = startNo + pageRow;
		
		params.put("currentPage", currentPage);
		params.put("pageRow", pageRow);
		params.put("startNo", String.valueOf(startNo));
		params.put("endNo", String.valueOf(endNo));
		params.put("startNo", startNo);
		params.put("endNo", endNo);
		
		
		String searchtype =  CommonUtil.isNull(request.getParameter("searchtype"), "");
		String searchkeyword =  CommonUtil.isNull(request.getParameter("searchkeyword"), "");
		
		params.put("searchtype",searchtype);
		params.put("searchkeyword", searchkeyword);
		
		List<HashMap<String, Object>> resultList = adminService.selectNoticeList(params);
	
		int listCount = adminService.selectNoticeListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		model.addAttribute("searchtype", searchtype);
		model.addAttribute("searchkeyword", searchkeyword);
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/admin/noticeList";
	}
	
	@RequestMapping(value="/admin/notice/insert.do")
	public String noticeInsertPage(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params){

		model.addAttribute("params", params);
		
		return "/cms/admin/noticeInsert";
	}
	
	//공지사항 등록
	@RequestMapping(value="/admin/notice/insertProc.do", method = RequestMethod.POST)
	@ResponseBody 
	public ModelAndView noticeInsert(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params, MultipartHttpServletRequest mhsr) throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		/////// 공지사항 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "NOTICE";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
        
		int result = adminService.insertNotice(params);
		mv.addObject("result", result);
		
		return mv;
	}
	

	
	//공지사항 조회
	@RequestMapping(value="/admin/notice/view.do")
	public String noticeViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getNoticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		params.put("noticeNo", getNoticeNo);
		
		HashMap<String, Object> result = adminService.selectNotice(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/noticeView";
	}
	
	//공지사항 수정페이지
	@RequestMapping(value="/admin/notice/update.do")
	public String noticeUpdatePage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getNoticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		params.put("noticeNo", getNoticeNo);
		
		HashMap<String, Object> result = adminService.selectNotice(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/noticeUpdate";
	}
	
	//공지사항 수정
	@RequestMapping(value="/admin/notice/updateProc.do")
	public ModelAndView noticeUpdate(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params ,MultipartHttpServletRequest mhsr)throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long getNoticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		params.put("noticeNo", getNoticeNo);
		
		/////// 공지사항 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "NOTICE";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
		
		int result = adminService.updateNotice(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//공지사항삭제 (delete아닌 업데이트 로직)
	@RequestMapping(value="/admin/notice/delete.do")
	public ModelAndView noticeDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long noticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		int result = adminService.deleteNotice(noticeNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//공지사항 파일삭제
	@RequestMapping(value="/admin/notice/deleteFile.do")
	public ModelAndView noticeFileDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long noticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		int result = adminService.deleteNoticeFile(noticeNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//권한 리스트
	@RequestMapping(value = "/admin/auth/list.do")
	public String authList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		List<HashMap<String, Object>> resultList = adminService.selectAuthList(params);
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		return "/cms/admin/authList";
	}
	
	//권한리스트 등록
	@RequestMapping(value="/admin/auth/insertProc.do")
	public void authInsert(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String authorities = CommonUtil.isNull(request.getParameter("authorities"), "");
		String authNm = CommonUtil.isNull(request.getParameter("authNm"), "");
		String rem = CommonUtil.isNull(request.getParameter("rem"), "");
		
		params.put("authorities", authorities);
		params.put("authNm", authNm);
		params.put("rem", rem);
		
		int result = adminService.insertAuth(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//권한리스트 수정
	@RequestMapping(value="/admin/auth/updateProc.do")
	public void authUpdate(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String authorities = CommonUtil.isNull(request.getParameter("authorities"), "");
		String authNm = CommonUtil.isNull(request.getParameter("authNm"), "");
		String rem = CommonUtil.isNull(request.getParameter("rem"), "");
		
		params.put("authorities", authorities);
		params.put("authNm", authNm);
		params.put("rem", rem);
		
		int result = adminService.updateAuth(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	
	//권한리스트 삭제
	@RequestMapping(value="/admin/auth/deleteProc.do")
	public void autheDeleteProc(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String authorities = CommonUtil.isNull(request.getParameter("authorities"), "");
		params.put("authorities", authorities);
		
		int result = adminService.deleteAuth(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}

	
	//권한별 메뉴사용여부 리스트
	@RequestMapping(value = "/admin/authMenu/list.do")
	public String authMenuList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		List<HashMap<String, Object>> resultAuthNm = adminService.selectAuthList(params);
		List<HashMap<String, Object>> resultList = adminService.selectAuthMenuList(params);
		
		model.addAttribute("params", params);
		model.addAttribute("resultAuthNm", resultAuthNm);
		model.addAttribute("resultList", resultList);
		
		return "/cms/admin/authMenuList";
	}
	
	//권한에따른 메뉴관리등록
	@RequestMapping(value="/admin/auth/menuInsertProc.do")
	public void menuManageInsertProc(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String auth = CommonUtil.isNull(request.getParameter("auth"), "");
		String menuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		params.put("auth", auth);
		params.put("menuCode", menuCode);
		
		int result = adminService.menuInsertProc(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//권한에따른 메뉴관리삭제
	@RequestMapping(value="/admin/auth/menuDeleteProc.do")
	public void menuManageDeleteProc(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String auth = CommonUtil.isNull(request.getParameter("auth"), "");
		String menuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		params.put("auth", auth);
		params.put("menuCode", menuCode);
		
		int result = adminService.menuDeleteProc(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//권한에따른 메뉴관리일괄등록
	@RequestMapping(value="/admin/auth/menuAllInsertProc.do")
	public void menuManageAllInsertProc(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
		
		
		String auth = CommonUtil.isNull(request.getParameter("auth"), "");
		String frontMenuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		params.put("auth", auth);
		params.put("frontMenuCode", frontMenuCode);
		
		int result = 0;
		List<HashMap<String, Object>> menuList = adminService.selectMenuGroupList(params);
		if(menuList != null) {
			
			for(int i=0,  iLen = menuList.size(); i<iLen; i++){
				params.put("menuCode", (String) menuList.get(i).get("menu_code"));
				result = result + adminService.menuInsertProc(params);
			}
		}
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//권한에따른 메뉴관리일괄삭제
	@RequestMapping(value="/admin/auth/menuAllDeleteProc.do")
	public void menuManageAllDeleteProc(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		HashMap<String, Object> params = new  HashMap<String, Object>();
		
		String auth = CommonUtil.isNull(request.getParameter("auth"), "");
		String frontMenuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		params.put("auth", auth);
		params.put("frontMenuCode", frontMenuCode);
		
		int result = adminService.menuAllDeleteProc(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//자료실리스트
	@RequestMapping(value = "/admin/recsroom/list.do")
	public String recsroomList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		int currentPage = Integer.parseInt(CommonUtil.isNull(request.getParameter("currentPage"), "1"));
		int pageRow = Integer.parseInt(CommonUtil.isNull(request.getParameter("pageRow"), "10"));
		
		int startNo = (currentPage - 1) * pageRow;
		int endNo = startNo + pageRow;
		
		params.put("currentPage", currentPage);
		params.put("pageRow", pageRow);
		params.put("startNo", String.valueOf(startNo));
		params.put("endNo", String.valueOf(endNo));
		params.put("startNo", startNo);
		params.put("endNo", endNo);
		
		List<HashMap<String, Object>> resultList = adminService.selectRecsroomList(params);
		int listCount = adminService.selectRecsroomListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/admin/recsroomList";
	}	
	
	//자료실 등록페이지
	@RequestMapping(value="/admin/recsroom/insert.do")
	public String recsroomInsertPage(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params){

		model.addAttribute("params", params);
		
		return "/cms/admin/recsroomInsert";
	}
	
	//자료실 등록
	@RequestMapping(value="/admin/recsroom/insertProc.do", method = RequestMethod.POST)
	@ResponseBody 
	public ModelAndView recsroomInsert(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params, MultipartHttpServletRequest mhsr) throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		/////// 자료실 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "RECSROOM";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
        
		int result = adminService.insertRecsroom(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//자료실 조회
	@RequestMapping(value="/admin/recsroom/view.do")
	public String recsroomViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getRecsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		params.put("recsroomNo", getRecsroomNo);
		
		HashMap<String, Object> result = adminService.selectRecsroom(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/recsroomView";
	}
	
	//자료실 수정페이지
	@RequestMapping(value="/admin/recsroom/update.do")
	public String recsroomUpdatePage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getRecsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		params.put("recsroomNo", getRecsroomNo);
		
		HashMap<String, Object> result = adminService.selectRecsroom(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/recsroomUpdate";
	}
	
	//자료실 수정
	@RequestMapping(value="/admin/recsroom/updateProc.do")
	public ModelAndView recsroomUpdate(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params ,MultipartHttpServletRequest mhsr)throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long getRecsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		params.put("recsroomNo", getRecsroomNo);
		
		/////// 자료실 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "RECSROOM";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
		
		int result = adminService.updateRecsroom(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//자료실 삭제 (delete아닌 업데이트 로직)
	@RequestMapping(value="/admin/recsroom/delete.do")
	public ModelAndView recsroomDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long recsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		int result = adminService.deleteRecsroom(recsroomNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//자료실 파일삭제
	@RequestMapping(value="/admin/recsroom/deleteFile.do")
	public ModelAndView recsroomFileDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long recsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		int result = adminService.deleteRecsroomFile(recsroomNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//요청게시판 리스트
	@RequestMapping(value = "/admin/req/list.do")
	public String reqList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		int currentPage = Integer.parseInt(CommonUtil.isNull(request.getParameter("currentPage"), "1"));
		int pageRow = Integer.parseInt(CommonUtil.isNull(request.getParameter("pageRow"), "10"));
		
		int startNo = (currentPage - 1) * pageRow;
		int endNo = startNo + pageRow;
		
		params.put("currentPage", currentPage);
		params.put("pageRow", pageRow);
		params.put("startNo", String.valueOf(startNo));
		params.put("endNo", String.valueOf(endNo));
		params.put("startNo", startNo);
		params.put("endNo", endNo);
		
		List<HashMap<String, Object>> resultList = adminService.selectReqList(params);
		int listCount = adminService.selectReqListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/admin/reqList";
	}	
	
	//요청게시판 등록페이지
	@RequestMapping(value="/admin/req/insert.do")
	public String reqInsertPage(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params){

		model.addAttribute("params", params);
		
		return "/cms/admin/reqInsert";
	}
	
	//요청게시판 등록
	@RequestMapping(value="/admin/req/insertProc.do", method = RequestMethod.POST)
	@ResponseBody 
	public ModelAndView reqInsert(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params, MultipartHttpServletRequest mhsr) throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		/////// 자료실 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "REQ";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
        
		int result = adminService.insertReq(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	
	//요청게시판 조회
	@RequestMapping(value="/admin/req/view.do")
	public String reqViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getReqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		params.put("reqNo", getReqNo);
		
		HashMap<String, Object> result = adminService.selectReq(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/reqView";
	}
	
	//요청게시판 수정페이지
	@RequestMapping(value="/admin/req/update.do")
	public String reqUpdatePage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		long getReqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		params.put("reqNo", getReqNo);
		
		HashMap<String, Object> result = adminService.selectReq(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/admin/reqUpdate";
	}
	
	//요청게시판 수정
	@RequestMapping(value="/admin/req/updateProc.do")
	public ModelAndView reqUpdate(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params ,MultipartHttpServletRequest mhsr)throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long getReqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		params.put("reqNo", getReqNo);
		
		/////// 자료실 파일등록 ss
		List<MultipartFile> files = mhsr.getFiles("uploadFile");
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				if(multipartFile.getBytes().length>0){
					
					String fileType = "REQ";
					Long nextSeq = fileNoGnrService.getNextLongId();
					
					params.put("fileNo", nextSeq);
					
					fileService.addFile(request, multipartFile, nextSeq, fileType);
				}
			}
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String getUserId = auth.getName();
        params.put("writer", getUserId);
		
		int result = adminService.updateReq(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//요청게시판 삭제 (delete아닌 업데이트 로직)
	@RequestMapping(value="/admin/req/delete.do")
	public ModelAndView reqDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long reqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		int result = adminService.deleteReq(reqNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//요청게시판 파일삭제
	@RequestMapping(value="/admin/req/deleteFile.do")
	public ModelAndView reqFileDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long reqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		int result = adminService.deleteReqFile(reqNo);
		mv.addObject("result", result);
		
		return mv;
	}	
	
	//메뉴 리스트
	@RequestMapping(value = "/admin/menu/list.do")
	public String menuList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		List<HashMap<String, Object>> resultList = adminService.selectMenuList(params);
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		return "/cms/admin/menuList";
	}
	
	//메뉴리스트 등록
	@RequestMapping(value="/admin/menu/insertProc.do")
	public void menuInsert(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String menuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		String menuNm = CommonUtil.isNull(request.getParameter("menuNm"), "");
		String menuUrl = CommonUtil.isNull(request.getParameter("menuUrl"), "");
		String upperMenuCode = CommonUtil.isNull(request.getParameter("upperMenuCode"), "");
		String upperMenuCode2 = CommonUtil.isNull(request.getParameter("upperMenuCode2"), "");
		
		params.put("menuCode", menuCode);
		params.put("menuNm", menuNm);
		params.put("menuUrl", menuUrl);
		params.put("upperMenuCode", upperMenuCode);
		params.put("upperMenuCode2", upperMenuCode2);
		
		int result = adminService.insertMenu(params);
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	//메뉴리스트 수정
	@RequestMapping(value="/admin/menu/updateProc.do")
	public void menuUpdate(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		HashMap<String, Object> params = new  HashMap<String, Object>();
				
		String menuCode2 = CommonUtil.isNull(request.getParameter("menuCode2"), ""); //menuCode 변경전값
		String menuCode = CommonUtil.isNull(request.getParameter("menuCode"), ""); // menuCode 변경후값
		String menuNm = CommonUtil.isNull(request.getParameter("menuNm"), "");
		String menuUrl = CommonUtil.isNull(request.getParameter("menuUrl"), "");
		String upperMenuCode = CommonUtil.isNull(request.getParameter("upperMenuCode"), "");
		String upperMenuCode2 = CommonUtil.isNull(request.getParameter("upperMenuCode2"), "");
		
		params.put("menuCode2", menuCode2);
		params.put("menuCode", menuCode);
		params.put("menuNm", menuNm);
		params.put("menuUrl", menuUrl);
		params.put("upperMenuCode", upperMenuCode);
		params.put("upperMenuCode2", upperMenuCode2);
		
		
		int result = adminService.updateMenu(params); //메뉴테이블
		
		model.addAttribute("result", result);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(JSONSerializer.toJSON(result).toString().replaceAll("<", ""));
		response.flushBuffer();
	}
	
	
	//메뉴리스트 삭제
	@RequestMapping(value="/admin/menu/deleteProc.do")
	public ModelAndView menuDeleteProc(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		String menuCode = CommonUtil.isNull(request.getParameter("menuCode"), "");
		int result = adminService.deleteMenu(menuCode);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//로그접속현황 리스트
	@RequestMapping(value = "/admin/logSttus/list.do")
	public String logSttus( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params) throws Exception {
		
		int currentPage = Integer.parseInt(CommonUtil.isNull(request.getParameter("currentPage"), "1"));
		int pageRow = Integer.parseInt(CommonUtil.isNull(request.getParameter("pageRow"), "10"));
		
		int startNo = (currentPage - 1) * pageRow;
		int endNo = startNo + pageRow;
		
		params.put("currentPage", currentPage);
		params.put("pageRow", pageRow);
		params.put("startNo", String.valueOf(startNo));
		params.put("endNo", String.valueOf(endNo));
		params.put("startNo", startNo);
		params.put("endNo", endNo);
		
		List<HashMap<String, Object>> resultList = adminService.selectLogSttusList(params);
		int listCount = adminService.selectLogSttusListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/admin/logSttusList";
	}
	
	//로그통계
	@RequestMapping(value="/admin/logStat/allList.do")
	public String logStatAllList(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params){
		
		String index = CommonUtil.isNull(request.getParameter("gubun"), "1");
		
		String yyGbn = CommonUtil.isNull(request.getParameter("yyGbn"), "");
		String mmGbn = CommonUtil.isNull(request.getParameter("mmGbn"), "");
		
		List<HashMap<String, Object>> yyList = adminService.selectSysYearList(params); //시스템로그 년도리스트
		
		if(yyGbn == null || yyGbn ==""){
			HashMap<String, Object> map = yyList.get(0);
				yyGbn = (String) map.get("year");
				params.put("yyGbn", yyGbn);
		} else {
			params.put("yyGbn", yyGbn);
		}
		
		if(mmGbn == null || mmGbn ==""){
			
			Calendar oCalendar = Calendar.getInstance( ); 
			if((oCalendar.get(Calendar.MONTH)+1<10)){
				mmGbn = "0"+String.valueOf(oCalendar.get(Calendar.MONTH)+1);
			}
			else{
				mmGbn=	String.valueOf(oCalendar.get(Calendar.MONTH)+1);
			}
				params.put("mmGbn", mmGbn);
		} else {
			params.put("mmGbn", mmGbn);
		}
		
		params.put("yymmGbn", yyGbn+mmGbn);
		

		List<HashMap<String, Object>> resultList = adminService.selectSysYearStat(params); //년도별통계
		
		List<HashMap<String, Object>> resultList2 = adminService.selectSysMonStat(params); //월별통계
		
		String schFrDate = CommonUtil.isNull(request.getParameter("schFrDate"), "");
		
		if(schFrDate == null || schFrDate == ""){

		    DecimalFormat df = new DecimalFormat("00");
		    Calendar currentCalendar = Calendar.getInstance();

		    String strYear = Integer.toString(currentCalendar.get(Calendar.YEAR));
		    String strMonth = df.format(currentCalendar.get(Calendar.MONTH)+1); //현재달
		    String strDay = df.format(currentCalendar.get(Calendar.DATE));//

			schFrDate = strYear+"-"+strMonth+"-"+strDay;

		}
		
		params.put("yymmdd", schFrDate.replace("-", ""));
		
		List<HashMap<String, Object>> resultList3 = adminService.selectSysDayStat(params); //일별통계
		
		model.addAttribute("schFrDate", schFrDate);
		
		model.addAttribute("yyGbn", yyGbn);
		model.addAttribute("mmGbn", mmGbn);
		model.addAttribute("yyList", yyList);
		
		model.addAttribute("resultList", resultList);
		model.addAttribute("resultList2", resultList2);
		model.addAttribute("resultList3", resultList3);

		model.addAttribute("params", params);
		
		model.addAttribute("index", index);
		
		return "/cms/admin/allStatList";
	}	
}
