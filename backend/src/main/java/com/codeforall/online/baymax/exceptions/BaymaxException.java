package com.codeforall.online.baymax.exceptions;

/**
 * A generic java bank exception to be used as base for concrete types of exceptions
 *
 * @see Exception
 */
public class BaymaxException extends Exception {

    /**
     * @see Exception#Exception(String)
     */
    public BaymaxException(String message) {
        super(message);
    }
}
