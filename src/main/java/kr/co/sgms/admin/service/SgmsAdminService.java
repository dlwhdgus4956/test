package kr.co.sgms.admin.service;

import java.util.HashMap;
import java.util.List;

public interface SgmsAdminService {
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
