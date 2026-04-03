import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';

export const Insights: React.FC = () => {
  const { transactions } = useDashboard();

  const insights = useMemo(() => {
    if (transactions.length === 0) return null;

    const expensesByCategory = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {} as Record<string, number>);

    let highestCategory = '';
    let highestAmount = 0;

    Object.entries(expensesByCategory).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    });
    
    return {
      highestCategory,
      highestAmount
    };
  }, [transactions]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card className="flex-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights && insights.highestCategory ? (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/20 p-2 mt-1">
                <TrendingDown className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Top Spending Category</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You have spent <span className="font-bold text-foreground">{formatter.format(insights.highestAmount)}</span> on <span className="font-semibold text-foreground">{insights.highestCategory}</span> recently.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-emerald-500/20 p-2 mt-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Income Stream</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep track of your income entries to ensure your balance trend stays positive over time.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Add more transactions to unlock insights.</p>
        )}
      </CardContent>
    </Card>
  );
};
