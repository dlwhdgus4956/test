package kr.co.sgms.test.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.co.sgms.test.service.TestService;

@Service("testService")
public class TestServiceImpl implements TestService {
	
	@Resource(name = "testMapper")
	private TestMapper testMapper;

	@Override
	public List<HashMap<String, Object>> selectTest(HashMap<String, Object> params) {
		System.out.println("dddddddddddddddddddddd");
		// TODO Auto-generated method stub
		return testMapper.selectTest(params);
	}
}
