import React from 'react';
import { RegistrationSubmission, RegistrationStatus } from '../../../types';
import { Table, Badge } from '../../ui';
import { truncateId, getStatusBadgeVariant } from '../../../utils';

interface SubmissionsTableProps {
  submissions: RegistrationSubmission[];
  onRowClick: (submission: RegistrationSubmission) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ submissions, onRowClick }) => {
  const columns = [
    {
      header: 'Ref ID',
      accessor: (row: RegistrationSubmission) => (
        <span className="font-mono">#{truncateId(row.id)}</span>
      )
    },
    {
      header: 'Student',
      accessor: (row: RegistrationSubmission) => (
        <span className="font-medium">{row.studentName}</span>
      )
    },
    {
      header: 'Faculty',
      accessor: (row: RegistrationSubmission) => (
        <span className="text-gray-500">{row.faculty}</span>
      )
    },
    {
      header: 'Status',
      accessor: (row: RegistrationSubmission) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      accessor: () => (
        <button className="text-xs font-bold uppercase underline hover:no-underline">
          View Details
        </button>
      ),
      className: 'text-right'
    }
  ];

  return (
    <Table
      columns={columns}
      data={submissions}
      onRowClick={onRowClick}
      emptyMessage="No registrations found"
      headerClassName="bg-gray-100"
    />
  );
};

export default SubmissionsTable;
