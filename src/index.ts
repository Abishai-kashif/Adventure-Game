#! /usr/bin/env node

/*
File: index.ts
Description: This file contains the main game logic.
*/

import { Player } from "./player.js";
import { Opponent } from "./opponent.js";

import {
	COMMANDS,
	promptAttack,
	promptDrinkPortion,
	promptRun,
	resetGameVariables,
} from "./commands.js";

import inquirer from "inquirer";
import chalk from "chalk";

const LIGHT_BLUE = "#E1F7F5";
const TEEL_GREEN = "#A3FFD6";
const LIGHT_GREEN = "#D8EFD3";

async function initializeGame() {
	console.clear();
	//welcome message
	console.log(`\n
			    ${`${chalk.hex(LIGHT_BLUE).bold("-".repeat(26))}`}		
		\t${chalk.hex(LIGHT_BLUE).bold("<<<")} ${chalk
		.hex(TEEL_GREEN)
		.italic("WELCOME TO ADVENTURE-GAME!")} ${chalk
		.hex(LIGHT_BLUE)
		.bold(">>>")}
			    ${`${chalk.hex(LIGHT_BLUE).bold("-".repeat(26))}\n`}
		`);

	const opponents = new Map<string, Opponent>();

	//creating opponents
	[
		new Opponent("Skeleton"),
		new Opponent("Assassin", 150, 25),
		new Opponent("Zombie", 200, 30),
	].forEach((opponent) => opponents.set(opponent.name, opponent));

	//prompted to enter their name and choose an opponent
	const answer = await inquirer.prompt([
		{
			name: "name",
			type: "input",
			message: chalk.hex(LIGHT_GREEN).bold("What is your name?"),
			default() {
				return "Anonymous";
			},
		},
		{
			name: "opponent",
			type: "list",
			message: chalk
				.hex(LIGHT_GREEN)
				.bold("Who would you like to fight?"),
			choices: [...opponents.keys()].map((o) => ({
				name: `${o}\t${chalk.grey(
					`${chalk.yellow(opponents.get(o).currHealth)} HP`
				)}`,
				value: o,
			})),
		},
	]);

	await startGame(new Player(answer.name), opponents.get(answer.opponent));
}

export default async function startGame(
	player: Player,
	currOpponent: Opponent
) {
	console.clear();

	const playerHP =
		player.currHealth <= 25
			? chalk.red(`${player.currHealth}`.padStart(2, "0"))
			: chalk.yellow(`${player.currHealth}`);

	const opponentHP =
		currOpponent.currHealth <= 25
			? chalk.red(`${currOpponent.currHealth}`.padStart(2, "0"))
			: chalk.yellow(`${currOpponent.currHealth}`);

	// displays opponent and player health
	console.log(
		chalk.whiteBright.bold.italic(`

		${chalk.gray.italic(`(HP: ${playerHP})`)} ${chalk.greenBright(
			player.name.trim()
		)}    VS    ${chalk.red(currOpponent.name)} ${chalk.gray.italic(
			`(HP: ${opponentHP})`
		)}

		`)
	);

	// checks for victory conditions
	if (player.currHealth <= 0) {
		console.clear();

		console.log(
			chalk.whiteBright.bold(
				`\n\n\n\t\t\t   -: The Winner is ${chalk.red.bold.italic(
					currOpponent.name
				)} :-`
			)
		);

		await endGame();
	} else if (currOpponent.currHealth <= 0) {
		console.clear();

		console.log(
			chalk.whiteBright.bold(
				`\n\n\n\t\t-: The Winner is ${chalk.greenBright.bold.italic(
					player.name
				)} :-`
			)
		);

		await endGame();
	} else {
		//prompt user for for actions
		const command = await inquirer.prompt({
			name: "command",
			type: "list",
			message: chalk.hex(LIGHT_GREEN).bold("Choose your action"),
			choices: Object.values(COMMANDS),
		});

		switch (command.command) {
			case COMMANDS.ATTACK:
				await promptAttack(player, currOpponent);
				break;

			case COMMANDS.HEAL:
				await promptDrinkPortion(player, currOpponent);
				break;

			case COMMANDS.RUN:
				await promptRun(player, currOpponent);
		}
	}
}

export async function endGame() {
	console.log("\n\n");

	//when game ends user is prompted if they want to play again
	const answer = await inquirer.prompt({
		name: "want",
		type: "confirm",
		message: chalk.hex(LIGHT_GREEN).bold("Do you want's to play again: "),
	});

	if (answer.want) {
		//reset all values and re-initailize the game
		resetGameVariables();

		await initializeGame();
	} else {
		process.exit();
	}
}

//starting the process
await initializeGame();
