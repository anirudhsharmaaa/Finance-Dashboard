export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export const predefinedCategories = [
  'Housing',
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Salary',
  'Investments',
  'Other',
];

export const initialTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2026-04-01',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary',
  },
  {
    id: 't2',
    date: '2026-04-02',
    amount: 1200,
    category: 'Housing',
    type: 'expense',
    description: 'Rent Payment',
  },
  {
    id: 't3',
    date: '2026-04-02',
    amount: 150,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity Bill',
  },
  {
    id: 't4',
    date: '2026-04-03',
    amount: 300,
    category: 'Food',
    type: 'expense',
    description: 'Groceries',
  },
  {
    id: 't5',
    date: '2026-04-03',
    amount: 50,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie night',
  },
];
