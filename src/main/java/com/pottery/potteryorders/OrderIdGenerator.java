package com.pottery.potteryorders;

import java.util.Random;

public class OrderIdGenerator {
    private static final String CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final Random random = new Random();

    public static String generateOrderId() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            sb.append(CHAR_POOL.charAt(random.nextInt(CHAR_POOL.length())));
        }
        return sb.toString();
    }
}
