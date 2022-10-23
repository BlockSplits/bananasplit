import Fuzz from "jest-fuzz";

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

  fuzz = { iterations: 10 };
  Fuzz.test("2 people", Fuzz.int({ min: 1, max: 1000000000 }), (a: number) => {
    const transaction: TransactionFormat[] = [
      { amount: a, description: "", participants: [1, 2], payer: 1 },
    ];
    const actual = getDebtAmounts(1, transaction);
    const expected = { "2": -a / 2 };
    expect(actual).toStrictEqual(expected);
  });

  test("Somewhat complex example with several transactions and participants", () => {
    const transactions: TransactionFormat[] = [
      { amount: 150, description: "Hotel", participants: [1, 2, 3], payer: 1 },
      { amount: 100, description: "Car", participants: [1, 2, 3, 4], payer: 4 },
      { amount: 100, description: "Food", participants: [3, 4], payer: 3 },
    ];

    const expectedResults = {
      1: {
        "2": -50,
        "3": -50,
        "4": 25,
      },
      2: {
        "1": 50,
        "4": 25,
      },
      3: {
        "1": 50,
        "4": -25,
      },
      4: {
        "1": -25,
        "2": -25,
        "3": 25,
      },
    };

    Object.entries(expectedResults).forEach((entries) => {
      const [k, v] = entries;
      const actual = getDebtAmounts(parseInt(k), transactions);
      const expected = v;
      expect(actual).toStrictEqual(expected);
    });
  });
});
