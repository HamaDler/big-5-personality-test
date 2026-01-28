import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart3, Info } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/test', label: 'Take Test', icon: FileText },
    { path: '/results', label: 'Results', icon: BarChart3 },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-openness via-conscientiousness to-agreeableness flex items-center justify-center">
                <span className="text-white font-bold text-sm">B5</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">Big Five Test</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Based on the IPIP-NEO-120 • Public Domain
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link to="/about" className="hover:text-gray-700 transition-colors">
                About
              </Link>
              <span>•</span>
              <a 
                href="https://ipip.ori.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors"
              >
                IPIP
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            This assessment is for educational and self-reflection purposes only. 
            It is not a clinical diagnosis tool.
          </p>
        </div>
      </footer>
    </div>
  );
}
