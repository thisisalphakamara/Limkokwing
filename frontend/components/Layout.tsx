
import React from 'react';
import { User, UserRole } from '../types';

export type ActivePage = 'dashboard' | 'profile' | 'accounts' | 'approvals' | 'notifications';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  notificationCount?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, activePage, onNavigate, notificationCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarVisible, setSidebarVisible] = React.useState(true);

  const handleNavigate = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black">
      {/* Mobile Header */}
      {user && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm rounded-b-xl">
          <div className="flex items-center space-x-3">
            <img src="/assets/limlogo.png" className="w-10 h-auto rounded-lg shadow" alt="Logo" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-gray-700">LIM Portal</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-lg bg-gray-50 shadow"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {user && mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Toggle Button */}
      {user && (
        <button
          className="fixed top-4 left-4 z-50 bg-black text-white px-3 py-2 rounded shadow-md md:hidden"
          onClick={() => setSidebarVisible(v => !v)}
        >
          {sidebarVisible ? 'Hide Menu' : 'Show Menu'}
        </button>
      )}

      {/* Sidebar */}
      {user && sidebarVisible && (
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-72 border-r border-gray-800 flex flex-col p-6 space-y-6 bg-black shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:transform-none
        `}>
          <div className="flex flex-col items-center">
            <div className="mb-2">
               <img src="/assets/limlogo.png" className="w-auto h-20 shadow" alt="Limkokwing University Logo" />
            </div>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto min-h-0">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-2">Main Menu</div>
            <NavItem 
              label="Dashboard" 
              active={activePage === 'dashboard'} 
              onClick={() => handleNavigate('dashboard')}
            />
            <NavItem 
              label="My Profile" 
              active={activePage === 'profile'}
              onClick={() => handleNavigate('profile')}
            />
            {(user.role === UserRole.REGISTRAR || user.role === UserRole.SYSTEM_ADMIN) && (
              <NavItem 
                label="Create Student Account" 
                active={activePage === 'accounts'}
                onClick={() => handleNavigate('accounts')}
              />
            )}
            {user.role === UserRole.REGISTRAR ? (
              <NavItem 
                label="Student Accounts" 
                active={activePage === 'approvals'}
                onClick={() => handleNavigate('approvals')}
              />
            ) : user.role !== UserRole.STUDENT && (
              <NavItem 
                label="Approvals" 
                active={activePage === 'approvals'}
                onClick={() => handleNavigate('approvals')}
              />
            )}
            <NavItem 
              label="Notifications" 
              active={activePage === 'notifications'}
              onClick={() => handleNavigate('notifications')}
              badge={notificationCount > 0 ? notificationCount : undefined}
            />
          </nav>
          <div className="pt-4 border-t border-gray-800">
            <div className="mb-2">
              <p className="text-xs font-extrabold uppercase tracking-tighter text-white">{user.name}</p>
              <p className="text-[10px] text-gray-400">{user.role}</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full py-2 border border-gray-700 hover:bg-white hover:text-black transition-all text-white text-xs font-extrabold uppercase tracking-widest rounded-lg"
            >
              Log Out
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col shadow-lg bg-white/80 backdrop-blur">
        {!user ? (
          <div className="flex-1">{children}</div>
        ) : (
          <>
            <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Hamburger menu for toggling sidebar */}
                <button
                  className="mr-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow border border-gray-300 flex items-center justify-center"
                  onClick={() => setSidebarVisible(v => !v)}
                  aria-label={sidebarVisible ? 'Hide menu' : 'Show menu'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                    {sidebarVisible ? (
                      // Hamburger icon
                      <g>
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </g>
                    ) : (
                      // Close (X) icon
                      <g>
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                      </g>
                    )}
                  </svg>
                </button>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-800"> <span className="font-black text-black">{user.role} Dashboard</span></h2>
              </div>
              <div className="flex items-center space-x-4 text-xs font-extrabold uppercase tracking-widest">
                {/* Notification bell icon */}
                <button
                  className="relative w-10 h-10 flex items-center justify-center"
                  aria-label="Notifications"
                  onClick={() => handleNavigate('notifications')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </button>
                {/* Avatar removed as requested */}
              </div>
            </header>
            <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
              {children}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

interface NavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left py-3 px-4 flex items-center justify-between transition-all ${active ? 'bg-white text-black' : 'text-white hover:bg-gray-800'}`}
  >
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className={`min-w-[20px] h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {badge > 99 ? '99+' : badge}
      </span>
    )}
  </button>
);

export default Layout;
