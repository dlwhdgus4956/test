package kr.co.sgms.realtimeStatus.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.cms.security.UserVO;
import kr.co.sgms.realtimeStatus.service.RealtimeStatusService;

@Controller
@RequestMapping("/sgms")
public class RealtimeStatusController {
	
	@Resource(name="realtimeStatusService")
	private RealtimeStatusService realtimeStatusService;
	
	@RequestMapping(value = "/realtimeStatus/status.do")
	public String status(){
		return "realtimeStatus/status";
	}
	
	@RequestMapping(value = "/getRealtimeDataList.do" , method=RequestMethod.POST)
	public ModelAndView getRealtimeDataList(Authentication authentication ,@RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		UserVO user = (UserVO)authentication.getPrincipal();
		param.put("managerCode", user.getManagedCode());
		List<HashMap<String, Object>> realtimeDataList = realtimeStatusService.selectRealDataList(param);
		jsonView.addObject("resultList",realtimeDataList);
		return jsonView;
	}
	
	@RequestMapping(value="/test.do")
	public String test(){
		return "test";
	}
}
