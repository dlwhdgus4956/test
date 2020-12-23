package kr.co.sgms.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("sgmsAdminMapper")
public interface SgmsAdminMapper {
	//기업리스트 조회
	public List<HashMap<String, Object>> selectDeptList(HashMap<String, Object> params);
	//addManagerCode
	public int insertManagerCode(HashMap<String, Object> params);
	//updateManagerCode
	public int updateManagerCode(HashMap<String, Object> params);
	//deleteManagerCode
	public int deleteManagerCode(HashMap<String, Object> params);
	//siteCount
	public List<HashMap<String, Object>> siteCount();
}
