package me.cyper.fsd.lab05.exception;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import me.cyper.fsd.lab05.util.Result;

/**
 * Global Exception Handler.
 */
@ControllerAdvice
@RestController
class GlobalControllerExceptionHandler {
    final static Logger logger = LoggerFactory.getLogger(GlobalControllerExceptionHandler.class);

    @Autowired
    protected MessageSource messageSource;

    /**
     * Parameter Validation Errors. (code: 400).
     * 
     * @param e
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = { MethodArgumentNotValidException.class })
    public Result handleClientError(MethodArgumentNotValidException e) {
        List<String> errors = new ArrayList<String>();
        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : e.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }
        return new Result(HttpStatus.BAD_REQUEST.value(), errors);
    }

    /**
     * Client exceptions (code: 400).
     * 
     * @param e
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = { BusinessException.class, ServletException.class })
    public Result handleClientError(Exception e) {
        logger.warn("global: " + e.getMessage());
        return new Result(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    /**
     * 
     * Uncaught system exceptions (code: 500).
     *
     * @param e
     * @return
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Result handleInternalServerError(Exception e) {
        logger.error(e.getMessage(), e);
        return new Result(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
    }

}
