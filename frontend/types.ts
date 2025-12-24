
export enum UserRole {
  STUDENT = 'Student',
  YEAR_LEADER = 'Year Leader',
  FACULTY_ADMIN = 'Faculty Admin',
  FINANCE_OFFICER = 'Finance Officer',
  REGISTRAR = 'Registrar',
  SYSTEM_ADMIN = 'System Admin'
}

export type Faculty = 'Faculty of Design Innovation' | 'Faculty of Multimedia Creativity' | 'Faculty of Information Technology' | 'Faculty of Business Management';

export enum RegistrationStatus {
  NOT_STARTED = 'Not Started',
  PENDING_YEAR_LEADER = 'Pending Year Leader',
  PENDING_FACULTY_ADMIN = 'Pending Faculty Admin',
  PENDING_FINANCE = 'Pending Finance',
  PENDING_REGISTRAR = 'Pending Registrar',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  faculty?: Faculty;
  program?: string;
  studentId?: string;
  nationalId?: string;
  isFirstLogin: boolean;
  phoneNumber?: string;
  sponsorType?: 'Self' | 'Parent' | 'Scholarship' | 'Other';
}

export interface Module {
  id: string;
  name: string;
  code: string;
  credits: number;
}

export interface RegistrationSubmission {
  id: string;
  studentId: string;
  studentName: string;
  faculty: Faculty;
  semester: string;
  academicYear: string;
  modules: Module[];
  status: RegistrationStatus;
  submittedAt: string;
  approvalHistory: {
    role: UserRole;
    approvedBy: string;
    date: string;
    comments?: string;
  }[];
}
