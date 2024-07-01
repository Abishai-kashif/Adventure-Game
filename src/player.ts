/*
File: player.ts
Description: This file contains the Player class.
*/

import { Character } from "./character.js";

export class Player extends Character {
	constructor(name: string, health: number = 100) {
		super(name, health);
	}

	heal() {
		this.currHealth += 25;
	}
}
