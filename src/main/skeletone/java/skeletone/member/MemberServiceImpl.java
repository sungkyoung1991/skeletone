package skeletone.member;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("memberService")
public class MemberServiceImpl implements MemberService{

	@Resource(name="memberDAO")
	private MemberDAO memberDAO;
	
	@Override
	public MemberVO getUserInfo(MemberVO vo) {
		// TODO Auto-generated method stub
		return memberDAO.getUserInfo(vo);
	}

}
