<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>login</title>
<script src='<c:url value="/resources/js/jquery.min.js"/>'></script>
<script>

	$(function(){
		$('#btnLogin').click(function(){
			$.ajax({
				type : "POST",
				url : "/member/login.do",
				data : {
					email : $('#email').val().trim(),
					passwd :$('#passwd').val().trim()
				},
				dataType : "json",
				success : function(data) {
					if(data.resultCode === 'E0001'){
						alert('아이디와 패스워드를 확인해주세요 ')
					}else{
						location.href="/skeletone/main/";
					}
					
				},
				error : function(xhr,status,error){
					alert(error);
				}
			});
		})
	})
</script>
</head>
<body>
	<div>
		email : <input type="text" name="email" id="email"><br>
		pw :<input type="password" name="passwd" id="passwd"><br>
		<button type="button" id="btnLogin">로그인</button>
	</div>
</body>
</html>