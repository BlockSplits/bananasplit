export type TransactionFormat = {
  readonly amount: number;
  readonly description: string;
  readonly participants: number[];
  readonly payer: number;
};

// const transactions: TransactionFormat[] = [
//   { amount: 150, description: "Hotel", participants: [1, 2, 3], payer: 1 },
//   { amount: 100, description: "Car", participants: [1, 2, 3, 4], payer: 4 },
//   { amount: 100, description: "Food", participants: [3, 4], payer: 3 },
// ];

// const participants = new Set(
//   transactions.flatMap((array) => [...array.participants, array.payer])
// );

/**
 * Take list of transactions and get the debt from a single
 * @param {number} particularUser
 * @param {TransactionFormat[]} transactionList
 * @returns dict of money delta between the
 */
export function getDebtAmounts(
  particularUser: number,
  transactionList: TransactionFormat[]
) {
  //console.log(transactionList);
  const myTransactions = transactionList.filter(
    ({ participants, payer }) =>
      participants.includes(particularUser) || payer == particularUser
  );

  const trans = myTransactions
    .map(({ amount, participants, payer }) => {
      const eachShare = amount / participants.length;
      const subCharge = Object.fromEntries(
        participants
          .filter((user) => user != particularUser)
          .map((user) => [user, 0])
      );
      if (payer == particularUser) {
        participants.forEach((user) => {
          if (user !== particularUser) {
            subCharge[user] += eachShare * -1;
          }
        });
      } else if (participants.includes(particularUser)) {
        subCharge[payer] += eachShare;
      }
      return subCharge;
    })
    .reduce((stateMap, newMap) => {
      Object.entries(newMap).forEach((item) => {
        const [k, v] = item;
        stateMap[k] = stateMap[k] ? stateMap[k] + v : v;
      });
      return stateMap;
    }, {});

  return Object.fromEntries(Object.entries(trans).filter(([_, v]) => v !== 0));
}
