package skeletone.member;

import java.io.Serializable;

public class MemberVO implements Serializable{
	
	//private String id;
	private String id;
	private String passwd;
	private String email;
	private String name;
	private String age;
	private String sex;
	private String addr;
	//..other properties 
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getPasswd() {
		return passwd;
	}


	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAge() {
		return age;
	}


	public void setAge(String age) {
		this.age = age;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public String getAddr() {
		return addr;
	}


	public void setAddr(String addr) {
		this.addr = addr;
	}


	@Override
	public String toString() {
		return "MemberVO [id=" + id + ", passwd=" + passwd + ", email=" + email + ", name=" + name + ", age=" + age
				+ ", sex=" + sex + ", addr=" + addr + "]";
	}
}
