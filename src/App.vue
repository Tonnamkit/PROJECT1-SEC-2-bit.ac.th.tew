<script setup>
import { ref, reactive } from 'vue';
import Questions from '../data/question';
import debugMode from './util/debug';

const { debug } = debugMode(true);

const quizzes = reactive(Questions);
const dropExtraLifeRatio = 5;

const useGameStore = (lifePoints) => {
	const state = reactive({
		gameStarted: false,
		gameEnded: false,
		lifePoints,
		score: 9,
		currentQuiz: 0,
	});

	const actions = {
		nextQuiz() {
			state.currentQuiz++;
		},
		addScore() {
			state.score++;
		},
		addLifePoint() {
			state.lifePoints++;
		},
		removeLifePoint() {
			state.lifePoints--;
		},
		startGame() {
			state.gameStarted = true;
		},
		endGame() {
			state.gameEnded = true;
		},
		reset() {
			state.gameStarted = false;
			state.gameEnded = false;
			state.lifePoints = lifePoints;
			state.score = 0;
			state.currentQuiz = 0;
		},
		restart() {
			this.reset();
			state.gameStarted = true;
		},
	};

	return { state, actions };
};

const displayImg = (percent) => {
	const calPercent = (state.score / quizzes.length) * 100;
	return calPercent < percent;
};

const { state, actions } = useGameStore(3);

const setStyleButton = () => {};

const optionExist = () => {
	return quizzes[state.currentQuiz].options;
};

const optionValidate = (optionAns, event) => {
	if (!optionAns) {
		const answerText = event.target.value.trim().toLowerCase();
		if (answerText === quizzes[state.currentQuiz].answer.toLowerCase()) {
			// setStyle setBtnColor(Green)
			actions.addScore();
			debug(state.score);
		} else {
			actions.removeLifePoint();
			debug('current life points : ' + state.lifePoints);
			if (state.lifePoints === 0) {
				debug('end game !!!!');
				actions.endGame();
			}
		}
	} else {
		if (optionAns === quizzes[state.currentQuiz].answer) {
			// setStyle setBtnColor(Green)
			actions.addScore();
			debug(state.score);
		} else {
			actions.removeLifePoint();
			debug('current life points : ' + state.lifePoints);
			if (state.lifePoints === 0) {
				debug('end game !!!!');
				actions.endGame();
			}
		}
	}

	if (state.currentQuiz !== quizzes.length - 1) {
		actions.nextQuiz();
	} else {
		actions.endGame();
	}
};

//adding extra lifePoints for 5 questions next.
// drop ratio is อัตราส่วนในการ drop extra lifePoints.
const extraLifePoints = (currentQuiz, dropRatio) => {
	if (currentQuiz % dropRatio === 0 && currentQuiz !== 0) {
		if (state.lifePoints === 3) {
			debug('you have maximum lifepoints.');
			return;
		}
		debug('add extra life points.');
		actions.addLifePoint();
	}
};

const isGameEnded = (currentQuiz, quizLength) => {
	return currentQuiz === quizLength - 1;
};
</script>

<template>
	<div class="h-screen w-screen flex items-center select-none">
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		/>
		<!-- Main Menu -->
		<div
			id="main-menu"
			v-if="!state.gameStarted"
			class="flex flex-col justify-center items-center gap-[15%] sm:gap-[22%] h-1/2 sm:w-1/2 mx-auto text-center"
		>
			<h1 class="text-4xl sm:text-5xl font-bold leading-loose">
				Funny Quiz Game
			</h1>
			<button
				@click="actions.startGame"
				class="btn btn-outline w-3/5 sm:w-1/2 text-xl"
			>
				Start Game
			</button>
		</div>
		<!-- Quiz -->
		<div
			id="quiz-section"
			v-else
		>
			<div class="lifePoint">
				Life Point <span v-for="n in state.lifePoints">❤️</span>
			</div>
			<h2 class="question">
				{{ quizzes[state.currentQuiz].question }}
			</h2>
			<div class="quizForm">
				<div
					class="textBox"
					v-if="!optionExist()"
				>
					<input
						type="text"
						id="answer"
						placeholder="Type your answer here!"
						@keyup.enter="optionValidate(undefined, $event)"
					/>
				</div>
				<button
					v-else
					class="btn btn-outline"
					v-for="(option, index) in quizzes[state.currentQuiz].options"
					:key="index"
					@click="optionValidate(index + 1, $event)"
				>
					{{ option }}
				</button>
			</div>
		</div>
		<!-- Result Overlay -->
		<div
			id="result"
			v-show="state.gameEnded"
			class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
		>
			<div
				id="result-content"
				class="bg-white p-8 rounded-lg text-center"
			>
				<div id="header-section">
					<h2 class="text-5xl font-bold">Game Ended</h2>
				</div>
				<div
					id="score-section"
					class="text-2xl my-4"
				>
					Your Score: {{ state.score }}
				</div>
				<div
					id="image-section"
					class="my-4 flex justify-center"
				>
					<div v-if="displayImg(25)">
						<img
							src="./assets/images/25.jpg"
							alt="เฟมผิดหวังในตัวคุณ"
							class="rounded-lg w-64 h-80 object-cover"
						/>
						<h3 class="text-xl mt-3 font-bold underline underline-offset-2">
							เฟมผิดหวังในตัวคุณ
						</h3>
					</div>
					<div v-else-if="displayImg(50)">
						<img
							src="./assets/images/50.jpg"
							alt="เฟมสนใจในตัวคุณ"
							class="rounded-lg w-64 h-80 object-cover"
						/>
						<h3 class="text-xl mt-3 font-bold underline underline-offset-2">
							เฟมสนใจในตัวคุณ
						</h3>
					</div>
					<div v-else-if="displayImg(75)">
						<img
							src="./assets/images/75.jpg"
							alt="เฟมรู้สึกดีกับคุณ"
							class="rounded-lg w-64 h-80 object-cover"
						/>
						<h3 class="text-xl mt-3 font-bold underline underline-offset-2">
							เฟมรู้สึกดีกับคุณ
						</h3>
					</div>
					<div v-else>
						<img
							src="./assets/images/100.jpg"
							alt="เฟมรู้สึกภูมิใจในตัวคุณ"
							class="rounded-lg w-64 h-80 object-cover"
						/>
						<h3 class="text-xl mt-3 font-bold underline underline-offset-2">
							เฟมรู้สึกภูมิใจในตัวคุณ
						</h3>
					</div>
				</div>
				<div
					id="btn-section"
					class="flex justify-center"
				>
					<button
						@click="actions.reset"
						class="text-xl px-4 py-2 bg-blue-500 text-white rounded mr-4"
					>
						<span class="material-symbols-outlined"> home </span>
					</button>
					<button
						@click="actions.restart"
						class="text-xl px-4 py-2 bg-green-500 text-white rounded"
					>
						<span class="material-symbols-outlined"> restart_alt </span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
