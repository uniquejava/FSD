## Assignment:

Spring Core, Spring MVC, REST, Security, Validation, Exception, Logging, JWT

## Develop:

User Registration & Login with CAPTCHA (Completely Automated Public Turing test to tell Computers and Human Apart)and one super admin

## Description:

1. Create User Registration page with captcha.
2. Registered user details must be save to H2 in-memory database
3. Create login page with captcha
4. Captcha should have a reload button to re-send request to regenerate the captcha
5. Write server side code for generating captcha image and sending it back with response.
6. Code to verify whether the captcha string entered by user and stored in the session matches or not.

## Acitivity

1. [x] Create a Maven project
2. [x] Use POM.xml to manage dependencies
3. [x] Deployment Descriptor is created and configured to open default page of the spring mvc applicaton
4. [x] Dispatcher Servlet is created and configured as per requirements
5. [x] Controllers are created in repsectve package (com.something.controller)
6. [ ] POJO classes are created where required in respectve package (com.something.pojo)
7. [x] Entty classes are created where required in respectve package (com.something.entty) for different groups of users
8. [x] Service classes are created where required in respectve package (com.something.service)
9. [x] DAO classes are created where required in respectve package (com.something.dao)
10. [ ] View is created for user registraton
11. [ ] View is created for user login
12. [ ] View is created for account update
13. [ ] If the user is not logged in, account update page is redirectng the user to login page; with line saying - login to update your account
14. [ ] If the user is logged in, he/she can logout to come out of the secure session
15. [ ] Admin (Page with dummy message about admin) page is visible and accessible only to the logged-in user who is super-admin
16. [ ] Spring Security is used to implement user roles (guest user, logged-in user, super user)
17. [ ] CAPTCHA image is being created by class in utl package (com.something.utl) and sent with response to view
18. [ ] Have used Spring logging to dump the logs
19. [ ] Have used Spring Validatons for validatng the user registraton informaton in respectve package (com.something.validaton)
20. [ ] Have used Spring Exceptons to manage exceptons in respectve package (com.something.excepton)
21. [ ] Any extra other than documented
