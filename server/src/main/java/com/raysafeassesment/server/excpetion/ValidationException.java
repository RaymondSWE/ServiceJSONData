package com.raysafeassesment.server.excpetion;

public class ValidationException extends RuntimeException{
    public ValidationException(String message) {
        super(message);
    }
}
