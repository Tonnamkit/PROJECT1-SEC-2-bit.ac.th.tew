import { reactive, computed } from "vue";
import { shuffle } from "@/utils/ArrayUtils";
import GameStatus from "@/utils/GameStatus";

const useGameStore = (quizzes, lifePoints) => {
	const state = reactive({
	  gameStatus: GameStatus.DEFAULT,
	  gameStarted: false,
	  gameEnded: computed(
		() =>
		  state.lifePoints === 0 ||
		  (state.currentQuiz === quizzes.length - 1 &&
			state.gameStatus === GameStatus.VALIDATED)
	  ),
	  lifePoints,
	  score: 0,
	  currentQuiz: 0,
	});
  
	const actions = {
	  nextQuiz() {
		state.gameStatus = GameStatus.DEFAULT;
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
		state.gameStatus = GameStatus.DEFAULT;
		state.gameStarted = true;
		shuffle(quizzes);
	  },
	  reset() {
		state.gameStatus = GameStatus.RESET;
		state.gameStarted = false;
		state.lifePoints = lifePoints;
		state.score = 0;
		state.currentQuiz = 0;
	  },
	  restart() {
		this.reset();
		this.startGame();
	  },
	};
  
	return { state, actions };
  };

  export default useGameStore;