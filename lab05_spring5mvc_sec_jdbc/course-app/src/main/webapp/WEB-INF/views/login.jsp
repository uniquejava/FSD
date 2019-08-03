<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="UTF-8">
<title>FSD Course Center - Login</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
<style type="text/css">
form.form-signin {
    width: 400px;
    border: solid #eee 1px;
    margin: 0 auto;
    margin-top: 150px;
    box-sizing: content-box;
    padding: 1.5rem 3rem;
    box-shadow: 0px 0px 6px 0px #dee2e6;
}

.form-signin-heading {
    margin-bottom: 2rem;
}

</style>
</head>
<body>
	<div class="container">
		<form class="form-signin" method="post" action="${ctx }/login">
			<h2 class="form-signin-heading">Please sign in</h2>
			<c:if test="${not empty errorMessge}">
			     <div class="alert alert-danger" role="alert">${ errorMessge }</div>
			</c:if>
			<p>
				<label for="username" class="sr-only">Username</label>
				<input
					type="text" id="username" name="username" class="form-control"
					placeholder="Username" required="" autofocus="">
			</p>
			<p>
				<label for="password" class="sr-only">Password</label>
				 <input
					type="password" id="password" name="password" class="form-control"
					placeholder="Password" required="">
			</p>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			<button class="btn btn-lg btn-primary btn-block" type="submit" >Signin</button>
		</form>
	</div>
</body>
</html>