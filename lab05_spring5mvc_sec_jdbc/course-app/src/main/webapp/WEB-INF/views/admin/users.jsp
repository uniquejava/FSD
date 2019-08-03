<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="UTF-8">
<title>FSD Course Center</title>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="${ctx }/assets/css/layout.css" />
</head>
<body>

    <jsp:include page="../layout/header.jsp"></jsp:include>

    <div class="container-fluid">
        <div class="row flex-xl-nowrap">
            <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            
                <jsp:include page="../layout/sidemenu.jsp"></jsp:include>
            </div>

            <main class="col-12 col-md-9 col-xl-10 py-md-3 pl-md-5 bd-content" role="main">
            <h2>List of users</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${users}" var="o">
                        <tr>
                            <td>${o.name}</td>
                            <td>${o.email}</td>
                        </tr>
                    </c:forEach>
                </tbody>

            </table>

            </main>
        </div>

    </div>


</body>
</html>