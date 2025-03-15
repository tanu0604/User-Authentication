package com.auth.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="users_table")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="user_name")
	 private String username;
	
	@Column(name="email_id")
	 private String email;
	
	@Column(name="user_role")
	 private String role;
	
	@Column(name="user_password")
	 private String password;
	
	@CreationTimestamp
	@Column(name="created_at" , nullable=false)
	 private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name="updated_at" , nullable=false)
	 private LocalDateTime updatedAt;
}
