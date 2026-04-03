import { Moon, Sun, Wallet } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { role, setRole, theme, toggleTheme } = useDashboard();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6 mx-auto justify-between">
        <div className="flex gap-2 items-center">
          <div className="relative hidden sm:inline-flex overflow-hidden rounded-lg p-[2px]">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_60%,#ec4899_75%,#8b5cf6_85%,#3b82f6_100%)] blur-[2px]" />
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-md bg-background px-4 py-1 font-bold tracking-tight">
              Made by Anirudh Sharma
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setRole('viewer')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${role === 'viewer' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${role === 'admin' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Admin
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-all" />
              ) : (
                <Moon className="h-5 w-5 transition-all" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
