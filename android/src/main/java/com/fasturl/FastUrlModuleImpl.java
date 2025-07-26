package com.fasturl;

public class FastUrlModuleImpl {
    public static final String NAME = "FastUrl";

    public static boolean install() {
        try {
            System.loadLibrary("fast-url");
            return true;
        } catch (Exception exception) {
            return false;
        }
    }
} 