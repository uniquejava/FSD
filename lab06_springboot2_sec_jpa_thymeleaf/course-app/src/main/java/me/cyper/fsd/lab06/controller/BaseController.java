package me.cyper.fsd.lab06.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.code.kaptcha.Constants;

import me.cyper.fsd.lab06.exception.BusinessException;

public class BaseController {
    final static Logger logger = LoggerFactory.getLogger(BaseController.class);

    public void checkCaptcha(String captcha, HttpSession session) {
        String expect = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);

        if (logger.isDebugEnabled()) {
            logger.debug("expected captcha: {}, actual: {}", expect, captcha);
        }

        if (expect == null || !captcha.equalsIgnoreCase(expect)) {
            throw new BusinessException("Invalid captcha code.");
        }
    }

}