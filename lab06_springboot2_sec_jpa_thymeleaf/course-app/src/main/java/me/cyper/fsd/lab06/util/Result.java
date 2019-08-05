package me.cyper.fsd.lab06.util;

/**
 * This is the RESTful service/Spring MVC response object, it will be converted
 * to a json string by Jackson2 automatically.<br>
 * A sample result would be
 * <p>
 * 
 * <pre>
 * {"code":200,"data":{"id":4,"name":"cyper4","email":null,"status":0,"createTime":"2015-02-06"}}
 * </pre>
 * <p>
 * or
 * <p>
 * 
 * <pre>
 * {"code":400,"data":"invalid credentials"}
 * </pre>
 *
 * @author cyper
 */
public class Result {
    public final static int STATUS_OK = 200;
    public final static int STATUS_ERROR = 400;
    public final static int STATUS_SYSTEM_ERROR = 500;

    private int code;
    private Object data;
    private Object message;

    public final static Result OK = new Result(STATUS_OK);

    public static Result ok(Object o) {
        return new Result(STATUS_OK, o);
    }

    public static Result error(String data) {
        return new Result(STATUS_ERROR, data);
    }

    public static Result fatal(String data) {
        return new Result(STATUS_SYSTEM_ERROR, data);
    }

    public Result(int code) {
        this(code, "");
    }

    public Result(int code, Object data) {
        this.code = code;
        if(code == STATUS_OK) {
            this.data = data;
            this.message = "success";
        } else {
            this.message = data;
        }
        
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    
    public Object getMessage() {
        return message;
    }
    
    public void setMessage(Object message) {
        this.message = message;
    }

}