package com.Coffee.CoffeeShop.services;
import com.Coffee.CoffeeShop.Models.*;
import com.Coffee.CoffeeShop.Repository.*;
import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CoffeeService {
    private final CoffeeRepository coffeeRepository;

    @Autowired
    public CoffeeService(CoffeeRepository coffeeRepository){
        this.coffeeRepository = coffeeRepository;
    }
    //Creating coffee
    public Coffee createCoffee(Coffee coffee){
        return coffeeRepository.save(coffee);
    }
    //Find all kind of coffees
    public List<Coffee> findAllCoffee(){
        return coffeeRepository.findAll();
    }
    // Find by id
    public Optional<Coffee> findCoffeeById(Integer id){
        return coffeeRepository.findById(id);
    }
    // Deletes one type of coffee
    public int deleteCoffeeById(Integer id){
        coffeeRepository.deleteById(id);
        return 0;
    }
    // Update the coffee name
    public boolean updateCoffeeName(Integer id, String newName) {
        return coffeeRepository.findById(id)
                .map(coffee -> {
                    coffee.setName(newName);
                    coffeeRepository.save(coffee);
                    return true;
                })
                .orElse(false);
    }

    // Find if coffee exists
    public boolean coffeeExists(Coffee coffee) {
        return coffeeRepository.findByName(coffee.getName()).isPresent();
    }



    // Update the quantity of the coffee
    public boolean updateCoffeeQuantity(Integer id, Integer orderedQuantity) {
        return coffeeRepository.findById(id)
                .map(coffee -> {
                    // Ensure that the ordered quantity doesn't exceed the available quantity
                    if (coffee.getQuantity() >= orderedQuantity) {
                        coffee.setQuantity(coffee.getQuantity() - orderedQuantity);
                        coffeeRepository.save(coffee);
                        return true;
                    }
                    return false; // Not enough stock
                })
                .orElse(false); // Coffee not found
    }

    // Update the description of the coffee
    public boolean updateCoffeeDescription(Integer id, String newDescription) {
        return coffeeRepository.findById(id)
                .map(coffee -> {
                    coffee.setDescription(newDescription);
                    coffeeRepository.save(coffee);
                    return true;
                })
                .orElse(false);
    }
    //Update all the coffees

    @Transactional
    public Coffee updateCoffee(Integer id, Coffee coffee) {

        Coffee existingCoffee = coffeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coffee not found with id: " + id));


        existingCoffee.setName(coffee.getName());
        existingCoffee.setQuantity(coffee.getQuantity());
        existingCoffee.setDescription(coffee.getDescription());

        return coffeeRepository.save(existingCoffee);
    }
}
