import React from 'react';
import { RegistrationSubmission } from '../../../types';
import { calculateTotalCredits } from '../../../utils';

interface RegistrationConfirmationProps {
  submission: RegistrationSubmission;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({ submission }) => {
  const totalCredits = calculateTotalCredits(submission.modules);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-gray-800 mb-2">
            Registration Confirmed
          </h3>
          <p className="text-sm text-gray-600">
            Your semester registration has been successfully approved by all departments.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Student Name</p>
              <p className="text-sm font-bold text-gray-800">{submission.studentName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Faculty</p>
              <p className="text-sm font-bold text-gray-800">{submission.faculty}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Semester</p>
              <p className="text-sm font-bold text-gray-800">{submission.semester}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Academic Year</p>
              <p className="text-sm font-bold text-gray-800">{submission.academicYear}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Registered Modules</p>
            <div className="space-y-2">
              {submission.modules.map((mod) => (
                <div key={mod.id} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{mod.name}</p>
                    <p className="text-[10px] text-gray-500">{mod.code}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-600">{mod.credits} Credits</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <p className="text-sm font-bold text-gray-800">
                Total Credits: <span className="text-green-600">{totalCredits}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <p className="text-xs text-gray-500">
            You may now proceed to payment and course access. Check your email for further instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
