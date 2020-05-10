package com.ludo.util;

public enum BoardPlayingOrder {

	GREEN(1), YELLOW(2), BLUE(3), RED(4);
	
	private int order;
	
	private BoardPlayingOrder(int i) {
		this.order = i;
	}

	public int getOrder() {
		return this.order;
	}
}
