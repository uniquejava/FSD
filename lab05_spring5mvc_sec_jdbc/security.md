# Spring Security notes

## custom login form

`<form-login />`可写可不写

```xml
<http auto-config="true" use-expressions="true">
    <csrf disabled="true"/>
    <intercept-url pattern="/admin**" access="hasRole('ROLE_ADMIN')" />
    <form-login />
</http>
```

将`<form-login />` 改为 `<form-login login-page="/login"/>` Spring 就会用我们自定义的 loginForm 页面。

我们得注册一个 `@GetMapping('/login')` 指向我们自己定义的 `WEB-INF/views/login.jsp`.

## captcha

主要参考了： https://liuyanzhao.com/8115.html

## References

1. https://stackoverflow.com/questions/30437351/spring-security-login-captcha-integration
2. https://liuyanzhao.com/8104.html
