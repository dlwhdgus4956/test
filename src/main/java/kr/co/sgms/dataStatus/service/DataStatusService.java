package kr.co.sgms.dataStatus.service;

import java.util.HashMap;
import java.util.List;

public interface DataStatusService {

	//selectBoxList 가지고오기
	public List<String> selectBoxList(HashMap<String, Object> param);
	
	//관정 데이터 
	public List<HashMap<String, Object>> selectChartAndTableData(HashMap<String, Object> param);
}
