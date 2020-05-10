package com.ludo.model;

public class RollingInfo {

	private int rolledValue;
	private int chance;
	private int nextChance;
	
	public int getNextChance() {
		return nextChance;
	}

	public void setNextChance(int nextChance) {
		this.nextChance = nextChance;
	}

	public int getRolledValue() {
		return rolledValue;
	}

	public void setRolledValue(int rolledValue) {
		this.rolledValue = rolledValue;
	}

	public int getChance() {
		return chance;
	}

	public void setChance(int chance) {
		this.chance = chance;
	}

}
