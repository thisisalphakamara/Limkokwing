import React from 'react';
import { RegistrationSubmission } from '../types';

const ApprovalTimeline: React.FC<{ submission: RegistrationSubmission }> = ({ submission }) => {
  const steps = [
    { key: 'YEAR_LEADER', label: 'Year Leader', status: 'PENDING_YEAR_LEADER' },
    { key: 'FACULTY_ADMIN', label: 'Faculty Admin', status: 'PENDING_FACULTY_ADMIN' },
    { key: 'FINANCE', label: 'Finance', status: 'PENDING_FINANCE' },
    { key: 'REGISTRAR', label: 'Registrar', status: 'PENDING_REGISTRAR' },
  ];

  const statusOrder = [
    'PENDING_YEAR_LEADER',
    'PENDING_FACULTY_ADMIN',
    'PENDING_FINANCE',
    'PENDING_REGISTRAR',
    'APPROVED',
    'REJECTED',
  ];
  const currentIdx = statusOrder.indexOf(submission.status);

  function getStepState(idx: number) {
    if (submission.status === 'REJECTED') return 'rejected';
    if (idx < currentIdx) return 'approved';
    if (idx === currentIdx) {
      if (submission.status === 'APPROVED') return 'approved';
      return 'pending';
    }
    return 'waiting';
  }

  function getApprovalDate(role: string) {
    const entry = submission.approvalHistory?.find(h => h.role.replace(/\s/g, '').toUpperCase().includes(role));
    return entry ? new Date(entry.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold uppercase tracking-tight text-gray-800">Registration Status</h3>
        {submission.status === 'APPROVED' && (
          <span className="px-4 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest">
            Approved
          </span>
        )}
        {submission.status === 'REJECTED' && (
          <span className="px-4 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest">
            Rejected
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-black" style={{ marginLeft: '5%', marginRight: '5%' }} />
        <div className="flex items-center justify-between w-full relative">
          {steps.map((step, idx) => {
            const state = getStepState(idx);
            let icon, labelColor, statusText, dateText;
            if (state === 'approved') {
              icon = (
                <span className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl shadow-md border-4 border-white relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              );
              labelColor = 'text-green-700';
              statusText = <span className="text-green-700 font-bold">Approved</span>;
              dateText = getApprovalDate(step.label.replace(/\s/g, '').toUpperCase());
            } else if (state === 'pending') {
              icon = (
                <span className="w-10 h-10 rounded-full border-4 border-yellow-400 bg-yellow-50 flex items-center justify-center text-yellow-600 text-xl shadow-md relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                </span>
              );
              labelColor = 'text-yellow-700';
              statusText = <span className="text-yellow-700 font-bold">Pending</span>;
              dateText = null;
            } else {
              icon = (
                <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl shadow-md border-4 border-white relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                </span>
              );
              labelColor = 'text-gray-400';
              statusText = <span className="text-gray-400 font-bold">Waiting</span>;
              dateText = null;
            }
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center relative">
                {icon}
                <span className={`mt-3 text-sm font-bold uppercase ${labelColor}`}>{step.label}</span>
                <span className="text-xs mt-1">{statusText}</span>
                {dateText && <span className="text-[11px] text-gray-500">{dateText}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApprovalTimeline;
