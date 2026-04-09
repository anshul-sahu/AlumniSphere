package com.alumniSphere.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alumniSphere.entities.User;
import com.alumniSphere.entities.Role;
import com.alumniSphere.entities.Status;
import com.alumniSphere.repos.UserRepo;

import java.time.LocalDate;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(UserRepo userRepo) {
        return args -> {

            boolean adminExists = userRepo.existsByRole(Role.ADMIN);

            if (!adminExists) {

                User admin = new User();
                admin.setName("System Admin");
                admin.setEmail("admin@alumni.com");
                admin.setPassword("admin123"); 
                admin.setPhone("9999999999");
                admin.setRole(Role.ADMIN);
                admin.setStatus(Status.APPROVED);
                admin.setEmailVerified(true);
                admin.setCreatedAt(LocalDate.now());

                userRepo.save(admin);

                System.out.println("Default Admin Created");
            }
        };
    }
}