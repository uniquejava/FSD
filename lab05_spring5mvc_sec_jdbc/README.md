# Course App (spring mvc)

## Tech stack

1. [x] Spring MVC 5
2. [x] Spring Security 5
3. [x] Spring JDBC
4. [x] JSP/EL/JSTL
5. [x] Bootstrap 4.3
6. [x] Tomcat 9
7. [x] H2 In-Memory Database

## How to run

1. Start up tomcat 9 server
2. Open in browser: http://localhost:8080/course-app/

## Spring Security

### Security basic version

基于： https://www.mkyong.com/spring-security/spring-security-hello-world-example/

默认提供的 EndPoint 有：

1. GET/POST http://localhost:8080/course-app/login
2. GET/POST http://localhost:8080/course-app/logout

### Security Errors

1. Failed to evaluate expression 'ROLE_USER' => (ref #5)
2. There is no PasswordEncoder mapped for the id "null" => 加上前缀(noop)

### Security custom authentication

1. https://howtodoinjava.com/spring-security/jdbc-user-service-based-spring-security-example/

## References

1. https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc
2. https://howtodoinjava.com/spring5/webmvc/spring-dispatcherservlet-tutorial/
3. https://stackoverflow.com/questions/41577234/why-does-spring-mvc-respond-with-a-404-and-report-no-mapping-found-for-http-req
4. https://howtodoinjava.com/spring5/security5/security-java-config-enablewebsecurity-example/
5. https://stackoverflow.com/questions/35715065/it-throws-me-500-failed-to-evaluate-expression-role-user-in-spring-security
