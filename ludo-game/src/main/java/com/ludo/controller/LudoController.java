package com.ludo.controller;

import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ludo.model.RollingInfo;
import com.ludo.util.BoardPlayingOrder;

@RestController
public class LudoController {

	static BoardPlayingOrder[] boardPlayingOrder = BoardPlayingOrder.values();

	Random random = new Random();

	private int index = 0;
	private int chance = 1;
	
	@GetMapping("/rollDice")
	public RollingInfo handleRollingDice() {
		RollingInfo rollInfo = new RollingInfo();
		int randomNumber = (int) ((Math.random() * ((10 - 1) + 1)) + 1);
		randomNumber = randomNumber % 6 + 1;
		rollInfo.setChance(chance);
		if (randomNumber != 6) {
			chance++;
		}
		rollInfo.setRolledValue(randomNumber);
		if(chance == 5) {
			chance = 1;
		}
		rollInfo.setNextChance(chance);
		return rollInfo;
	}
}
