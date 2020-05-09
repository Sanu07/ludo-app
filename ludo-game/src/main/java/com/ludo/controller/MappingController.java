package com.ludo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MappingController {
	
	@RequestMapping("/")
	public String handleLogicToGenerateView() {
		return "index.html";
	}
}
