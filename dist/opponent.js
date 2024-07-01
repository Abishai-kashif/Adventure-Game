/*
File: opponent.ts
Description: This file contains the Opponent class.
*/
import { Character } from "./character.js";
export class Opponent extends Character {
    attackForce;
    constructor(name, maxHealth = 100, attackForce = 20) {
        super(name, maxHealth);
        this.attackForce = attackForce;
    }
}
