package kr.co.sgms.realtimeStatus.service;

import java.util.HashMap;
import java.util.List;

public interface RealtimeStatusService {
	
	//realDataList
	public List<HashMap<String, Object>> selectRealDataList(HashMap<String, Object> param);
}
