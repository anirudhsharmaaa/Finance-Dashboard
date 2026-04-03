import React, { useMemo } from 'react';
import { ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const SummaryCards: React.FC = () => {
  const { transactions } = useDashboard();

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
          acc.balance += curr.amount;
        } else {
          acc.expense += curr.amount;
          acc.balance -= curr.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter.format(balance)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter.format(income)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter.format(expense)}</div>
        </CardContent>
      </Card>
    </div>
  );
};
