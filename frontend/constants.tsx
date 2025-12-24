
import { Faculty, Module, UserRole, RegistrationStatus } from './types';

export const FACULTIES: Faculty[] = [
  'Faculty of Design Innovation',
  'Faculty of Multimedia Creativity',
  'Faculty of Information Technology',
  'Faculty of Business Management'
];

export const PROGRAMS_BY_FACULTY: Record<Faculty, string[]> = {
  'Faculty of Information Technology': [
    'BSc Software Engineering with Multimedia',
    'BSc Computer Science',
    'BSc Information Systems',
    'BSc Cybersecurity',
    'BSc Data Science and Analytics',
    'BSc Network Engineering',
    'BSc Mobile Computing'
  ],
  'Faculty of Design Innovation': [
    'BA Industrial Design',
    'BA Graphic Design',
    'BA Interior Architecture',
    'BA Product Design',
    'BA Fashion Design',
    'BA Visual Communication Design'
  ],
  'Faculty of Multimedia Creativity': [
    'BA Digital Film and Television',
    'BA Animation',
    'BA Game Design',
    'BA Interactive Multimedia',
    'BA Sound Design',
    'BA Broadcasting and Journalism'
  ],
  'Faculty of Business Management': [
    'BA Business Administration',
    'BA Marketing',
    'BA Finance and Banking',
    'BA International Business',
    'BA Entrepreneurship',
    'BA Human Resource Management',
    'BA Accounting'
  ]
};

export const MOCK_MODULES: Record<Faculty, Module[]> = {
  'Faculty of Information Technology': [
    { id: '1', name: 'Software Engineering', code: 'BIT201', credits: 4 },
    { id: '2', name: 'Database Systems', code: 'BIT202', credits: 4 },
    { id: '3', name: 'Web Development', code: 'BIT203', credits: 3 },
    { id: '4', name: 'Artificial Intelligence', code: 'BIT204', credits: 4 },
    { id: '5', name: 'Computer Networks', code: 'BIT205', credits: 4 },
    { id: '6', name: 'Mobile App Development', code: 'BIT206', credits: 3 }
  ],
  'Faculty of Design Innovation': [
    { id: '7', name: 'Visual Communication', code: 'BDI101', credits: 4 },
    { id: '8', name: 'Industrial Design', code: 'BDI102', credits: 4 },
    { id: '9', name: 'Typography Design', code: 'BDI103', credits: 3 },
    { id: '10', name: 'Product Design', code: 'BDI104', credits: 4 },
    { id: '11', name: 'Design Thinking', code: 'BDI105', credits: 4 },
    { id: '12', name: 'Sustainable Design', code: 'BDI106', credits: 3 }
  ],
  'Faculty of Multimedia Creativity': [
    { id: '13', name: 'Digital Animation', code: 'BMC301', credits: 4 },
    { id: '14', name: 'Game Development', code: 'BMC302', credits: 4 },
    { id: '15', name: 'Sound Design', code: 'BMC303', credits: 3 },
    { id: '16', name: 'Motion Graphics', code: 'BMC304', credits: 4 },
    { id: '17', name: '3D Modelling', code: 'BMC305', credits: 4 },
    { id: '18', name: 'Interactive Media', code: 'BMC306', credits: 3 }
  ],
  'Faculty of Business Management': [
    { id: '19', name: 'Marketing Strategy', code: 'BBM401', credits: 4 },
    { id: '20', name: 'Corporate Finance', code: 'BBM402', credits: 4 },
    { id: '21', name: 'Business Ethics', code: 'BBM403', credits: 3 },
    { id: '22', name: 'Entrepreneurship', code: 'BBM404', credits: 4 },
    { id: '23', name: 'Operations Management', code: 'BBM405', credits: 4 },
    { id: '24', name: 'International Business', code: 'BBM406', credits: 3 }
  ]
};

export const LOGO_URL = "https://static.wixstatic.com/media/07817b_8109d949479b441f9d5018610332881a~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90/07817b_8109d949479b441f9d5018610332881a~mv2.png";
