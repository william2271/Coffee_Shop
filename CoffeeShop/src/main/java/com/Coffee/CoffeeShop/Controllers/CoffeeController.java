package com.Coffee.CoffeeShop.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.*;
import com.Coffee.CoffeeShop.Models.*;
import com.Coffee.CoffeeShop.Repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 import com.Coffee.CoffeeShop.services.CoffeeService;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5173"}, allowCredentials = "true")
@RequestMapping("/api/coffee")
public class CoffeeController {

    private final CoffeeService coffeeService;

    @Autowired
    public CoffeeController(CoffeeService coffeeService) {
        this.coffeeService = coffeeService;
    }

    // Create a new coffee
    @PostMapping
    public ResponseEntity<Coffee> createCoffee(@RequestBody Coffee coffee) {

        boolean exists = coffeeService.coffeeExists(coffee);

        if (exists) {
            return ResponseEntity.badRequest().build();
        }

        Coffee createdCoffee = coffeeService.createCoffee(coffee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCoffee);
    }

    // Get all coffees
    @GetMapping
    public ResponseEntity<List<Coffee>> findAllCoffee() {
        List<Coffee> coffees = coffeeService.findAllCoffee();
        return ResponseEntity.ok(coffees);
    }

    // Get coffee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Coffee> findCoffeeById(@PathVariable Integer id) {
        Optional<Coffee> coffee = coffeeService.findCoffeeById(id);
        return coffee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete coffee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoffeeById(@PathVariable Integer id) {

        int deleted = coffeeService.deleteCoffeeById(id);
        if(deleted == 1){
            return ResponseEntity.ok(deleted);
        } else {
            return ResponseEntity.ok().build();
        }
    }
    // Update coffee name
    @PatchMapping("/{id}/name")
    public ResponseEntity<Void> updateCoffeeName(@PathVariable Integer id, @RequestBody String newName) {

        boolean updated = coffeeService.updateCoffeeName(id, newName);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Update coffee quantity
    @PatchMapping("/{id}/quantity")
    public ResponseEntity<Void> updateCoffeeQuantity(@PathVariable Integer id, @RequestBody Integer newQuantity) {

        boolean updated = coffeeService.updateCoffeeQuantity(id, newQuantity);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Update coffee description
    @PatchMapping("/{id}/description")
    public ResponseEntity<Void> updateCoffeeDescription(@PathVariable Integer id, @RequestBody String newDescription) {

        boolean updated = coffeeService.updateCoffeeDescription(id, newDescription);
        return updated ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    // Update all fields
    @PutMapping("/{id}")
    public ResponseEntity<Coffee> updateCoffee(
            @PathVariable("id") Integer id,
            @RequestBody Coffee coffee) {

        Coffee updatedCoffee = coffeeService.updateCoffee(id, coffee);

        // Return the updated coffee object
        return ResponseEntity.ok(updatedCoffee);
    }
}
