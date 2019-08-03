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

```xml
<beans:beans xmlns="http://www.springframework.org/schema/security"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/security
    http://www.springframework.org/schema/security/spring-security-4.2.xsd">

    <http auto-config="true" use-expressions="true">
        <intercept-url pattern="/admin**" access="hasRole('ROLE_ADMIN')" />
    </http>

    <authentication-manager>
        <authentication-provider>
            <user-service>
                <user name="cyper" password="{noop}123456" authorities="ROLE_ADMIN" />
            </user-service>
        </authentication-provider>
    </authentication-manager>

</beans:beans>
```

默认提供的 EndPoint 有：

1. GET/POST http://localhost:8080/course-app/login
2. GET/POST http://localhost:8080/course-app/logout

### Security jdbc version

```xml
<http auto-config="true" use-expressions="true">
    <csrf disabled="true"/>
    <intercept-url pattern="/admin**" access="hasRole('ROLE_ADMIN')" />
</http>

<beans:bean id="passwordEncoder" class="org.springframework.security.crypto.password.NoOpPasswordEncoder" factory-method="getInstance"/>

<authentication-manager>
    <authentication-provider>
        <!-- <user-service>
            <user name="cyper" password="{noop}123456" authorities="ROLE_ADMIN" />
        </user-service> -->

        <password-encoder ref="passwordEncoder" />

        <jdbc-user-service
            data-source-ref="dataSource"
            users-by-username-query="select username, password, 'true' from tbl_user where username=?;"
            authorities-by-username-query="select username, 'ROLE_ADMIN' from tbl_user where username=?;"
        />

    </authentication-provider>
</authentication-manager>
```

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
6. [What is the difference between spring factory-method and factory-bean?](https://stackoverflow.com/questions/18772490/what-is-the-difference-between-spring-factory-method-and-factory-bean)
