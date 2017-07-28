package skeletone.sample;

import org.springframework.stereotype.Repository;

import common.dao.AbstractDAO;

@Repository("sampleDAO")
public class SampleDAO extends AbstractDAO{
	private final String NAMESPACE="skeletone.SampleMapper.";
	
	public Object getNow(){
		return selectOne(NAMESPACE+"getNow");
	}
	public Object isDbAlive(){
		return selectOne(NAMESPACE+"isDbAlive");
	}
}
