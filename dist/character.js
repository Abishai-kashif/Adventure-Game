/*
File: character.ts
Description: This file contains the Base Character class.
*/
export class Character {
    name;
    health;
    maxHealth;
    constructor(name, health = 100) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
    }
    takeDamage(damage) {
        this.currHealth -= damage;
    }
    attack(character, damage = 20) {
        character.takeDamage(damage);
    }
    get currHealth() {
        return this.health;
    }
    set currHealth(value) {
        this.health = Math.max(Math.min(value, this.maxHealth), 0); // ensure health is between 0 to 100
    }
}
