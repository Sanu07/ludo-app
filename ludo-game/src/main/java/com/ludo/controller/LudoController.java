package com.ludo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LudoController {
	
	@ResponseBody
	@GetMapping("/index")
	public String handleLogicToGenerateView() {
		return "index";
	}
}
