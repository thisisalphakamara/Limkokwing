import React from 'react';
import { User, Module } from '../../../types';
import { Button } from '../../ui';
import { formatDate } from '../../../utils';

interface ReviewStepProps {
  user: User;
  semester: string;
  academicYear: string;
  phoneNumber: string;
  sponsorType: string;
  selectedModules: Module[];
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  user,
  semester,
  academicYear,
  phoneNumber,
  sponsorType,
  selectedModules,
  onBack,
  onSubmit
}) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="bg-gray-50 p-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-[11px] uppercase font-bold text-gray-500">Student Name</p>
          <p className="font-bold">{user.name}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Student ID</p>
          <p className="font-bold">{user.studentId || user.id}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Email Address</p>
          <p className="font-bold">{user.email}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Assigned Faculty</p>
          <p className="font-bold">{user.faculty}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Designated Program</p>
          <p className="font-bold">{user.program || 'Not assigned'}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Enrollment Date</p>
          <p className="font-bold">{formatDate(new Date().toISOString())}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Phone Number</p>
          <p className="font-bold">{phoneNumber}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Sponsor Type</p>
          <p className="font-bold">{sponsorType}</p>
          <p className="text-[11px] uppercase font-bold text-gray-500">Semester</p>
          <p className="font-bold">{semester} - {academicYear}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase font-bold">Selected Modules ({selectedModules.length})</p>
        <div className="border border-black divide-y divide-black">
          {selectedModules.map((mod) => (
            <div key={mod.id} className="p-2 flex justify-between items-center">
              <p className="text-sm font-bold">{mod.code} - {mod.name}</p>
              <p className="text-sm font-bold">{mod.credits} Credits</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Modify</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ReviewStep;
