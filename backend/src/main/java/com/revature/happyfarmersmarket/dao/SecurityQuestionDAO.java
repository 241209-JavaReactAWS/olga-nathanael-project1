package com.revature.happyfarmersmarket.dao;

import com.revature.happyfarmersmarket.model.SecurityQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecurityQuestionDAO extends JpaRepository<SecurityQuestion, Integer> {

}
