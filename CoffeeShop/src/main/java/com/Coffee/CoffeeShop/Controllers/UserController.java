package com.Coffee.CoffeeShop.Controllers;
import com.Coffee.CoffeeShop.Models.*;
import com.Coffee.CoffeeShop.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.Coffee.CoffeeShop.services.UserService;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5173"}, allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService,
                          UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }




    @PostMapping("/login") // http://localhost:8081/users/login
    public ResponseEntity<User> loginHandler(@RequestBody User user, HttpSession session){


        User returnedUser = userService.login(user.getUsername(), user.getPassword());

        if (returnedUser == null){

            return ResponseEntity.badRequest().build();

        }


        session.setAttribute("username", returnedUser.getUsername());
        session.setAttribute("userId", returnedUser.getUserId());
        session.setAttribute("role", returnedUser.getRole().toString());



        return ResponseEntity.ok(returnedUser);
    }


    @PostMapping("/logout") //http://localhost:8081/users/logout
    public ResponseEntity<?> logout(HttpSession session){
        // To log a user out, we just invalidate the session
        session.invalidate();
        return ResponseEntity.noContent().build();
    }



    @GetMapping // http://localhost:8081/users
    public ResponseEntity<User> getUserInfoHandler(HttpSession session){
        // Validate the user is logged in
        if (session.isNew() || session.getAttribute("username") == null){
            return ResponseEntity.status(401).build();
        }


        User userToBeReturned = userService.findUserByUsername((String) session.getAttribute("username"));

        return ResponseEntity.ok(userToBeReturned);
    }
    //To register users
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (newUser.getUsername() == null || newUser.getUsername().isBlank() ||
                newUser.getPassword() == null || newUser.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or password cannot be blank");
        }

        User savedUser = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
