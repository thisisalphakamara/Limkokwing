
import React, { useState, useEffect } from 'react';
import Layout, { ActivePage } from './components/Layout';
import StudentRegistration from './components/StudentRegistration';
import StaffDashboard from './components/StaffDashboard';
import AccountCreation from './components/AccountCreation';
import ProfilePage from './components/ProfilePage';
import NotificationsPage from './components/NotificationsPage';
import SystemAdminDashboard from './components/SystemAdminDashboard';
import ChangePasswordModal from './components/ChangePasswordModal';
import StudentAccountsList from './components/StudentAccountsList';
import { User, UserRole, RegistrationSubmission, RegistrationStatus } from './types';

// Mock Initial User for Demo
const DEFAULT_STUDENT: User = {
  id: 'S1001',
  name: 'Alex Rivera',
  email: 'alex@limkokwing.edu.my',
  role: UserRole.STUDENT,
  faculty: 'Faculty of Information Technology',
  isFirstLogin: false,
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([]);
  const [createdAccounts, setCreatedAccounts] = useState<User[]>([]);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  // Load mock data on start
  useEffect(() => {
    const saved = localStorage.getItem('registrations');
    if (saved) setSubmissions(JSON.parse(saved));
    
    const savedAccounts = localStorage.getItem('createdAccounts');
    if (savedAccounts) setCreatedAccounts(JSON.parse(savedAccounts));
  }, []);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('createdAccounts', JSON.stringify(createdAccounts));
  }, [createdAccounts]);

  // Check lockout status
  useEffect(() => {
    if (lockoutTime) {
      const remaining = lockoutTime - Date.now();
      if (remaining <= 0) {
        setIsLocked(false);
        setLockoutTime(null);
        setLoginAttempts(0);
      } else {
        const timer = setTimeout(() => {
          setIsLocked(false);
          setLockoutTime(null);
          setLoginAttempts(0);
        }, remaining);
        return () => clearTimeout(timer);
      }
    }
  }, [lockoutTime]);

  const handleLogin = (role: UserRole) => {
    // In a real app, this would verify credentials.
    // For demo, we simulate different roles.
    const isFirstLogin = false;
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 5).toUpperCase(),
      name: role === UserRole.STUDENT ? 'Alex Rivera' : `Officer ${role.split(' ')[0]}`,
      email: `${role.toLowerCase().replace(' ', '.')}@limkokwing.edu.my`,
      role: role,
      faculty: role === UserRole.REGISTRAR || role === UserRole.FINANCE_OFFICER || role === UserRole.SYSTEM_ADMIN ? undefined : 'Faculty of Information Technology',
      studentId: role === UserRole.STUDENT ? 'LIM240001' : undefined,
      isFirstLogin: isFirstLogin,
    };
    setUser(mockUser);
    setLoginAttempts(0);
    
    if (isFirstLogin) {
      setShowFirstLoginModal(true);
    }
  };

  const handleLoginWithCredentials = () => {
    if (isLocked) {
      const remainingSeconds = Math.ceil((lockoutTime! - Date.now()) / 1000);
      alert(`Account temporarily locked. Please try again in ${remainingSeconds} seconds.`);
      return;
    }
    
    if (!selectedRole) return alert('Please select a role to login');
    if (!loginEmail || !loginPassword) return alert('Please enter email and password');
    
    // TODO: Implement real authentication when backend is ready
    // For now, accept any email and password for frontend development
    
    // Successful login
    handleLogin(selectedRole);
    // reset login form
    setSelectedRole('');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegistrationSubmit = (submission: RegistrationSubmission) => {
    setSubmissions([submission, ...submissions]);
  };

  const updateSubmissionStatus = (id: string, newStatus: RegistrationStatus) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleApprove = (id: string) => {
    if (!user) return;
    const sub = submissions.find(s => s.id === id);
    if (!sub) return;

    let nextStatus = sub.status;
    if (user.role === UserRole.YEAR_LEADER) nextStatus = RegistrationStatus.PENDING_FACULTY_ADMIN;
    else if (user.role === UserRole.FACULTY_ADMIN) nextStatus = RegistrationStatus.PENDING_FINANCE;
    else if (user.role === UserRole.FINANCE_OFFICER) nextStatus = RegistrationStatus.PENDING_REGISTRAR;
    else if (user.role === UserRole.REGISTRAR) nextStatus = RegistrationStatus.APPROVED;

    // Update with approval history
    setSubmissions(submissions.map(s => 
      s.id === id 
        ? { 
            ...s, 
            status: nextStatus,
            approvalHistory: [
              ...s.approvalHistory,
              {
                role: user.role,
                approvedBy: user.name,
                date: new Date().toISOString(),
              }
            ]
          } 
        : s
    ));
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const handleFirstLoginPasswordChange = () => {
    if (user) {
      setUser({ ...user, isFirstLogin: false });
      setShowFirstLoginModal(false);
    }
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
  };

  const handleReject = (id: string) => {
    updateSubmissionStatus(id, RegistrationStatus.REJECTED);
    alert(`Registration ${id.slice(0, 8)} has been rejected. Student notified.`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="flex flex-col items-center">
             <div className="p-4">
               <img src="/assets/limlogo.png" className="w-48 h-auto" alt="Limkokwing University" />
             </div>
          </div>

          <div className="bg-white border border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
            <h2 className="text-lg font-bold uppercase mb-6 tracking-widest border-b border-black pb-4">Student Registration Portal</h2>
            <div className="space-y-4 text-left">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Welcome to Limkokwing University Student Registration Portal</p>
              <div className="relative">
                <select 
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="appearance-none w-full p-4 border border-black text-xs font-bold uppercase tracking-widest bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Select a role to login</option>
                  {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

              {selectedRole ? (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="you@limkokwing.edu.my"
                      className="w-full p-3 border border-black text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest">Password</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full p-3 border border-black text-xs"
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleLoginWithCredentials}
                      disabled={isLocked}
                      className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLocked ? 'Account Locked' : 'Login'}
                    </button>
                    {loginAttempts > 0 && !isLocked && (
                      <p className="text-[10px] text-gray-500 text-center mt-2">
                        {5 - loginAttempts} login attempts remaining
                      </p>
                    )}
                    {isLocked && lockoutTime && (
                      <p className="text-[10px] text-gray-500 text-center mt-2">
                        Please wait before trying again
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 text-[10px] text-gray-400 uppercase font-bold text-center">
              Student accounts are created by Registrar Department only.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const studentSubmission = submissions.find(s => s.studentId === user.id) || null;

  const renderContent = () => {
    if (!user) return null;

    // Profile page for all users
    if (activePage === 'profile') {
      return <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />;
    }

    // Notifications page for all users
    if (activePage === 'notifications') {
      return <NotificationsPage userRole={user.role} />;
    }

    // Account creation for Registrar and System Admin
    if (activePage === 'accounts' && (user.role === UserRole.REGISTRAR || user.role === UserRole.SYSTEM_ADMIN)) {
      return <AccountCreation onAccountCreated={(newUser) => setCreatedAccounts([...createdAccounts, newUser])} />;
    }

    // Student Accounts view for Registrar
    if (activePage === 'approvals' && user.role === UserRole.REGISTRAR) {
      return <StudentAccountsList accounts={createdAccounts} />;
    }

    // Student dashboard
    if (user.role === UserRole.STUDENT) {
      return (
        <StudentRegistration 
          user={user} 
          onSubmitted={handleRegistrationSubmit}
          existingSubmission={studentSubmission}
        />
      );
    }

    // System Admin dashboard
    if (user.role === UserRole.SYSTEM_ADMIN) {
      return <SystemAdminDashboard />;
    }

    // Staff dashboard (Year Leader, Faculty Admin, Finance)
    if (activePage === 'dashboard' || (activePage === 'approvals' && user.role !== UserRole.REGISTRAR)) {
      return (
        <StaffDashboard 
          user={user} 
          submissions={submissions}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      );
    }

    return null;
  };

  return (
    <Layout 
      user={user} 
      onLogout={() => {
        setUser(null);
        setActivePage('dashboard');
      }}
      activePage={activePage}
      onNavigate={handleNavigate}
      notificationCount={1}
    >
      {showFirstLoginModal && user.role !== UserRole.STUDENT && (
        <ChangePasswordModal
          isFirstLogin={true}
          onPasswordChanged={handleFirstLoginPasswordChange}
        />
      )}
      {renderContent()}
    </Layout>
  );
};

export default App;
