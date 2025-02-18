package com.Coffee.CoffeeShop.Repository;

import com.Coffee.CoffeeShop.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByUsernameAndPassword(String username, String password);
}