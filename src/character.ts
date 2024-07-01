/*
File: character.ts
Description: This file contains the Base Character class.
*/

export abstract class Character {
	protected maxHealth: number;

	constructor(public name: string, protected health: number = 100) {
		this.maxHealth = health;
	}

	takeDamage(damage: number): void {
		this.currHealth -= damage;
	}

	attack(character: Character, damage: number = 20): void {
		character.takeDamage(damage);
	}

	get currHealth() {
		return this.health;
	}

	set currHealth(value) {
		this.health = Math.max(Math.min(value, this.maxHealth), 0); // ensure health is between 0 to 100
	}
}
