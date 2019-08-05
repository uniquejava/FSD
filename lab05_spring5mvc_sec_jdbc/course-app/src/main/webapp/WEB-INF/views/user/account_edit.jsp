<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="UTF-8">
<title>FSD Course Center</title>
<script src="${ctx }/assets/js/jquery-3.4.1.min.js"></script>
<script src="${ctx }/assets/js/jquery.toast.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"
  integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E"
  crossorigin="anonymous"
/>
<link rel="stylesheet" href="${ctx }/assets/css/jquery.toast.min.css" />

<link rel="stylesheet" href="${ctx }/assets/css/layout.css" />
<link rel="stylesheet" href="${ctx }/assets/css/signup.css" />
<script type="text/javascript">
	function changeCaptcha(ctx) {
		$(".captcha-image").attr("src", ctx + "/captcha_image");
	}

	function updateUser() {
		if($('#password').val() !== $('#password2').val()) {
		   $.toast({
                heading: 'Error',
                text: 'password mismatch.',
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
			return false;
		}

		let data = {
			userId : $('#userId').val(),
			name : $('#name').val(),
			email : $('#email').val(),
			username : $('#username').val(),
			password : $('#password').val(),
			admin : $('#admin').prop('checked')
		};

		$.ajax({
			type : "PUT",
			contentType : "application/json",
			url : "${ctx}/user/account?kaptcha=" + $('#kaptcha').val(),
			data : JSON.stringify(data),
			dataType : 'json',
			timeout : 100000,
        }).done(function(res) {
            $.toast({
                heading: 'Success',
                text: 'Account updated successfully.',
                showHideTransition: 'slide',
                icon: 'success',
                position: 'top-right'
            })
        }).fail(function(res) {
            $.toast({
                heading: 'Error',
                text: res.responseJSON.message,
                showHideTransition: 'fade',
                icon: 'error',
                position: 'top-right'
            })
        }).always(function() {
            // ...
        });
	}
</script>
</head>
<body>

    <jsp:include page="../layout/header.jsp"></jsp:include>

    <div class="container-fluid">
        <div class="row flex-xl-nowrap">
            <div class="col-12 col-md-3 col-xl-2 bd-sidebar">

                <jsp:include page="../layout/sidemenu.jsp"></jsp:include>
            </div>

            <main class="col-12 col-md-9 col-xl-10 py-md-3 pl-md-5 bd-content" role="main">
		        <form class="form-signup" method="post" action="${ctx }/register">
		            <c:if test="${not empty errorMessge}">
		                 <div class="alert alert-danger" role="alert">${ errorMessge }</div>
		            </c:if>
		            <p>
		                <label for="name">Name</label>
		                <input
		                    type="text" id="name" name="name" value="${user.name }" class="form-control"
		                    required="" autofocus="" autocomplete="off">
		            </p>
		            <p>
		                <label for="email">Email</label>
		                 <input
		                    type="email" id="email" name="email" value="${user.email }" class="form-control"
		                    required="" autocomplete="off">
		            </p>
		            <p>
		                <label for="username">Username</label>
		                <input
		                    type="text" id="username" name="username" value="${user.username }" class="form-control"
		                   required="" autofocus="" autocomplete="off">
		            </p>
		            <p>
		                <label for="password">Password</label>
		                 <input
		                    type="password" id="password" name="password" value="${user.password }" class="form-control" required="">
		            </p>
		            <p>
		                <label for="password2">Re-Enter Password:</label>
		                 <input
		                    type="password" id="password2" name="password2" class="form-control" required="">
		            </p>
		            <p class="checkbox">
                        <input type="checkbox" class="form-check-input" id="admin" <c:if test="${user.admin}"> checked="checked"</c:if>>
                        <label for="admin">I am an administrator!</label>
                    </p>
		            <p>
		                <label> <img src="${ctx}/captcha_image" onclick="changeCaptcha('${ctx }')" width="80" height="34" class="captcha-image" alt="Captcha Code"/>
                           <a href="javascript:void(0)" class="btn-refresh" onclick="changeCaptcha('${ctx }')"><i class="fas fa-redo"></i></a></label>
		                   <input class="form-control captcha-input" id="kaptcha" name="kaptcha" placeholder="Enter Captcha" required="" autocomplete="off">
		            </p>
		            <p>
		               <label></label>
		               <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		               <input type="hidden" name="userId" id="userId" value="${user.userId}" />
                       <button class="btn btn-success" type="button" onclick="updateUser()"> Update </button>
		            </p>
            </div>
            </main>
        </div>

    </div>


</body>
</html>