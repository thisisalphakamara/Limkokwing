import React from 'react';
import { RegistrationSubmission } from '../../../types';
import { calculateTotalCredits } from '../../../utils';

interface RegistrationConfirmationProps {
  submission: RegistrationSubmission;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({ submission }) => {
  const totalCredits = calculateTotalCredits(submission.modules);

  const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div>
      <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900 break-words">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-green-50 p-8 text-center border-b border-green-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2">
          Registration Confirmed
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Your semester registration has been successfully approved. You are now officially enrolled for the upcoming semester.
        </p>
      </div>
      
      <div className="p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-gray-100">
          <InfoItem label="Student Name" value={submission.studentName} />
          <InfoItem label="Faculty" value={submission.faculty} />
          <InfoItem label="Semester" value={submission.semester} />
          <InfoItem label="Academic Year" value={submission.academicYear} />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black uppercase tracking-widest text-gray-900">Registered Modules</p>
            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md">
              {submission.modules.length} Modules
            </span>
          </div>
          
          <div className="space-y-3">
            {submission.modules.map((mod) => (
              <div key={mod.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900">{mod.name}</p>
                  <p className="text-[10px] font-mono text-gray-500 mt-0.5">{mod.code}</p>
                </div>
                <p className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                  {mod.credits} CR
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Total Credits</p>
              <p className="text-2xl font-black text-gray-900">{totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            Please proceed to the Finance Department if you have any outstanding payments. Course materials will be available in the Learning Management System within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
