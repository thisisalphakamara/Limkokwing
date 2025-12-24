import React from 'react';
import { StatCard } from '../../ui';

interface DashboardStats {
  pendingTasks: number;
  totalSubmissions: number;
  approved: number;
  rejected: number;
}

interface DashboardHeaderProps {
  stats: DashboardStats;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Pending Tasks" value={stats.pendingTasks} />
      <StatCard label="Total Submissions" value={stats.totalSubmissions} />
      <StatCard label="Approved" value={stats.approved} />
      <StatCard label="Rejected" value={stats.rejected} />
    </div>
  );
};

export default DashboardHeader;
