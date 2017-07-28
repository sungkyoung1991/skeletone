package skeletone.attach;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import common.dao.AbstractDAO;
import common.util.StringUtil;

@Repository("attachedFileDAO")
public class AttachedFileDAO extends AbstractDAO {
	private final String NAMESPACE="skeletone.attach.attachedFileMapper.";
	
	/**
	 * 파일을 등록한다.
	 * 
	 * @param vo
	 *            - 등록할 정보가 담긴 AttachedFileVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public synchronized boolean insertAttachedFile(AttachedFileVO vo)
			throws Exception {

		return insertB(NAMESPACE+"insertAttachedFile", vo);
	}

	/**
	 * 파일 정보를 수정한다.
	 * 
	 * @param vo
	 *            - 수정할 정보가 담긴 AttachedFileVO
	 * @return void형
	 * @exception Exception
	 */
	public boolean updateAttachedFile(AttachedFileVO vo) throws Exception {
		return updateB(NAMESPACE+"updateAttachedFile", vo);
	}

	/**
	 * 파일정보를 삭제한다.
	 * 
	 * @param vo
	 *            - 삭제할 정보가 담긴 AttachedFileVO
	 * @return void형
	 * @exception Exception
	 */
	public boolean deleteAttachedFile(AttachedFileVO vo) throws Exception {
		return deleteB(NAMESPACE+"deleteAttachedFile", vo);
	}
//
//	/**
//	 * 파일정보를 삭제한다.
//	 * 
//	 * @param vo
//	 *            - 삭제할 정보가 담긴 AttachedFileVO
//	 * @return void형
//	 * @exception Exception
//	 */
//	public void deleteAttachedFile(Map<String, Object> map) throws Exception {
//		attachedFileMapper.deleteAttachedFile(map);
//	}

	/**
	 * AttachedFileVO을 1건 조회한다.
	 * 
	 * @param vo
	 *            - 조회할 정보가 담긴 AttachedFileVO
	 * @return 조회한 AttachedFileVO
	 * @exception Exception
	 */
	public AttachedFileVO getAttachedFile(AttachedFileVO vo) throws Exception {
		if (vo.getSearchFileNo() != null
				&& !StringUtil.equals(vo.getSearchFileNo(), ""))
			return (AttachedFileVO)selectOne(NAMESPACE+"getAttachedFile", vo);
		else
			return new AttachedFileVO();
	}

	/**
	 * AttachedFileVO을 여러건 조회한다.
	 * 
	 * @param vo
	 *            - 조회할 정보가 담긴 AttachedFileVO
	 * @return 조회한 AttachedFileVO List
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<?> getAttachedFileList(AttachedFileVO vo) throws Exception {
		if (vo.getSearchFileNo() != null
				&& !StringUtil.equals(vo.getSearchFileNo(), ""))
			return (List<AttachedFileVO>) selectOne(NAMESPACE+"getAttachedFileList", vo);
		else
			return new ArrayList<AttachedFileVO>();
	}
}
