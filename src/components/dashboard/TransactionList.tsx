import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import { TransactionFormModal } from './TransactionFormModal';
import { Transaction, predefinedCategories } from '../../data/mockData';

export const TransactionList: React.FC = () => {
  const { transactions, role, deleteTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'all' || tx.type === filterType;
      const matchCategory = filterCategory === 'all' || tx.category === filterCategory;
      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, searchTerm, filterType, filterCategory]);

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="border-b bg-card pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Recent Transactions</CardTitle>
          {role === 'admin' && (
            <Button onClick={handleAdd} size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search descriptions..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {predefinedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 overflow-auto">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20">
            <Filter className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No transactions found matching your filters.</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                    {tx.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <h4 className="font-medium">{tx.description}</h4>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${tx.type === 'income' ? 'text-emerald-500' : ''}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatter.format(tx.amount)}
                  </span>
                  
                  {role === 'admin' && (
                    <div className="flex gap-1 bg-background border rounded-md opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(tx)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTransaction(tx.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <TransactionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTx} 
      />
    </Card>
  );
};
