package com.revature.happyfarmersmarket.dao;

import com.revature.happyfarmersmarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, String> {

}
