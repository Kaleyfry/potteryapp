package com.pottery.potteryorders;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pottery")
public class PotteryController {
    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping
    public List<Pottery> getAll() {
        return jdbc.query("SELECT * FROM POTTERY LIMIT 10", (rs, rowNum) -> {
            Pottery p = new Pottery();
            p.setId(rs.getInt("ID"));
            p.setOrderId(rs.getString("ORDER_ID"));
            p.setName(rs.getString("NAME"));
            p.setLength(rs.getDouble("LENGTH"));
            p.setWidth(rs.getDouble("WIDTH"));
            p.setHeight(rs.getDouble("HEIGHT"));
            p.setEmail(rs.getString("EMAIL"));
            p.setPrice(rs.getDouble("PRICE"));
            Timestamp orderDateTimestamp = rs.getTimestamp("ORDER_DATE");
            p.setOrderDate(orderDateTimestamp != null ? orderDateTimestamp.toLocalDateTime() : null);
            return p;
        });
    }

    @PostMapping
    public void add(@RequestBody Pottery piece) {
        piece.setPrice(piece.getLength() * piece.getWidth() * piece.getHeight() * 0.04);
        piece.setOrderId(OrderIdGenerator.generateOrderId());
        piece.setOrderDate(LocalDateTime.now());
        if (piece.getEmail() != null) {
            piece.setEmail(piece.getEmail().toLowerCase());
        }

        Timestamp orderTimestamp = Timestamp.valueOf(piece.getOrderDate());

        jdbc.update(
            "INSERT INTO POTTERY (ORDER_ID, NAME, LENGTH, WIDTH, HEIGHT, EMAIL, PRICE, ORDER_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            piece.getOrderId(), piece.getName(), piece.getLength(), piece.getWidth(),
            piece.getHeight(), piece.getEmail(), piece.getPrice(), orderTimestamp
        );
    }
}
