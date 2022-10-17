import Fuzz from "jest-fuzz";
import { string } from "jest-fuzz/dist/types/fuzzers";

// Test getDebtAmount
import { getDebtAmounts, TransactionFormat } from "./split";

declare global {
  var fuzz: { iterations: number };
}
fuzz = { iterations: 10 };

describe("Test Debt Amounts", () => {
  test("Trivial Case", () => {
    const actual = getDebtAmounts(1, []);
    const expected = {};
    expect(actual).toStrictEqual(expected);
  });

  test("Single transaction with zero amount", () => {
    const transaction: TransactionFormat[] = [
      { amount: 0, description: "", participants: [1, 2], payer: 1 },
    ];
    const actual = getDebtAmounts(1, transaction);
    const expected = {};
    expect(actual).toStrictEqual(expected);
  });

  global.fuzz.iterations;
  Fuzz.test("2 people", Fuzz.int({ min: 1, max: 1000000000 }), (a: number) => {
    const transaction: TransactionFormat[] = [
      { amount: a, description: "", participants: [1, 2], payer: 1 },
    ];
    const actual = getDebtAmounts(1, transaction);
    const expected = { "2": -a / 2 };
    expect(actual).toStrictEqual(expected);
  });
});
