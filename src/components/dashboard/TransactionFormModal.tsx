import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { Transaction, predefinedCategories, TransactionType } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { format } from 'date-fns';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

export const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ 
  isOpen, 
  onClose, 
  transactionToEdit 
}) => {
  const { addTransaction, editTransaction } = useDashboard();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category: predefinedCategories[0],
    type: 'expense' as TransactionType,
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        description: transactionToEdit.description,
        amount: transactionToEdit.amount.toString(),
        date: transactionToEdit.date,
        category: transactionToEdit.category,
        type: transactionToEdit.type,
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        category: predefinedCategories[0],
        type: 'expense',
      });
    }
  }, [transactionToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      type: formData.type,
    };

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select 
              value={formData.type} 
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as TransactionType }))}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input 
              type="date" 
              required
              value={formData.date} 
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input 
            required 
            placeholder="What was this for?" 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input 
              required 
              type="number" 
              min="0.01" 
              step="0.01" 
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {predefinedCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
};
