
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface StudentAccountsListProps {
  accounts: User[];
}

const StudentAccountsList: React.FC<StudentAccountsListProps> = ({ accounts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState<string>('all');

  const studentAccounts = accounts.filter(acc => acc.role === UserRole.STUDENT);

  const faculties = Array.from(new Set(studentAccounts.map(acc => acc.faculty).filter(Boolean)));

  const filteredAccounts = studentAccounts.filter(acc => {
    const matchesSearch = !searchQuery ||
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.studentId && acc.studentId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFaculty = facultyFilter === 'all' || acc.faculty === facultyFilter;

    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-tight">Student Accounts</h2>
        <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">
          TOTAL: {studentAccounts.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Students" value={studentAccounts.length.toString()} />
        <StatCard label="Active Accounts" value={studentAccounts.length.toString()} />
        <StatCard label="Faculties" value={faculties.length.toString()} />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold uppercase tracking-widest">All Student Accounts</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-black text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="px-4 py-2 border border-black text-sm font-bold uppercase"
            >
              <option value="all">All Faculties</option>
              {faculties.map(faculty => (
                <option key={faculty} value={faculty}>{faculty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white border border-black overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Faculty</th>
                <th className="p-4">Program</th>
                <th className="p-4">National ID</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-100">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">
                    No student accounts found
                  </td>
                </tr>
              ) : (
                filteredAccounts.map(account => (
                  <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-bold">{account.studentId || 'N/A'}</td>
                    <td className="p-4 font-bold">{account.name}</td>
                    <td className="p-4 font-mono text-gray-600">{account.email}</td>
                    <td className="p-4">{account.faculty || 'N/A'}</td>
                    <td className="p-4 text-sm">{account.program || 'N/A'}</td>
                    <td className="p-4 font-mono">{account.nationalId || 'N/A'}</td>
                    <td className="p-4 text-right">
                      <span className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white p-6 border border-black">
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
    <p className="text-3xl font-black">{value}</p>
  </div>
);

export default StudentAccountsList;
