/*
File: commands.ts
Description: This module contains the exported variables and functions related to
game commands.
*/

import { Player } from "./player.js";
import { Opponent } from "./opponent.js";
import chalk from "chalk";
import startGame, { endGame } from "./index.js";
import inquirer from "inquirer";

export enum COMMANDS {
	ATTACK = "Attack",
	HEAL = "Drink Healing Portion",
	RUN = "Run For Your Life",
}

let lastHP: number;
let numOfPortions: number = 3;

export function resetGameVariables() {
	lastHP = 0;
	numOfPortions = 3;
}

export async function promptAttack(player: Player, currOpponent: Opponent) {
	lastHP = player.currHealth;

	const randomNum = Math.round(Math.random() * 1);

	if (randomNum === 1) {
		player.attack(currOpponent);
	} else {
		currOpponent.attack(player, currOpponent.attackForce); // damage increases or decreases as per opponents attack force
	}

	// whether opponent hits me or not
	if (player.currHealth < lastHP) {
		console.log(chalk.red.bold.italic(`${currOpponent.name} Skrikes !`));
	} else {
		console.log(chalk.green.bold.italic(`${player.name} Strikes !`));
	}

	setTimeout(startGame, 700, player, currOpponent);
}

export async function promptDrinkPortion(
	player: Player,
	currOpponent: Opponent
) {
	if (numOfPortions && player.currHealth < 100) {
		console.log(chalk.hex("#AD88C6").bold.italic("\nDrinking Portion...."));

		player.heal();
		numOfPortions--;
	} else if (player.currHealth >= 100) {
		console.log(
			chalk.greenBright.bold.italic("\nHealth is Already Full !")
		);
	} else {
		console.log(chalk.red.bold.italic("\nNo Portions Left !"));
	}

	setTimeout(startGame, 900, player, currOpponent);
}

export async function promptRun(player: Player, currOpponent: Opponent) {
	console.log("\n");
	const answer = await inquirer.prompt({
		name: "want",
		type: "confirm",
		message: chalk
			.hex("#D8EFD3")
			.bold(
				"If you run, you will lose the battle. Are you sure you want to run?"
			),
	});

	if (answer.want) {
		console.clear();
		console.log(
			chalk.white.bold(
				`\n\n\n\t\t-: The Winner is ${chalk.red.bold.italic(
					currOpponent.name
				)} :-`
			)
		);

		await endGame();
	} else {
		startGame(player, currOpponent);
	}
}
