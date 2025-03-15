package com.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth.entity.User;
import com.auth.services.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173/")
public class UserController {
	
	@Autowired
	UserServices userServices;
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getUsers()
	{
		return userServices.getUser();
	}
	
	@PostMapping("/addUser")
	public String addUser(@RequestBody User details)
	{
		return userServices.add(details);
	}
	
	
	//Authenticating the user
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody User details)
	{
		return userServices.authenticationOfUser(details);
	}
	
	//Get the details of the user by their email id
	@GetMapping("/getUser")
	public ResponseEntity<?> userByEmail(@RequestParam String email)
	{
		return userServices.getUserByEmail(email);
	}
	
	
	//deleting user
	@DeleteMapping("/deleteUser")
	public ResponseEntity<?> delete(@RequestParam  String email)
	{
		return userServices.deleteUser(email);
	}
	
	//Updating the user details
	@PutMapping("/update")
		public ResponseEntity<?> updateDetails(@RequestParam String email,@RequestBody User newEntry)
		{
		 return userServices.updateUserDetails(email, newEntry);
		}
	//Updating the password (Forgot Password)
	@PutMapping("/forgotPass")
	public ResponseEntity<?> forgotPassword(@RequestParam String email,@RequestBody User newEntry)
	{
		return userServices.setPassword(email,newEntry);
	}
}

