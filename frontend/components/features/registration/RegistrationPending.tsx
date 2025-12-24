import React from 'react';

const RegistrationPending: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-yellow-50 p-8 text-center border-b border-yellow-100">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-yellow-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2">
          Registration In Progress
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Your registration has been submitted and is currently being reviewed. Please check back regularly for updates.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm font-bold text-gray-900 mb-1">Registration Document</p>
          <p className="text-xs text-gray-500 max-w-xs">
            Your official registration confirmation document will be available for download here once all approvals are complete.
          </p>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-600 leading-relaxed">
            You can track the approval status of your application in the timeline above. You will receive an email notification when your registration is fully approved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPending;
