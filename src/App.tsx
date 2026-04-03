import { Header } from './components/layout/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { TransactionList } from './components/dashboard/TransactionList';
import { ChartsGroup } from './components/dashboard/ChartsGroup';
import { Insights } from './components/dashboard/Insights';
import { DashboardProvider } from './context/DashboardContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 space-y-8 animate-in fade-in transition-all duration-500">
        <SummaryCards />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <ChartsGroup />
            <Insights />
          </div>
          <div className="flex-1 lg:max-w-[500px] xl:max-w-[600px] flex">
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;
