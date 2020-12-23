package kr.co.sgms.dataStatus.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import kr.co.sgms.dataStatus.service.DataStatusService;

@Service("dataStatusService")
public class DataStatusServiceImpl implements DataStatusService{
	
	@Resource(name="dataStatusMapper")
	private DataStatusMapper dataStatusMapper;

	@Override
	public List<String> selectBoxList(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return dataStatusMapper.selectBoxList(param);
	}

	@Override
	public List<HashMap<String, Object>> selectChartAndTableData(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return dataStatusMapper.selectChartAndTableData(param);
	}
	
	
}
