package com.Coffee.CoffeeShop.Models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Column(name="userId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    /*
     * User field for username login credential.
     */
    @Column(name = "username")
    private String username;

    /*
     * User field for password login credential.
     */
    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    // This stores the user role in the table as a string, default is a number
    private Role role;
    /*
     * Default no args constructor
     */
    public User() {
    }

    public User(Integer userId, String username, String password) {
        this.username = username;
        this.password = password;
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {this.role = role;}

    public Role getRole() {return role;}

}
