package com.auth.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.entity.User;
import com.auth.repository.UserRepository;

@Service
public class UserServices {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	public ResponseEntity<?> getUser()
	{
		return new ResponseEntity<>(userRepository.findAll()
				,HttpStatus.OK);
	}
	
	//adding a user
	public String add(User details)
	{
		details.setPassword(passwordEncoder.encode(details.getPassword()));
		userRepository.save(details);
		return "User successfully added";
	}
	
	//Authenticating the user
	public ResponseEntity<?> authenticationOfUser(User details) 
	{
		try {
			User user=userRepository.findByEmail(details.getEmail());
			if(user==null)
			{
				return new ResponseEntity<>("User not found"
						,HttpStatus.NOT_FOUND);
			}
			
			return (passwordEncoder.matches(details.getPassword()
					, user.getPassword()))? new ResponseEntity<>
			("User logged in successfully",HttpStatus.OK) 
							:  new ResponseEntity<>("Wrong Credentials"
									,HttpStatus.NOT_FOUND);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(e.getMessage(),
					HttpStatus.NOT_FOUND);
		}
	}
	
	//get user by email
	public ResponseEntity<?>getUserByEmail(String email)
	{
		try {
			Optional<User> optionalUser=Optional.
					ofNullable(userRepository.findByEmail(email));
			if(optionalUser.isPresent())
			{
				return new ResponseEntity<>(optionalUser,HttpStatus.OK);
			}
			return new ResponseEntity<>("User not found",
					HttpStatus.NOT_FOUND);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(e.getMessage(),
					HttpStatus.NOT_FOUND);
		}
	}
	
	//deleting user by email id
	public ResponseEntity<?> deleteUser(String email) {
	    try {
	        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(email));
	        
	        if (optionalUser.isPresent()) {  // Checking if user exists
	            userRepository.delete(optionalUser.get());  // Deleting user object
	            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error while deleting user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	//Updating the details of the user
	public ResponseEntity<?> updateUserDetails(String email, User newEntry)
	{
		try
		{
			Optional<User> oldEntryOptional=Optional.ofNullable(userRepository.findByEmail(email));
			if(oldEntryOptional.isPresent())
			{
				User oldEntry=oldEntryOptional.get();
				oldEntry.setUsername(newEntry.getUsername() == null ? oldEntry.getUsername() : newEntry.getUsername());
				oldEntry.setEmail(newEntry.getEmail()==null? oldEntry.getEmail(): newEntry.getEmail());
//				oldEntry.setRole(newEntry.getRole() == null ? oldEntry.getRole() : newEntry.getRole());				
				userRepository.save(oldEntry);
				return new ResponseEntity<>(oldEntry,HttpStatus.OK);
			}
			return new ResponseEntity<>("User not present",HttpStatus.NOT_FOUND);
		}
		
		catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	//Updating the password (Forgot Password)
	public ResponseEntity<String> setPassword(String email, User newEntry) {
	    try {
	        Optional<User> optional = Optional.ofNullable(userRepository.findByEmail(email));
	        if (optional.isPresent()) {
	            User oldEntry = optional.get();

	            // Validate new password
	            if (newEntry.getPassword() != null && !newEntry.getPassword().isEmpty()) {
	                // Check if the new password is different from the old one
	                if (!passwordEncoder.matches(newEntry.getPassword(), oldEntry.getPassword())) {
	                    oldEntry.setPassword(passwordEncoder.encode(newEntry.getPassword()));
	                    userRepository.save(oldEntry);
	                    return new ResponseEntity<>("Password has been updated", HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<>("New password must be different from the old password", HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                return new ResponseEntity<>("New password cannot be empty", HttpStatus.BAD_REQUEST);
	            }
	        } else {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

}
