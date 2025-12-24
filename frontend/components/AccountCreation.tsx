
import React, { useState } from 'react';
import { User, UserRole, Faculty } from '../types';
import { FACULTIES, PROGRAMS_BY_FACULTY } from '../constants';

interface AccountCreationProps {
  onAccountCreated: (user: User) => void;
}

const AccountCreation: React.FC<AccountCreationProps> = ({ onAccountCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [faculty, setFaculty] = useState<Faculty>(FACULTIES[0]);
  const [program, setProgram] = useState<string>(PROGRAMS_BY_FACULTY[FACULTIES[0]][0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const generateStudentId = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `LIM${year}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId) {
      alert('Please enter a Student ID');
      return;
    }

    if (!program) {
      alert('Please select a program');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: UserRole.STUDENT,
      faculty,
      program,
      studentId,
      nationalId,
      isFirstLogin: false,
    };
    
    setCreatedUser(newUser);
    setShowSuccess(true);
    onAccountCreated(newUser);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setStudentId('');
    setNationalId('');
    setFaculty(FACULTIES[0]);
    setProgram(PROGRAMS_BY_FACULTY[FACULTIES[0]][0]);
    setShowSuccess(false);
    setCreatedUser(null);
  };

  const handleFacultyChange = (newFaculty: Faculty) => {
    setFaculty(newFaculty);
    setProgram(PROGRAMS_BY_FACULTY[newFaculty][0]);
  };

  if (showSuccess && createdUser) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-black">
        <div className="p-8 border-b border-black bg-black text-white text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <h3 className="text-2xl font-black uppercase">Student Account Created Successfully</h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Full Name</p>
                <p className="text-sm font-bold">{createdUser.name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
                <p className="text-sm font-mono">{createdUser.email}</p>
              </div>
              {createdUser.studentId && (
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Student ID</p>
                  <p className="text-sm font-mono font-bold">{createdUser.studentId}</p>
                </div>
              )}
              {createdUser.faculty && (
                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Faculty</p>
                  <p className="text-sm font-bold">{createdUser.faculty}</p>
                </div>
              )}
              {createdUser.program && (
                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Program</p>
                  <p className="text-sm font-bold">{createdUser.program}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border border-black bg-gray-50">
            <p className="text-xs font-bold uppercase mb-2">Login Credentials Generated</p>
            <p className="text-sm text-gray-600 mb-3">
              A secure temporary password has been generated and will be sent to the student's email address. 
              The student will use these credentials to login to the student dashboard for course registration.
            </p>
            <div className="bg-white p-3 border border-gray-300">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Login Instructions</p>
              <p className="text-xs text-gray-600">
                The student can login at the portal using their email and temporary password. 
                They will be required to change their password upon first login.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={resetForm}
              className="flex-1 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Create Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-black p-10">
      <h3 className="text-2xl font-black uppercase mb-8 border-b border-black pb-4">Create Student Account</h3>
      <p className="text-sm text-gray-500 mb-6">
        Create a new student account with login credentials. The student will receive their credentials via email and can use them to access the student dashboard for course registration.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">Full Name</label>
          <input 
            type="text" required value={name} onChange={e => setName(e.target.value)}
            className="w-full p-3 border border-black outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">Institutional Email</label>
          <input 
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="name@limkokwing.edu.my"
            className="w-full p-3 border border-black outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">National ID / Passport</label>
          <input 
            type="text" required value={nationalId} onChange={e => setNationalId(e.target.value)}
            className="w-full p-3 border border-black outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">Designated Faculty</label>
          <select 
            value={faculty} onChange={e => handleFacultyChange(e.target.value as Faculty)}
            className="w-full p-3 border border-black"
          >
            {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">Designated Program</label>
          <select 
            value={program} 
            onChange={e => setProgram(e.target.value)}
            required
            className="w-full p-3 border border-black"
          >
            {PROGRAMS_BY_FACULTY[faculty].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest">Student ID</label>
          <div className="flex space-x-3">
            <input 
              type="text" 
              required 
              value={studentId} 
              onChange={e => setStudentId(e.target.value.toUpperCase())}
              placeholder="e.g., LIM240001"
              className="flex-1 p-3 border border-black outline-none focus:ring-1 focus:ring-black font-mono"
            />
            <button
              type="button"
              onClick={() => setStudentId(generateStudentId())}
              className="px-4 py-3 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="pt-6">
          <button type="submit" className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Create Student Account & Generate Credentials
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountCreation;
