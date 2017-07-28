package skeletone.attach;

import common.util.StringUtil;

/**
 * @Class Name : AttachedFileVO.java
 * @Description : AttachedFile VO class
 * @Modification Information
 *
 * @author YDH
 * @since 2016-08-12
 * @version 1.0
 * @see
 *  Copyright (C)  All right reserved.
 */
public class AttachedFileVO {
    /** fileNo */
    private int fileNo = 0;
    
    /** phsicalDir */
    private String phsicalDir = "";
    
    /** viewFileName */
    private String viewFileName = "";
    
    /** phsicalFileName */
    private String phsicalFileName = "";

    /** useYn */
    private String useYn = "";

    /** isMain */
    private String isMain = "N";

    /** searchFileNo */
    private String searchFileNo = "";
    
    //server sub path
    private String serverSubPath;

    public int getfileNo() {
		return fileNo;
	}

	public void setfileNo(int fileNo) {
		this.fileNo = fileNo;
	}
	public void setfileNo(String fileNo) throws Exception {
		this.fileNo = StringUtil.toInt(fileNo);
	}

	public String getPhsicalDir() {
		return phsicalDir;
	}

	public void setPhsicalDir(String phsicalDir) {
		this.phsicalDir = phsicalDir;
	}

	public String getViewFileName() {
		return viewFileName;
	}

	public void setViewFileName(String viewFileName) {
		this.viewFileName = viewFileName;
	}

	public String getPhsicalFileName() {
		return phsicalFileName;
	}

	public void setPhsicalFileName(String phsicalFileName) {
		this.phsicalFileName = phsicalFileName;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getSearchFileNo() {
		return searchFileNo;
	}

	public void setSearchFileNo(String searchFileNo) {
		this.searchFileNo = searchFileNo;
	}

	public String getIsMain() {
		return isMain;
	}

	public void setIsMain(String isMain) {
		this.isMain = isMain;
	}

	@Override
	public String toString() {
		return "AttachedFileVO [fileNo=" + fileNo + ", phsicalDir="
				+ phsicalDir + ", viewFileName=" + viewFileName
				+ ", phsicalFileName=" + phsicalFileName + ", useYn=" + useYn
				+ ", isMain=" + isMain + ", searchFileNo=" + searchFileNo + "]";
	}

	
	public String getServerSubPath() {
		return serverSubPath;
	}

	public void setServerSubPath(String serverSubPath) {
		this.serverSubPath = serverSubPath;
	}
	
	
}
