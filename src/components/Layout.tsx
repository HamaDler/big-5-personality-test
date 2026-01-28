import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart3, Info, Leaf } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/test', label: 'Assessment', icon: FileText },
    { path: '/results', label: 'Results', icon: BarChart3 },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zen-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-sage-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
                <Leaf className="w-5 h-5 text-sage-600" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-semibold text-lg text-sage-800">
                  Big Five
                </span>
                <span className="text-sage-500 text-sm block -mt-1">
                  Personality Test
                </span>
              </div>
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
                      flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${
                        isActive
                          ? 'bg-sage-100 text-sage-800'
                          : 'text-warm-500 hover:text-sage-700 hover:bg-sage-50'
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
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-sage-100 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-sage-400" />
              <p className="text-sm text-warm-500">
                Based on the IPIP-NEO-120 • Public Domain
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-warm-500">
              <Link
                to="/about"
                className="hover:text-sage-600 transition-colors"
              >
                About
              </Link>
              <span className="text-sage-300">•</span>
              <a
                href="https://ipip.ori.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sage-600 transition-colors"
              >
                IPIP
              </a>
            </div>
          </div>
          <p className="text-xs text-warm-400 text-center mt-4 max-w-xl mx-auto">
            This assessment is for educational and self-reflection purposes
            only. It is not a clinical diagnosis tool.
          </p>
        </div>
      </footer>
    </div>
  );
}
