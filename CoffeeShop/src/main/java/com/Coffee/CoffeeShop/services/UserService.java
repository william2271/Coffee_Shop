package com.Coffee.CoffeeShop.services;
import com.Coffee.CoffeeShop.Models.*;
import com.Coffee.CoffeeShop.Repository.*;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User newUser) {
        if(newUser.getUsername().isBlank() || newUser.getPassword().isBlank()) {
            return null;
        }
        return userRepository.save(newUser);

    }

    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password).orElse(null);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
