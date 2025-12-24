
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { FACULTIES } from '../constants';

interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: UserRole;
  targetUser?: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

interface SystemStats {
  totalUsers: number;
  activeStudents: number;
  staffMembers: number;
  pendingRegistrations: number;
  systemUptime: string;
  lastBackup: string;
}

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    action: 'ACCOUNT_CREATED',
    performedBy: 'John Registrar',
    role: UserRole.REGISTRAR,
    targetUser: 'Alex Rivera',
    details: 'Created student account with ID S1001',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    action: 'REGISTRATION_APPROVED',
    performedBy: 'Mary Leader',
    role: UserRole.YEAR_LEADER,
    targetUser: 'Alex Rivera',
    details: 'Approved registration #abc123 - Year Leader stage',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    ipAddress: '192.168.1.101',
  },
  {
    id: '3',
    action: 'LOGIN_SUCCESS',
    performedBy: 'Admin User',
    role: UserRole.SYSTEM_ADMIN,
    details: 'Successful login from admin panel',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ipAddress: '192.168.1.1',
  },
  {
    id: '4',
    action: 'LOGIN_FAILED',
    performedBy: 'unknown@email.com',
    role: UserRole.STUDENT,
    details: 'Failed login attempt - incorrect password (attempt 3/5)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    ipAddress: '203.45.67.89',
  },
  {
    id: '5',
    action: 'PASSWORD_CHANGED',
    performedBy: 'Alex Rivera',
    role: UserRole.STUDENT,
    details: 'Password changed successfully (first login)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ipAddress: '192.168.1.150',
  },
];

const MOCK_STATS: SystemStats = {
  totalUsers: 1247,
  activeStudents: 1089,
  staffMembers: 158,
  pendingRegistrations: 45,
  systemUptime: '99.9%',
  lastBackup: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
};

const SystemAdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'audit' | 'users' | 'settings'>('overview');
  const [auditFilter, setAuditFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
    if (auditFilter === 'all') return true;
    return log.action.toLowerCase().includes(auditFilter.toLowerCase());
  }).filter(log => {
    if (!searchQuery) return true;
    return (
      log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetUser?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionStyle = (action: string) => {
    if (action.includes('FAILED') || action.includes('REJECTED')) return 'bg-gray-600 text-white';
    if (action.includes('APPROVED') || action.includes('SUCCESS') || action.includes('CREATED')) return 'bg-black text-white';
    return 'bg-gray-300 text-black';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">System Administration</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system configuration and monitor activity</p>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-black pb-4">
        {(['overview', 'audit', 'users', 'settings'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${
              activeSection === section
                ? 'bg-black text-white border-black'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {activeSection === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Users" value={MOCK_STATS.totalUsers.toString()} />
            <StatCard label="Active Students" value={MOCK_STATS.activeStudents.toString()} />
            <StatCard label="Staff Members" value={MOCK_STATS.staffMembers.toString()} />
            <StatCard label="Pending Registrations" value={MOCK_STATS.pendingRegistrations.toString()} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-black p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">System Health</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50">
                  <span className="text-sm font-bold">System Uptime</span>
                  <span className="text-sm font-mono">{MOCK_STATS.systemUptime}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50">
                  <span className="text-sm font-bold">Last Backup</span>
                  <span className="text-sm font-mono">{formatTimestamp(MOCK_STATS.lastBackup)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50">
                  <span className="text-sm font-bold">Database Status</span>
                  <span className="px-2 py-1 bg-black text-white text-[10px] font-bold">HEALTHY</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black p-6">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full p-3 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors text-left">
                  → Run System Backup
                </button>
                <button className="w-full p-3 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors text-left">
                  → Clear Cache
                </button>
                <button className="w-full p-3 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors text-left">
                  → Export Audit Logs
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Users by Faculty</h4>
            <div className="space-y-3">
              {FACULTIES.map((faculty, index) => (
                <div key={faculty} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{faculty}</span>
                      <span className="text-xs font-mono">{[312, 287, 245, 198][index]}</span>
                    </div>
                    <div className="h-2 bg-gray-200">
                      <div 
                        className="h-full bg-black" 
                        style={{ width: `${[100, 92, 78, 63][index]}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'audit' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex space-x-2">
              {['all', 'login', 'account', 'registration', 'password'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAuditFilter(filter)}
                  className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                    auditFilter === filter
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-black text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="bg-white border border-black overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Performed By</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-gray-500">{formatTimestamp(log.timestamp)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[10px] font-bold ${getActionStyle(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-bold">{log.performedBy}</p>
                        <p className="text-gray-500">{log.role}</p>
                      </div>
                    </td>
                    <td className="p-4">{log.targetUser || '-'}</td>
                    <td className="p-4 font-mono text-gray-500">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs">
            <p className="text-gray-500">Showing {filteredLogs.length} of {MOCK_AUDIT_LOGS.length} logs</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors font-bold uppercase">
                Previous
              </button>
              <button className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors font-bold uppercase">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'users' && (
        <div className="space-y-6">
          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">User Management</h4>
            <p className="text-sm text-gray-500 mb-6">
              User accounts are created by the Registrar department. System Admins can view and manage existing accounts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                View All Users
              </button>
              <button className="p-4 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                Locked Accounts
              </button>
              <button className="p-4 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                Export User List
              </button>
            </div>
          </div>

          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Login Attempt Limits</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200">
                <div>
                  <p className="text-sm font-bold">Maximum Login Attempts</p>
                  <p className="text-xs text-gray-500">Lock account after failed attempts</p>
                </div>
                <select className="px-4 py-2 border border-black text-sm">
                  <option>3 attempts</option>
                  <option>5 attempts</option>
                  <option>10 attempts</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200">
                <div>
                  <p className="text-sm font-bold">Lockout Duration</p>
                  <p className="text-xs text-gray-500">Time before account unlocks</p>
                </div>
                <select className="px-4 py-2 border border-black text-sm">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>Manual unlock only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Registration Settings</h4>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                <div>
                  <p className="text-sm font-bold">Registration Period Active</p>
                  <p className="text-xs text-gray-500">Allow students to submit registrations</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                <div>
                  <p className="text-sm font-bold">Email Notifications</p>
                  <p className="text-xs text-gray-500">Send email on registration status changes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                <div>
                  <p className="text-sm font-bold">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Send SMS on registration status changes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 border-2 border-black" />
              </label>
            </div>
          </div>

          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Academic Year Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Academic Year</label>
                <select className="w-full p-3 border border-black text-sm">
                  <option>2024/2025</option>
                  <option>2025/2026</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Semester</label>
                <select className="w-full p-3 border border-black text-sm">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Summer Session</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black p-6">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Security Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200">
                <div>
                  <p className="text-sm font-bold">Password Expiry</p>
                  <p className="text-xs text-gray-500">Force password change after period</p>
                </div>
                <select className="px-4 py-2 border border-black text-sm">
                  <option>Never</option>
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200">
                <div>
                  <p className="text-sm font-bold">Session Timeout</p>
                  <p className="text-xs text-gray-500">Auto logout after inactivity</p>
                </div>
                <select className="px-4 py-2 border border-black text-sm">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Save All Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white p-6 border border-black">
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
    <p className="text-3xl font-black">{value}</p>
  </div>
);

export default SystemAdminDashboard;
