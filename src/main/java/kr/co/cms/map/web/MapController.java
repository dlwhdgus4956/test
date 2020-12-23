package kr.co.cms.map.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egovframework.example.cmmn.EgovSampleOthersExcepHndlr;

@Controller
public class MapController {

	
	/// logger
	final Logger logger = LoggerFactory.getLogger(EgovSampleOthersExcepHndlr.class);
		
	//map view
	@RequestMapping(value="/map/map.do")
	public ModelAndView mainMap(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> hashMap)throws Exception{
		
		Map<String, Object > parameterMap = new HashMap<>();
		
		String pSCEN_NO= request.getParameter("pSCEN_NO");
		String pSCEN_SE_CODE= request.getParameter("pSCEN_SE_CODE");
		
		parameterMap.put("pSCEN_NO",pSCEN_NO);
		parameterMap.put("pSCEN_SE_CODE",pSCEN_SE_CODE);
		
		String resultURL = "/cms/map/map";
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("parameterMap", parameterMap);
		mv.setViewName(resultURL);
		
		return mv;
	}
	
}
