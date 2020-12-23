package kr.co.sgms.dataStatus.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("dataStatusMapper")
public interface DataStatusMapper {

	//selectBoxList 가지고오기
	public List<String> selectBoxList(HashMap<String, Object> param);
	//관정 데이터 
	public List<HashMap<String, Object>> selectChartAndTableData(HashMap<String, Object> param);
}
