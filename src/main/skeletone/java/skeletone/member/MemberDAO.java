package skeletone.member;

import org.springframework.stereotype.Repository;

import common.dao.AbstractDAO;

@Repository("memberDAO")
public class MemberDAO extends AbstractDAO{
	private final String NAMESPACE="skeletone.MemberMapper.";
	
	MemberVO getUserInfo(MemberVO memberVO){
		return (MemberVO) selectOne(NAMESPACE+"getUserInfo",memberVO);
	}
	
}
