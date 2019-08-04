<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
  <a class="navbar-brand mr-0 mr-md-2" href="${ctx }/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></a>

  <div class="navbar-nav-scroll">
    <ul class="navbar-nav bd-navbar-nav flex-row">
      <li class="nav-item">
        <a class="nav-link <c:if test="${empty activeLink}">active</c:if>" href="${ctx }/">Home</a>
      </li>
      
      <sec:authorize access="hasAnyRole('ROLE_USER','ROLE_ADMIN')">
      <li class="nav-item">
        <a class="nav-link <c:if test="${activeLink eq 'tutorials' }">active</c:if>" href="${ctx }/user/tutorials">Tutorials</a>
      </li>
      </sec:authorize>
      
      <sec:authorize access="hasRole('ROLE_ADMIN')">
      <li class="nav-item">
          <a class="nav-link <c:if test="${activeLink eq 'admin' }">active</c:if>" href="${ctx }/admin/admin">Administration</a>
      </li>
      </sec:authorize>
      
    </ul>
  </div>

  <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
    <li class="nav-item dropdown">
      <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Feedback
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
        <a class="dropdown-item" target="_blank" href="https://github.com/uniquejava/FSD/issues">Issues</a>
        <a class="dropdown-item" target="_blank" href="https://github.com/uniquejava/FSD/pulls">Pull request</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" target="_blank" href="https://github.com/uniquejava/FSD">Source code</a>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link p-2" href="https://github.com/uniquejava/FSD" target="_blank" rel="noopener" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" class="navbar-nav-svg" viewBox="0 0 512 499.36" role="img" focusable="false"><title>GitHub</title><path fill="currentColor" fill-rule="evenodd" d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path></svg></a>
    </li>
  </ul>

	<sec:authorize access="hasRole('ROLE_ANONYMOUS')">
		<a
			class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
			href="${ctx }/login">Login</a>
	</sec:authorize>
	<sec:authorize access="hasRole('ROLE_USER')">
		<a
			class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
			href="${ctx }/logout">Logout</a>
	</sec:authorize>
</header>