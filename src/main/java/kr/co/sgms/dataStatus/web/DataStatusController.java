package kr.co.sgms.dataStatus.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.cms.security.UserVO;
import kr.co.sgms.dataStatus.service.DataStatusService;

@Controller
@RequestMapping("/sgms")
public class DataStatusController {
	
	@Resource(name="dataStatusService")
	private DataStatusService dataStatusService;
	
	@RequestMapping(value="dataStatus/data.do")
	public String dataPage(){
		return "dataStatus/data";
	}
	@RequestMapping(value="/dataStatus/compare.do")
	public String comparePage(){
		return "dataStatus/compare";
	}
	
	@RequestMapping(value="/selectBoxList.do" , method=RequestMethod.POST)
	public ModelAndView selectBoxList(Authentication authentication , @RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		UserVO user = (UserVO)authentication.getPrincipal();
		param.put("managerCode", user.getManagedCode());
		List<String> selectBoxList = dataStatusService.selectBoxList(param);
		jsonView.addObject("resultList", selectBoxList);
		return jsonView;
	}
	
	@RequestMapping(value="/selectDataStatusChartAndTableData.do" , method=RequestMethod.POST)
	public ModelAndView selectDataStatusChartAndTableData(@RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		String sDataArr[] = ((String)param.get("sDate")).split("-");
		String eDataArr[] = ((String)param.get("eDate")).split("-");
		param.put("sDate", sDataArr[0]+sDataArr[1]+sDataArr[2]);
		param.put("eDate", eDataArr[0]+eDataArr[1]+eDataArr[2]);
		List<HashMap<String, Object>> chartAndTableData = dataStatusService.selectChartAndTableData(param);
		jsonView.addObject("result", chartAndTableData);
		return jsonView;
	}
	
	@RequestMapping(value="/selectDataStatusCompareChartData.do" , method=RequestMethod.POST)
	public ModelAndView selectDataStatusCompareChartData(@RequestParam HashMap<String, Object> param){
		ModelAndView jsonView = new ModelAndView("jsonView");
		String sDataArr[] = ((String)param.get("sDate")).split("-");
		String eDataArr[] = ((String)param.get("eDate")).split("-");
		param.put("sDate", sDataArr[0]+sDataArr[1]+sDataArr[2]);
		param.put("eDate", eDataArr[0]+eDataArr[1]+eDataArr[2]);
		param.put("siteCode", param.get("siteCodes1"));
		List<HashMap<String, Object>> chartAndTableData1 = dataStatusService.selectChartAndTableData(param);
		param.put("siteCode", param.get("siteCodes2"));
		List<HashMap<String, Object>> chartAndTableData2 = dataStatusService.selectChartAndTableData(param);
		param.put("siteCode", param.get("siteCodes3"));
		List<HashMap<String, Object>> chartAndTableData3 = dataStatusService.selectChartAndTableData(param);
		param.put("siteCode", param.get("siteCodes4"));
		List<HashMap<String, Object>> chartAndTableData4 = dataStatusService.selectChartAndTableData(param);
		jsonView.addObject("resultList1", chartAndTableData1);
		jsonView.addObject("resultList2", chartAndTableData2);
		jsonView.addObject("resultList3", chartAndTableData3);
		jsonView.addObject("resultList4", chartAndTableData4);
		return jsonView;
	}
}
