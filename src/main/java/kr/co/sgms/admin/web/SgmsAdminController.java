package kr.co.sgms.admin.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.cms.admin.service.AdminService;
import kr.co.cms.security.UserVO;
import kr.co.sgms.admin.service.SgmsAdminService;
import kr.co.sgms.information.service.InformationService;

@Controller
public class SgmsAdminController {
	
	@Resource(name="sgmsAdminService")
	private SgmsAdminService sgmsAdminService;
	
	@Resource(name="informationService")
	private InformationService informationService;
	
	@Resource(name="adminService")
	private AdminService adminService;
	
	//deptList 페이지 이동
	@RequestMapping(value="/admin/dept/list.do")
	public String deptPage(){
		return "/admin/deptList";
	}
	
	//사용자리스트페이지
	@RequestMapping(value = "/admin/member/list.do")
	public String mgmListPage() throws Exception {
		return "/admin/memberList";
	}
	
	@RequestMapping(value="/admin/monitoring.do")
	public String monitoring(){
		return"/admin/monitoring";
	}
	
	
	//사용자리스트
	@RequestMapping(value = "/admin/getMemberList.do")
	public ModelAndView mgmList(@RequestParam HashMap<String, Object> params){
		ModelAndView jsonView = new ModelAndView("jsonView");
		List<HashMap<String, Object>> resultList = adminService.selectMemberList(params);
		jsonView.addObject("params", params);
		jsonView.addObject("resultList", resultList);
		return jsonView;
	}
	
	
	//기업리스트 조회
	@RequestMapping(value="/admin/getDeptList.do")
	public ModelAndView getDeptListData(@RequestParam HashMap<String, Object> params, Authentication authentication){
		ModelAndView jsonView = new ModelAndView("jsonView");
		List<HashMap<String, Object>> deptList = sgmsAdminService.selectDeptList(params);
		jsonView.addObject("resultList",deptList);
		return jsonView;
	}
	//특정 기업 관정조회
	@RequestMapping(value="/admin/getSpotList.do" , method=RequestMethod.POST)
	public ModelAndView getSpotList(Authentication authentication , @RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		List<HashMap<String, Object>> list = informationService.selectSpotList(param);
		jsonView.addObject("resultList", list);
		return jsonView;
	}
	//managerCodeAdd
	@RequestMapping(value="/admin/addManager.do" , method=RequestMethod.POST)
	public ModelAndView addManagerCode(@RequestParam HashMap<String, Object> params)throws Exception{
		ModelAndView jsonView = new ModelAndView("jsonView");
		int intResult = sgmsAdminService.insertManagerCode(params);
		jsonView.addObject("intResult", intResult);
		return jsonView;
	}
	
	@RequestMapping(value="/admin/updateManager.do" , method=RequestMethod.POST)
	public ModelAndView updateManagerCode(@RequestParam HashMap<String, Object> params) throws Exception{
		ModelAndView jsonView = new ModelAndView("jsonView");
		int intResult = sgmsAdminService.updateManagerCode(params);
		jsonView.addObject("intResult", intResult);
		return jsonView;
	}
	@RequestMapping(value="/admin/deleteManager.do" , method=RequestMethod.POST)
	public ModelAndView deleteManagerCode(@RequestParam HashMap<String, Object> params) throws Exception{
		ModelAndView jsonView = new ModelAndView("jsonView");
		int intResult = sgmsAdminService.deleteManagerCode(params);
		jsonView.addObject("intResult", intResult);
		return jsonView;
	}
	@RequestMapping(value="/admin/getSiteCountData.do" , method=RequestMethod.POST)
	public ModelAndView siteCountData(){
		ModelAndView jsonView = new ModelAndView("jsonView");
		List<HashMap<String, Object>> siteCount = sgmsAdminService.siteCount();
		jsonView.addObject("resultList", siteCount);
		return jsonView;
	}
}
