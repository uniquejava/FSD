<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="UTF-8">
<title>FSD Course Center - Login</title>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"
  integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E"
  crossorigin="anonymous"
/>
<link rel="stylesheet" href="${ctx }/assets/css/signin.css" />
<script type="text/javascript">
  function changeCaptcha(ctx){
	  $(".captcha-image").attr("src", ctx + "/captcha_image?ts=" + Date.now());
  }
</script>
</head>
<body class="login-page">
	<div class="container">
		<form class="form-signin" method="post" action="${ctx }/login">
		    <h2 class="form-signin-heading">FSD Course Center</h2>
			<c:if test="${not empty errorMessge}">
			     <div class="alert alert-danger" role="alert">${ errorMessge }</div>
			</c:if>
			<p>
				<label for="username" class="sr-only">Username</label>
				<input
					type="text" id="username" name="username" class="form-control"
					placeholder="Username" required="" autofocus="" autocomplete="off">
			</p>
			<p>
				<label for="password" class="sr-only">Password</label>
				 <input
					type="password" id="password" name="password" class="form-control"
					placeholder="Password" required="">
			</p>
			<p>
				<label for="password" class="sr-only">Captcha</label>
				 <input
					class="form-control captcha-input" name="kaptcha" class="form-control"
					placeholder="Enter Captcha" required="" autocomplete="off">
				  
				 <span class="captcha-area">
                    <img src="${ctx}/captcha_image" onclick="changeCaptcha('${ctx }')" width="80" height="34" class="captcha-image" alt="Captcha Code"/>
                    <a href="javascript:void(0)" class="btn-refresh" onclick="changeCaptcha('${ctx }')"><i class="fas fa-redo"></i></a>
				 </span>
			</p>
			<p class="d-flex mt-5">
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
	            <button class="btn btn-lg btn-success btn-block mt-2" type="submit" >Signin</button>
	            <div class="float-right text-light">No account? <a class="text-warning" href="${ctx }/register">Register for free now.</a></div>
            </p>
		</form>
	</div>
</body>
</html>