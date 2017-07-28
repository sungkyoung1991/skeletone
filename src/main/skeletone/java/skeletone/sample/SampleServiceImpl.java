package skeletone.sample;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("sampleService")
public class SampleServiceImpl implements SampleService {

	@Resource(name="sampleDAO")
	private SampleDAO sampleDAO;
	
	@Override
	public Object getNow() {
		// TODO Auto-generated method stub
		return sampleDAO.getNow();
	}

	@Override
	public Object isDbAlive() {
		// TODO Auto-generated method stub
		return sampleDAO.isDbAlive();
	}

}
