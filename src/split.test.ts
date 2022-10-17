import Fuzz from "jest-fuzz";

// Test getDebtAmount
import { getDebtAmounts, TransactionFormat } from "./split";

describe("Test Debt Amounts", () => {
  test("Trivial Case", () => {
    const actual = getDebtAmounts(1, []);
    const expected = {};
    expect(actual).toStrictEqual(expected);
  });

  Fuzz.test("2 people", Fuzz.int({ min: 0, max: 1000000000 }), (a: number) => {
    const transaction: TransactionFormat[] = [
      { amount: a, description: "", participants: [1, 2], payer: 1 },
    ];
    const actual = getDebtAmounts(1, transaction);
    const expected = a == 0 ? {} : { "2": -a / 2 };
    expect(actual).toStrictEqual(expected);
  });
});
