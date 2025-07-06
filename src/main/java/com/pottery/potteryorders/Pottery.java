package com.pottery.potteryorders;

import java.time.LocalDateTime;

public class Pottery {
    private int id;
    private String orderId;
    private String name;
    private double length;
    private double width;
    private double height;
    private String email;
    private double price;
    private LocalDateTime orderDate;

    // Getters and setters...
    
    // ID
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    // orderId
    public String getOrderId() {
        return orderId;
    }
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    // name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // length
    public double getLength() {
        return length;
    }
    public void setLength(double length) {
        this.length = length;
    }

    // width
    public double getWidth() {
        return width;
    }
    public void setWidth(double width) {
        this.width = width;
    }

    // height
    public double getHeight() {
        return height;
    }
    public void setHeight(double height) {
        this.height = height;
    }

    // email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // price
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    // orderDate
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}
