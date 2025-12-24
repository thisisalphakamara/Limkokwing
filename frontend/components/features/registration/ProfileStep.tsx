import React from 'react';
import { User } from '../../../types';
import { Input, Select, Button } from '../../ui';
import { formatDate } from '../../../utils';

interface ProfileStepProps {
  user: User;
  semester: string;
  academicYear: string;
  phoneNumber: string;
  sponsorType: string;
  onSemesterChange: (semester: string) => void;
  onPhoneNumberChange: (phone: string) => void;
  onSponsorTypeChange: (type: string) => void;
  onNext: () => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({
  user,
  semester,
  academicYear,
  phoneNumber,
  sponsorType,
  onSemesterChange,
  onPhoneNumberChange,
  onSponsorTypeChange,
  onNext
}) => {
  const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    value: `Semester ${i + 1}`,
    label: `Semester ${i + 1}`
  }));

  const sponsorOptions = [
    { value: 'Self', label: 'Self' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Scholarship', label: 'Scholarship' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-3 bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500">
          Please confirm your profile details before proceeding. Contact the Registrar if any information is incorrect.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Student Name</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200">{user.name}</div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Student ID</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200 font-mono font-bold">
            {user.studentId || user.id}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200">{user.email}</div>
        </div>
        <div>
          <Input
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder="+232 88 000 - 000"
            className="bg-gray-50"
          />
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Assigned Faculty</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200 font-bold">{user.faculty}</div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Designated Program</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200 font-bold">
            {user.program || 'Not assigned'}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Enrollment Date</p>
          <div className="py-2 px-3 bg-gray-50 border border-gray-200">{formatDate(new Date().toISOString())}</div>
        </div>
        <div>
          <Select
            label="Sponsor Type"
            value={sponsorType}
            onChange={(e) => onSponsorTypeChange(e.target.value)}
            options={sponsorOptions}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Academic Semester"
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value)}
          options={semesterOptions}
        />
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Academic Year</p>
          <select
            className="w-full py-2 px-3 border border-black text-sm"
            value={academicYear}
            disabled
          >
            <option>Year 1</option>
            <option>Year 2</option>
            <option>Year 3</option>
            <option>Year 4</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
};

export default ProfileStep;
