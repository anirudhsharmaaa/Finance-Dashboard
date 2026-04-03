import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, initialTransactions } from '../data/mockData';

export type Role = 'viewer' | 'admin';
export type Theme = 'light' | 'dark';

interface DashboardContextType {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updated: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dashboard_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('dashboard_role');
    return (saved as Role) || 'viewer';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('dashboard_theme');
    if (saved) return saved as Theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('dashboard_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dashboard_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('dashboard_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    if (role !== 'admin') return;
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const editTransaction = (id: string, updated: Omit<Transaction, 'id'>) => {
    if (role !== 'admin') return;
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  };

  const deleteTransaction = (id: string) => {
    if (role !== 'admin') return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        role,
        theme,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setRole,
        toggleTheme,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
