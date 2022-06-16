package com.ludo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MappingController {
	
	@RequestMapping("/index")
	public String handleLogicToGenerateView() {
		return "index.html";
	}
	
	@RequestMapping("/")
	public ResponseEntity<Void> checkResponse() {
		return ResponseEntity.ok().build();
	}
}
