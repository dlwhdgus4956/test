package kr.co.cms.openYard.web;

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
import kr.co.cms.openYard.service.OpenYardService;
import kr.co.cms.security.UserVO;
import kr.co.cms.upload.service.FileService;
import net.sf.json.JSONSerializer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class OpenYardController {
	
	//열린마당
	@Resource(name="openYardService")
	private OpenYardService openYardService;
	
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
	
	
	//열린마당 1차메뉴
	@RequestMapping(value = "/openYard/all/list.do")
	public String menuTest5(HttpServletRequest request,Authentication authentication){
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		return "/cms/openYard/list";
	}
	
	//공지사항리스트
	@RequestMapping(value = "/openYard/notice/list.do")
	public String noticeList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication) throws Exception {
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
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
		
		List<HashMap<String, Object>> resultList = openYardService.selectNoticeList(params);
	
		int listCount = openYardService.selectNoticeListCount(params); //총건수
		
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
		
		return "/cms/openYard/noticeList";
	}	
	
	//공지사항 조회
	@RequestMapping(value="/openYard/notice/view.do")
	public String noticeViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication){
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
		long getNoticeNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("noticeNo"), "1"));
		params.put("noticeNo", getNoticeNo);
		
		HashMap<String, Object> result = openYardService.selectNotice(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/openYard/noticeView";
	}	
	
	//자료실리스트
	@RequestMapping(value = "/openYard/recsroom/list.do")
	public String recsroomList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication) throws Exception {
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
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
		
		List<HashMap<String, Object>> resultList = openYardService.selectRecsroomList(params);
		int listCount = openYardService.selectRecsroomListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/openYard/recsroomList";
	}	
	
	//자료실 조회
	@RequestMapping(value="/openYard/recsroom/view.do")
	public String recsroomViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication){
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
		long getRecsroomNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("recsroomNo"), "1"));
		params.put("recsroomNo", getRecsroomNo);
		
		HashMap<String, Object> result = openYardService.selectRecsroom(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/openYard/recsroomView";
	}	
	
	//요청게시판 리스트
	@RequestMapping(value = "/openYard/req/list.do")
	public String reqList( HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication) throws Exception {
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
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
		
		List<HashMap<String, Object>> resultList = openYardService.selectReqList(params);
		int listCount = openYardService.selectReqListCount(params); //총건수
		
		model.addAttribute("params", params);
		model.addAttribute("resultList", resultList);
		
		model.addAttribute("totalCount", listCount);
		
		String pagingHtml = new Paging(currentPage, listCount, pageRow).getPagingHtml().toString(); //페이징
		
		model.addAttribute("pagingHtml", pagingHtml);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("pageRow", pageRow);
		model.addAttribute("totalPage", (int) Math.ceil((double) listCount / pageRow));
		
		return "/cms/openYard/reqList";
	}	
	
	//요청게시판 등록페이지
	@RequestMapping(value="/openYard/req/insert.do")
	public String reqInsertPage(HttpServletResponse response, HttpServletRequest request, Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication){

		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
		model.addAttribute("params", params);
		
		return "/cms/openYard/reqInsert";
	}
	
	//요청게시판 등록
	@RequestMapping(value="/openYard/req/insertProc.do", method = RequestMethod.POST)
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
        
		int result = openYardService.insertReq(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	
	//요청게시판 조회
	@RequestMapping(value="/openYard/req/view.do")
	public String reqViewPage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication){
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
		long getReqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		params.put("reqNo", getReqNo);
		
		HashMap<String, Object> result = openYardService.selectReq(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/openYard/reqView";
	}
	
	//요청게시판 수정페이지
	@RequestMapping(value="/openYard/req/update.do")
	public String reqUpdatePage(HttpServletResponse response,HttpServletRequest request ,Locale locale, Model model, @RequestParam HashMap<String, Object> params,Authentication authentication){
		
		String getUrl = request.getRequestURI();
		logUrl(getUrl,request,authentication);
		
		long getReqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		params.put("reqNo", getReqNo);
		
		HashMap<String, Object> result = openYardService.selectReq(params);
		
		model.addAttribute("result", result);
		model.addAttribute("params", params);
		
		return "/cms/openYard/reqUpdate";
	}
	
	//요청게시판 수정
	@RequestMapping(value="/openYard/req/updateProc.do")
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
		
		int result = openYardService.updateReq(params);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//요청게시판 삭제 (delete아닌 업데이트 로직)
	@RequestMapping(value="/openYard/req/delete.do")
	public ModelAndView reqDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long reqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		int result = openYardService.deleteReq(reqNo);
		mv.addObject("result", result);
		
		return mv;
	}
	
	//요청게시판 파일삭제
	@RequestMapping(value="/openYard/req/deleteFile.do")
	public ModelAndView reqFileDelete(ModelMap model, HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		long reqNo = Integer.parseInt(CommonUtil.isNull(request.getParameter("reqNo"), "1"));
		int result = openYardService.deleteReqFile(reqNo);
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
