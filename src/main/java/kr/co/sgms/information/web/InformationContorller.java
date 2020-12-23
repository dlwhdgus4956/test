package kr.co.sgms.information.web;

import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.cms.security.UserVO;
import kr.co.sgms.information.service.InformationService;

@Controller
@RequestMapping("/sgms")
public class InformationContorller {
	
	@Resource(name="informationService")
	private InformationService informationService;
	
	@RequestMapping(value = "/information/location.do")
	public String location(){
		return "information/location";
	}
	
	@RequestMapping(value = "/information/spot.do")
	public String spot(){
		return "information/spot";
	}
	
	@RequestMapping(value ="/information/spotView.do")
	public String getSpotView(String siteCode , Model model){
		HashMap<String , Object> spot = informationService.selectSpotDetail(siteCode);
		model.addAttribute("result", spot);
		return "information/spotView";
	}
	
	@RequestMapping(value = "/information/device.do")
	public String device(ModelMap model){
		return "information/device";
	}
	
	@RequestMapping(value = "/information/deviceView.do")
	public String getDeviceView(ModelMap model ,String siteCode){
		HashMap<String, Object> site = informationService.selectDeviceSite(siteCode);
		HashMap<String, Object> rtu = informationService.selectDeviceRtu(siteCode);
		List<HashMap<String, Object>> sensorList = informationService.selectDeviceSensor(siteCode);
		HashMap<String, Object> modem = informationService.selectDeviceModem(siteCode);
		model.addAttribute("site", site);
		model.addAttribute("rtu", rtu);
		model.addAttribute("sensorList", sensorList);
		model.addAttribute("modem", modem);
		return "information/deviceView";
	}
	
	@RequestMapping(value="/getPoint.do" , method=RequestMethod.POST)
	public ModelAndView getPoint(Authentication authentication){
		ModelAndView jsonView = new ModelAndView("jsonView");
		HashMap<String, Object> param = new HashMap<String , Object>();
		UserVO user = (UserVO)authentication.getPrincipal();
		param.put("managerCode", user.getManagedCode());
		List<HashMap<String, Object>> point = informationService.selectPoint(param);
		jsonView.addObject("result", point);//resultList 변경
		return jsonView;
	}
	
	@RequestMapping(value="/getLocationList.do" , method=RequestMethod.POST)
	public ModelAndView getLocationList(Authentication authentication , @RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		UserVO user = (UserVO)authentication.getPrincipal();
		param.put("managerCode", user.getManagedCode());
		List<HashMap<String, Object>> list = informationService.selectLocationList(param);
		jsonView.addObject("result", list);
		jsonView.addObject("searchKeyword", param.get("searchKeyword"));
		return jsonView;
	}
	
	@RequestMapping(value="/getSpotList.do" , method=RequestMethod.POST)
	public ModelAndView getSpotList(Authentication authentication , @RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		UserVO user = (UserVO)authentication.getPrincipal();
		param.put("managerCode", user.getManagedCode());
		List<HashMap<String, Object>> list = informationService.selectSpotList(param);
		jsonView.addObject("result", list);
		jsonView.addObject("searchKeyword", param.get("searchKeyword"));
		return jsonView;
	}
	

	
}
