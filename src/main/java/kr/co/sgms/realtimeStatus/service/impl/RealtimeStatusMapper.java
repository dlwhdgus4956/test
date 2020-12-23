package kr.co.sgms.realtimeStatus.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("realtimeStatusMapper")
public interface RealtimeStatusMapper {
	
	//realDataList
	public List<HashMap<String, Object>> selectRealDataList(HashMap<String, Object> param);
}
