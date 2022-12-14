import * as utils from './utils';

const coordinatePairs1 = ["0,1.234 3,8 4,3 10,13"];
const splitCoordinates1 = coordinatePairs1[0].split(' ');

const coordinatePairs2 = ["5,5 2,6 7,7 8,8 0,1 5,1111 5,454545.4545 12323,12 23,2434 3434,45054"]
const splitCoordinates2 = coordinatePairs2[0].split(' ');

const validationValid = "0,1.234 3,8 4,3 10,13";
const validationValidTwo = "0,1.234 3,8";
const validationErrorLetters = "0a,1.234 3,8 4,3 10,13";
const validationErrorSpace = "0, 1.234 3,8 4,3 10,13";
const validationErrorMissingNum = "0,1.234 3,8 4, 10,13";
const validationErrorDuplicateComma = "0,,1.234 3,8 4,3 10,13";

it('Validates coordinates', () => {
  expect(utils.validation(validationValid)).toEqual(true);
  expect(utils.validation(validationValidTwo)).toEqual(true);
  expect(utils.validation(validationErrorLetters)).toEqual(false);
  expect(utils.validation(validationErrorSpace)).toEqual(false);
  expect(utils.validation(validationErrorMissingNum)).toEqual(false);
  expect(utils.validation(validationErrorDuplicateComma)).toEqual(false);
});

it('Calculates the closest pair', () => {
  expect(utils.closestPairCalc(splitCoordinates1)).toEqual(
    {
      closestPair: ["0.0", "1.2", "4.0", "3.0"],
      distance: 4.37
    }
  );
  expect(utils.closestPairCalc(splitCoordinates2)).toEqual(
    {
      closestPair: ["7.0", "7.0", "8.0", "8.0"],
      distance: 1.41
    }
  );
});
it('Calculates the furthest pair', () => {
  expect(utils.furthestPairCalc(splitCoordinates1)).toEqual(
    {
      furthestPair: ["0.0", "1.2", "10.0", "13.0"],
      distance: 15.44
    }
  );
  expect(utils.furthestPairCalc(splitCoordinates2)).toEqual(
    {
      furthestPair: ["5.0", "454545.5", "12323.0", "12.0"],
      distance: 454700.33
    }
  );
});
it('Calculates the average distance between all pair', () => {
  expect(utils.averageDistanceCalc(splitCoordinates1)).toEqual(8.76);
  expect(utils.averageDistanceCalc(splitCoordinates2)).toEqual(100147.47);

});
