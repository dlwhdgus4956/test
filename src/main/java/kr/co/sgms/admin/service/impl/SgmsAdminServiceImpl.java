package kr.co.sgms.admin.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import kr.co.sgms.admin.service.SgmsAdminService;

@Service("sgmsAdminService")
public class SgmsAdminServiceImpl implements SgmsAdminService{
	
	@Resource(name="sgmsAdminMapper")
	private SgmsAdminMapper sgmsAdminMapper;

	@Override
	public List<HashMap<String, Object>> selectDeptList(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return sgmsAdminMapper.selectDeptList(params);
	}

	@Override
	public int insertManagerCode(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return sgmsAdminMapper.insertManagerCode(params);
	}

	@Override
	public int updateManagerCode(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return sgmsAdminMapper.updateManagerCode(params);
	}

	@Override
	public int deleteManagerCode(HashMap<String, Object> params) {
		// TODO Auto-generated method stub
		return sgmsAdminMapper.deleteManagerCode(params);
	}

	@Override
	public List<HashMap<String, Object>> siteCount() {
		// TODO Auto-generated method stub
		return sgmsAdminMapper.siteCount();
	}
}
