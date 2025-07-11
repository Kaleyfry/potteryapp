package com.pottery.potteryorders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
public class PotteryOrdersApplication {

	public static void main(String[] args) {
		// Load .env file
        Dotenv dotenv = Dotenv.load();

        // Set system properties so Spring Boot can use them
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		
		SpringApplication.run(PotteryOrdersApplication.class, args);
	}

}
