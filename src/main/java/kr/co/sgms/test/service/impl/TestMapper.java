package kr.co.sgms.test.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("testMapper")
public interface TestMapper {
	public List<HashMap<String, Object>> selectTest(HashMap<String, Object> params);
}
