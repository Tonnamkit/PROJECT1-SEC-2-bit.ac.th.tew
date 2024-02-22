const INITIAL_LIFE_POINTS = 3;
const btnStyleCss =
  'border-4 border-none bg-downriver-50 rounded-3xl flex justify-center items-center shadow-lg text-color-default text-xl md:text-2xl p-2 md:py-6 w-full md:w-2/5 hover:bg-downriver-100 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 h-fit';
const textBoxStyleCss =
  'input input-bordered input-lg w-full border-4 border-none bg-downriver-50 rounded-3xl flex justify-center items-center shadow-lg text-color-default text-xl md:text-2xl p-2 md:py-6 w-full md:w-full hover:bg-downriver-100 pl-4';
const addOns = {
  dropExtraLifeRatio: 4,
};

const buttonStyles = Object.freeze({
  DEFAULT: btnStyleCss,
  CORRECT: btnStyleCss + ' bg-green-600 hover:bg-green-700 text-white',
  INCORRECT: btnStyleCss + ' bg-red-600 hover:bg-red-700 text-white',
});

const textBoxStyles = Object.freeze({
  DEFAULT: textBoxStyleCss,
  CORRECT: textBoxStyleCss + ' bg-green-600 hover:bg-green-700 text-white',
  INCORRECT: textBoxStyleCss + ' bg-red-600 hover:bg-red-700 text-white',
});

const expectedRangesWithMessages = [
  { lower: 0, upper: 25, message: 'เฟมผิดหวังในตัวคุณ' },
  { lower: 26, upper: 50, message: 'เฟมสนใจในตัวคุณ' },
  { lower: 51, upper: 75, message: 'เฟมรู้สึกดีกับคุณ' },
  { lower: 76, upper: 100, message: 'เฟมรู้สึกภูมิใจในตัวคุณ' },
];

export {
  addOns,
  expectedRangesWithMessages,
  INITIAL_LIFE_POINTS,
  buttonStyles,
  textBoxStyles,
};
