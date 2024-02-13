const INITIAL_LIFE_POINTS = 3;
const btnStyleCss =
  'border-4 border-none bg-golden-sand-50 rounded-3xl flex justify-center items-center shadow-lg text-color-default text-xl md:text-3xl p-4 md:p-8 w-full md:w-2/5 hover:bg-golden-sand-100 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 h-fit';
const textBoxStyleCss =
  'input input-bordered input-lg w-full text-color-default text-xl md:text-3xl p-4 md:p-8 hover:bg-golden-sand-100';

const addOns = {
  dropExtraLifeRatio: 5,
};

const buttonStyles = Object.freeze({
  DEFAULT: btnStyleCss,
  CORRECT: btnStyleCss + ' bg-green-700 hover:bg-green-800 text-white',
  INCORRECT: btnStyleCss + ' bg-red-700 hover:bg-red-800 text-white',
});

const textBoxStyles = Object.freeze({
  DEFAULT: textBoxStyleCss,
  CORRECT: textBoxStyleCss + ' bg-green-700 hover:bg-green-800 text-white',
  INCORRECT: textBoxStyleCss + ' bg-red-700 hover:bg-red-800 text-white',
});

const expectedRangesWithMessages = [
  { lower: 0, upper: 25, message: 'เฟมผิดหวังในตัวคุณ' },
  { lower: 25, upper: 50, message: 'เฟมสนใจในตัวคุณ' },
  { lower: 50, upper: 75, message: 'เฟมรู้สึกดีกับคุณ' },
  { lower: 75, upper: 100, message: 'เฟมรู้สึกภูมิใจในตัวคุณ' },
];

export {
  addOns,
  expectedRangesWithMessages,
  INITIAL_LIFE_POINTS,
  buttonStyles,
  textBoxStyles,
};
