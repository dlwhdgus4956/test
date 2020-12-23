package kr.co.sgms.test.service;

import java.util.HashMap;
import java.util.List;

public interface TestService {
	public List<HashMap<String, Object>> selectTest(HashMap<String, Object> params);
}
