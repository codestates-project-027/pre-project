package com.stackoverflow.backend.question.service;

import java.security.MessageDigest;

public class Encryption {
    public static String SHA256(String txt) throws Exception{
        StringBuilder sbuf = new StringBuilder();

        MessageDigest mDigest = MessageDigest.getInstance("SHA-256");
        mDigest.update(txt.getBytes());

        byte[] msgStr = mDigest.digest() ;

        for (byte tmpStrByte : msgStr) {
            String tmpEncTxt = Integer.toString((tmpStrByte & 0xff) + 0x100, 16).substring(1);

            sbuf.append(tmpEncTxt);
        }

        return sbuf.toString();
    }
}