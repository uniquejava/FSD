<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="UTF-8">
<title>FSD Course Center</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
</head>
<body class="container">

    <h2>User list</h2>
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
                </tr></c:forEach>
        </tbody>

    </table>

</body>
</html>