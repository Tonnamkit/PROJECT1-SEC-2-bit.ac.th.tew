const INITIAL_LIFE_POINTS = 3;

const addOns = {
  dropExtraLifeRatio: 5,
};

const buttonStyle = Object.freeze({
  PRIMARY: 'btn btn-outline',
  CORRECT: 'btn bg-green-600',
  INCORRECT: 'btn bg-red-700',
});

const expectedRangesWithMessages = [
  { lower: 0, upper: 25, message: 'เฟมผิดหวังในตัวคุณ' },
  { lower: 25, upper: 50, message: 'เฟมสนใจในตัวคุณ' },
  { lower: 50, upper: 75, message: 'เฟมรู้สึกดีกับคุณ' },
  { lower: 75, upper: 100, message: 'เฟมรู้สึกภูมิใจในตัวคุณ' },
];

export { addOns, expectedRangesWithMessages, INITIAL_LIFE_POINTS, buttonStyle };
