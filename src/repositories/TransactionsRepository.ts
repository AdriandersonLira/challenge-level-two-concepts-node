import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filterIncome = this.transactions.filter(i => i.type === 'income');
    const filterOutcome = this.transactions.filter(i => i.type === 'outcome');

    const income = filterIncome.reduce((accum, curr) => accum + curr.value, 0);
    const outcome = filterOutcome.reduce(
      (accum, curr) => accum + curr.value,
      0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const createTransaction = new Transaction({ title, value, type });

    this.transactions.push(createTransaction);

    return createTransaction;
  }
}

export default TransactionsRepository;
