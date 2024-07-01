/*
File: opponent.ts
Description: This file contains the Opponent class.
*/

import { Character } from "./character.js";

export class Opponent extends Character {
	public attackForce: number;

	constructor(
		name: string,
		maxHealth: number = 100,
		attackForce: number = 20
	) {
		super(name, maxHealth);
		this.attackForce = attackForce;
	}
}
