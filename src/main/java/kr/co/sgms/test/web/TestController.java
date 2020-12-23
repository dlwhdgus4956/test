package kr.co.sgms.test.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.co.sgms.test.service.TestService;

@Controller
@RequestMapping("/sgms")
public class TestController {
	@Resource(name = "testService")
	private TestService testService;
	
//	@RequestMapping(value = "/test/test1.do", method = RequestMethod.GET)
//	public String test1(Model model, @RequestParam HashMap<String, Object> params) {
//		model.addAttribute("params", testService.selectTest(params));
//		return "test/test1";
//	}
	
	@RequestMapping(value = "/test/test1.do")
	public String test1(){
		return "/test/test1";
	}
	
//	@RequestMapping(value = "/test/test1.do", method = RequestMethod.POST)
//	public ModelAndView getTestData(@RequestParam HashMap<String, Object> param) {
//		ModelAndView jsonView = new ModelAndView("jsonView");
//		List<HashMap<String, Object>> testData = testService.selectTest(param);
//		jsonView.addObject("result", testData);
//		return jsonView;
//	}
}
