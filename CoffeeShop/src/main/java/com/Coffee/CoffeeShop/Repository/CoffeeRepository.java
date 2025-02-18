package com.Coffee.CoffeeShop.Repository;

import com.Coffee.CoffeeShop.Models.Coffee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoffeeRepository extends JpaRepository<Coffee, Integer> {
    Optional<Coffee> findByName(String name);
}