// Mock data for the admin portal
// Uses realistic Bangladeshi names and data

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  education: string;
  occupation: string;
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unsubmitted';
  signupDate: string;
  email: string;
  phone: string;
  photo: string;
  religion: string;
  familyType: string;
  matchCount: number;
  lastActive: string;
}

export interface Verification {
  id: string;
  profileId: string;
  profileName: string;
  profileAge: number;
  profileGender: 'male' | 'female';
  profilePhoto: string;
  documentType: 'nid' | 'passport';
  documentUrl: string;
  submittedAt: string;
  notes: string;
}

export interface Match {
  id: string;
  profile1: Profile;
  profile2: Profile;
  compatibilityScore: number;
  breakdown: {
    values: number;
    lifestyle: number;
    family: number;
    personality: number;
    practical: number;
  };
  status: 'suggested' | 'approved' | 'sent' | 'mutual' | 'declined';
  matchmakerNotes: string;
  createdAt: string;
}

export interface Introduction {
  id: string;
  match: Match;
  status: 'pending' | 'sent' | 'accepted_one' | 'accepted_both' | 'declined' | 'completed';
  message: string;
  sentAt: string;
  respondedAt: string | null;
  outcome: string | null;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantPhoto: string;
  participantId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  sentAt: string;
  isAdmin: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  method: 'bkash' | 'nagad' | 'card' | 'bank';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'signup' | 'premium' | 'success_fee';
  date: string;
  reference: string;
}

export interface AdminMetrics {
  totalProfiles: number;
  totalProfilesTrend: number;
  pendingVerifications: number;
  pendingVerificationsTrend: number;
  activeMatches: number;
  activeMatchesTrend: number;
  successRate: number;
  successRateTrend: number;
  revenue: number;
  revenueTrend: number;
  newSignupsThisWeek: number;
  introductionsSent: number;
  meetingsScheduled: number;
}

// Mock Profiles (18 profiles with realistic Bangladeshi data)
export const mockProfiles: Profile[] = [
  {
    id: 'p001',
    name: 'Nadia Rahman',
    age: 28,
    gender: 'female',
    location: 'Dhaka, Gulshan',
    education: 'MBA, IBA Dhaka',
    occupation: 'Product Manager at Grameenphone',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-15',
    email: 'nadia.r@email.com',
    phone: '+880 1712-345678',
    photo: '/avatars/nadia.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 5,
    lastActive: '2026-02-17',
  },
  {
    id: 'p002',
    name: 'Arif Hossain',
    age: 32,
    gender: 'male',
    location: 'Dhaka, Dhanmondi',
    education: 'MBBS, DMC',
    occupation: 'Senior Resident, Square Hospital',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-10',
    email: 'arif.h@email.com',
    phone: '+880 1812-456789',
    photo: '/avatars/arif.jpg',
    religion: 'Islam',
    familyType: 'Joint',
    matchCount: 8,
    lastActive: '2026-02-16',
  },
  {
    id: 'p003',
    name: 'Sabrina Ahmed',
    age: 26,
    gender: 'female',
    location: 'Chittagong',
    education: 'BSc Computer Science, BUET',
    occupation: 'Software Engineer at Google',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-20',
    email: 'sabrina.a@email.com',
    phone: '+880 1912-567890',
    photo: '/avatars/sabrina.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 12,
    lastActive: '2026-02-17',
  },
  {
    id: 'p004',
    name: 'Farhan Chowdhury',
    age: 30,
    gender: 'male',
    location: 'Dhaka, Uttara',
    education: 'MBA, NSU',
    occupation: 'Investment Banker at HSBC',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-08',
    email: 'farhan.c@email.com',
    phone: '+880 1612-678901',
    photo: '/avatars/farhan.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 6,
    lastActive: '2026-02-15',
  },
  {
    id: 'p005',
    name: 'Tasnim Sultana',
    age: 27,
    gender: 'female',
    location: 'Sylhet',
    education: 'MA English Literature, DU',
    occupation: 'University Lecturer',
    status: 'pending',
    verificationStatus: 'pending',
    signupDate: '2026-02-14',
    email: 'tasnim.s@email.com',
    phone: '+880 1512-789012',
    photo: '/avatars/tasnim.jpg',
    religion: 'Islam',
    familyType: 'Extended',
    matchCount: 0,
    lastActive: '2026-02-16',
  },
  {
    id: 'p006',
    name: 'Rakib Hassan',
    age: 29,
    gender: 'male',
    location: 'Dhaka, Mirpur',
    education: 'BBA, Dhaka University',
    occupation: 'Marketing Manager at Unilever',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-25',
    email: 'rakib.h@email.com',
    phone: '+880 1712-890123',
    photo: '/avatars/rakib.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 4,
    lastActive: '2026-02-17',
  },
  {
    id: 'p007',
    name: 'Fariha Akter',
    age: 25,
    gender: 'female',
    location: 'Dhaka, Banani',
    education: 'BArch, BUET',
    occupation: 'Architect at Vitti Sthapati',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-02-01',
    email: 'fariha.a@email.com',
    phone: '+880 1812-901234',
    photo: '/avatars/fariha.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 7,
    lastActive: '2026-02-17',
  },
  {
    id: 'p008',
    name: 'Imran Khan',
    age: 34,
    gender: 'male',
    location: 'London, UK',
    education: 'PhD Economics, LSE',
    occupation: 'Economist at World Bank',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-05',
    email: 'imran.k@email.com',
    phone: '+44 7712-012345',
    photo: '/avatars/imran.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 3,
    lastActive: '2026-02-14',
  },
  {
    id: 'p009',
    name: 'Mim Chowdhury',
    age: 24,
    gender: 'female',
    location: 'Dhaka, Mohammadpur',
    education: 'MBBS, BMC',
    occupation: 'Medical Intern',
    status: 'pending',
    verificationStatus: 'pending',
    signupDate: '2026-02-15',
    email: 'mim.c@email.com',
    phone: '+880 1912-123456',
    photo: '/avatars/mim.jpg',
    religion: 'Islam',
    familyType: 'Joint',
    matchCount: 0,
    lastActive: '2026-02-17',
  },
  {
    id: 'p010',
    name: 'Shafiq Rahman',
    age: 31,
    gender: 'male',
    location: 'Rajshahi',
    education: 'MSc Agriculture, BAU',
    occupation: 'Agricultural Consultant',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-18',
    email: 'shafiq.r@email.com',
    phone: '+880 1612-234567',
    photo: '/avatars/shafiq.jpg',
    religion: 'Islam',
    familyType: 'Extended',
    matchCount: 2,
    lastActive: '2026-02-13',
  },
  {
    id: 'p011',
    name: 'Jannatul Ferdous',
    age: 29,
    gender: 'female',
    location: 'Dhaka, Bashundhara',
    education: 'LLB, Dhaka University',
    occupation: 'Advocate, Supreme Court',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-12',
    email: 'jannatul.f@email.com',
    phone: '+880 1512-345678',
    photo: '/avatars/jannatul.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 9,
    lastActive: '2026-02-17',
  },
  {
    id: 'p012',
    name: 'Tanvir Ahmed',
    age: 28,
    gender: 'male',
    location: 'New York, USA',
    education: 'MS Computer Science, MIT',
    occupation: 'Software Engineer at Meta',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-22',
    email: 'tanvir.a@email.com',
    phone: '+1 646-456-7890',
    photo: '/avatars/tanvir.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 5,
    lastActive: '2026-02-16',
  },
  {
    id: 'p013',
    name: 'Rabeya Khatun',
    age: 26,
    gender: 'female',
    location: 'Khulna',
    education: 'BBA, Khulna University',
    occupation: 'Bank Officer at Sonali Bank',
    status: 'inactive',
    verificationStatus: 'verified',
    signupDate: '2025-12-01',
    email: 'rabeya.k@email.com',
    phone: '+880 1712-567890',
    photo: '/avatars/rabeya.jpg',
    religion: 'Islam',
    familyType: 'Joint',
    matchCount: 1,
    lastActive: '2026-01-15',
  },
  {
    id: 'p014',
    name: 'Nahid Hasan',
    age: 33,
    gender: 'male',
    location: 'Dhaka, Gulshan',
    education: 'MBA, Harvard Business School',
    occupation: 'CEO, Tech Startup',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-03',
    email: 'nahid.h@email.com',
    phone: '+880 1812-678901',
    photo: '/avatars/nahid.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 11,
    lastActive: '2026-02-17',
  },
  {
    id: 'p015',
    name: 'Sadia Islam',
    age: 27,
    gender: 'female',
    location: 'Dhaka, Dhanmondi',
    education: 'MBBS, BSMMU',
    occupation: 'Dermatologist',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-01-28',
    email: 'sadia.i@email.com',
    phone: '+880 1912-789012',
    photo: '/avatars/sadia.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 8,
    lastActive: '2026-02-17',
  },
  {
    id: 'p016',
    name: 'Mahmudul Haque',
    age: 30,
    gender: 'male',
    location: 'Dubai, UAE',
    education: 'BBA, IBA Dhaka',
    occupation: 'Finance Manager at Emirates',
    status: 'pending',
    verificationStatus: 'pending',
    signupDate: '2026-02-16',
    email: 'mahmud.h@email.com',
    phone: '+971 50-123-4567',
    photo: '/avatars/mahmud.jpg',
    religion: 'Islam',
    familyType: 'Nuclear',
    matchCount: 0,
    lastActive: '2026-02-17',
  },
  {
    id: 'p017',
    name: 'Priya Das',
    age: 25,
    gender: 'female',
    location: 'Dhaka, Uttara',
    education: 'BFA, Charukola',
    occupation: 'Graphic Designer',
    status: 'active',
    verificationStatus: 'verified',
    signupDate: '2026-02-05',
    email: 'priya.d@email.com',
    phone: '+880 1612-890123',
    photo: '/avatars/priya.jpg',
    religion: 'Hinduism',
    familyType: 'Nuclear',
    matchCount: 4,
    lastActive: '2026-02-17',
  },
  {
    id: 'p018',
    name: 'Karim Uddin',
    age: 35,
    gender: 'male',
    location: 'Comilla',
    education: 'MSc Engineering, CUET',
    occupation: 'Civil Engineer',
    status: 'suspended',
    verificationStatus: 'rejected',
    signupDate: '2025-11-20',
    email: 'karim.u@email.com',
    phone: '+880 1512-901234',
    photo: '/avatars/karim.jpg',
    religion: 'Islam',
    familyType: 'Extended',
    matchCount: 0,
    lastActive: '2025-12-05',
  },
];

// Mock Verifications (pending)
export const mockVerifications: Verification[] = [
  {
    id: 'v001',
    profileId: 'p005',
    profileName: 'Tasnim Sultana',
    profileAge: 27,
    profileGender: 'female',
    profilePhoto: '/avatars/tasnim.jpg',
    documentType: 'nid',
    documentUrl: '/documents/tasnim-nid.jpg',
    submittedAt: '2026-02-14T10:30:00Z',
    notes: '',
  },
  {
    id: 'v002',
    profileId: 'p009',
    profileName: 'Mim Chowdhury',
    profileAge: 24,
    profileGender: 'female',
    profilePhoto: '/avatars/mim.jpg',
    documentType: 'nid',
    documentUrl: '/documents/mim-nid.jpg',
    submittedAt: '2026-02-15T14:20:00Z',
    notes: '',
  },
  {
    id: 'v003',
    profileId: 'p016',
    profileName: 'Mahmudul Haque',
    profileAge: 30,
    profileGender: 'male',
    profilePhoto: '/avatars/mahmud.jpg',
    documentType: 'passport',
    documentUrl: '/documents/mahmud-passport.jpg',
    submittedAt: '2026-02-16T09:15:00Z',
    notes: '',
  },
];

// Mock Match Suggestions
export const mockMatches: Match[] = [
  {
    id: 'm001',
    profile1: mockProfiles[0], // Nadia
    profile2: mockProfiles[1], // Arif
    compatibilityScore: 87,
    breakdown: {
      values: 92,
      lifestyle: 85,
      family: 88,
      personality: 82,
      practical: 90,
    },
    status: 'suggested',
    matchmakerNotes: '',
    createdAt: '2026-02-17T08:00:00Z',
  },
  {
    id: 'm002',
    profile1: mockProfiles[0], // Nadia
    profile2: mockProfiles[3], // Farhan
    compatibilityScore: 79,
    breakdown: {
      values: 75,
      lifestyle: 82,
      family: 78,
      personality: 80,
      practical: 85,
    },
    status: 'suggested',
    matchmakerNotes: '',
    createdAt: '2026-02-17T08:00:00Z',
  },
  {
    id: 'm003',
    profile1: mockProfiles[2], // Sabrina
    profile2: mockProfiles[11], // Tanvir
    compatibilityScore: 94,
    breakdown: {
      values: 95,
      lifestyle: 92,
      family: 90,
      personality: 96,
      practical: 97,
    },
    status: 'approved',
    matchmakerNotes: 'Both tech professionals, similar career trajectories. Excellent fit.',
    createdAt: '2026-02-16T10:00:00Z',
  },
  {
    id: 'm004',
    profile1: mockProfiles[6], // Fariha
    profile2: mockProfiles[5], // Rakib
    compatibilityScore: 72,
    breakdown: {
      values: 70,
      lifestyle: 75,
      family: 72,
      personality: 68,
      practical: 80,
    },
    status: 'suggested',
    matchmakerNotes: '',
    createdAt: '2026-02-17T09:00:00Z',
  },
  {
    id: 'm005',
    profile1: mockProfiles[10], // Jannatul
    profile2: mockProfiles[13], // Nahid
    compatibilityScore: 88,
    breakdown: {
      values: 90,
      lifestyle: 85,
      family: 92,
      personality: 86,
      practical: 88,
    },
    status: 'mutual',
    matchmakerNotes: 'Both ambitious professionals. Strong family values alignment.',
    createdAt: '2026-02-14T11:00:00Z',
  },
];

// Mock Introductions
export const mockIntroductions: Introduction[] = [
  {
    id: 'i001',
    match: mockMatches[4], // Jannatul & Nahid
    status: 'accepted_both',
    message: "Assalamu Alaikum! I'm excited to introduce you both. Jannatul and Nahid, you both share a strong commitment to your careers while prioritizing family values. Jannatul's dedication to justice as an advocate complements Nahid's entrepreneurial vision. I believe you'll find meaningful conversations ahead.",
    sentAt: '2026-02-14T15:00:00Z',
    respondedAt: '2026-02-15T10:00:00Z',
    outcome: 'First video call scheduled for Feb 18',
  },
  {
    id: 'i002',
    match: mockMatches[2], // Sabrina & Tanvir
    status: 'sent',
    message: "Dear Sabrina and Tanvir, As fellow tech professionals working at leading global companies, you share not just career paths but also similar perspectives on work-life balance. Your compatibility score is exceptionally high, especially in personality and practical alignment.",
    sentAt: '2026-02-16T14:00:00Z',
    respondedAt: null,
    outcome: null,
  },
  {
    id: 'i003',
    match: {
      id: 'm006',
      profile1: mockProfiles[14], // Sadia
      profile2: mockProfiles[1], // Arif
      compatibilityScore: 91,
      breakdown: {
        values: 93,
        lifestyle: 88,
        family: 95,
        personality: 87,
        practical: 92,
      },
      status: 'mutual',
      matchmakerNotes: 'Both medical professionals. Strong compatibility.',
      createdAt: '2026-02-10T09:00:00Z',
    },
    status: 'completed',
    message: "Assalamu Alaikum Sadia and Arif! As two dedicated medical professionals, you understand the demands and rewards of healthcare careers. Your shared values around family and similar upbringing make this a particularly promising match.",
    sentAt: '2026-02-10T11:00:00Z',
    respondedAt: '2026-02-10T18:00:00Z',
    outcome: 'Successfully engaged! Families met on Feb 15.',
  },
  {
    id: 'i004',
    match: {
      id: 'm007',
      profile1: mockProfiles[16], // Priya
      profile2: mockProfiles[5], // Rakib
      compatibilityScore: 68,
      breakdown: {
        values: 65,
        lifestyle: 72,
        family: 60,
        personality: 75,
        practical: 70,
      },
      status: 'declined',
      matchmakerNotes: 'Different religious backgrounds - need to confirm openness.',
      createdAt: '2026-02-08T14:00:00Z',
    },
    status: 'declined',
    message: "Dear Priya and Rakib, While you share creative sensibilities and lifestyle preferences, I wanted to introduce you as two individuals who value artistic expression and modern outlooks.",
    sentAt: '2026-02-08T16:00:00Z',
    respondedAt: '2026-02-09T09:00:00Z',
    outcome: 'Declined by both parties - seeking same religion',
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'c001',
    participantName: 'Nadia Rahman',
    participantPhoto: '/avatars/nadia.jpg',
    participantId: 'p001',
    lastMessage: 'Thank you for the introduction! I reviewed his profile and I am interested.',
    lastMessageAt: '2026-02-17T09:30:00Z',
    unreadCount: 1,
    messages: [
      {
        id: 'msg001',
        senderId: 'admin',
        senderName: 'Matchmaker',
        content: 'Assalamu Alaikum Nadia! I have found a potential match for you - Dr. Arif Hossain. Would you like me to send you his profile?',
        sentAt: '2026-02-16T14:00:00Z',
        isAdmin: true,
      },
      {
        id: 'msg002',
        senderId: 'p001',
        senderName: 'Nadia Rahman',
        content: 'Walaikum Assalam! Yes, please share his profile. I am excited to see.',
        sentAt: '2026-02-16T15:30:00Z',
        isAdmin: false,
      },
      {
        id: 'msg003',
        senderId: 'admin',
        senderName: 'Matchmaker',
        content: 'Here is Dr. Arif\'s profile. He is a 32-year-old Senior Resident at Square Hospital. Your compatibility score is 87%, with particularly strong alignment in values and practical matters.',
        sentAt: '2026-02-16T16:00:00Z',
        isAdmin: true,
      },
      {
        id: 'msg004',
        senderId: 'p001',
        senderName: 'Nadia Rahman',
        content: 'Thank you for the introduction! I reviewed his profile and I am interested.',
        sentAt: '2026-02-17T09:30:00Z',
        isAdmin: false,
      },
    ],
  },
  {
    id: 'c002',
    participantName: 'Arif Hossain',
    participantPhoto: '/avatars/arif.jpg',
    participantId: 'p002',
    lastMessage: 'Looking forward to the introduction.',
    lastMessageAt: '2026-02-17T08:15:00Z',
    unreadCount: 0,
    messages: [
      {
        id: 'msg005',
        senderId: 'admin',
        senderName: 'Matchmaker',
        content: 'Assalamu Alaikum Dr. Arif! I have an excellent match for you - Nadia Rahman, a Product Manager at Grameenphone.',
        sentAt: '2026-02-16T14:30:00Z',
        isAdmin: true,
      },
      {
        id: 'msg006',
        senderId: 'p002',
        senderName: 'Arif Hossain',
        content: 'Walaikum Assalam! Thank you for reaching out. Please tell me more about her.',
        sentAt: '2026-02-16T18:00:00Z',
        isAdmin: false,
      },
      {
        id: 'msg007',
        senderId: 'admin',
        senderName: 'Matchmaker',
        content: 'Nadia is 28, MBA from IBA. She comes from a well-educated family in Gulshan. Your compatibility is 87%. Would you like to proceed?',
        sentAt: '2026-02-17T08:00:00Z',
        isAdmin: true,
      },
      {
        id: 'msg008',
        senderId: 'p002',
        senderName: 'Arif Hossain',
        content: 'Looking forward to the introduction.',
        sentAt: '2026-02-17T08:15:00Z',
        isAdmin: false,
      },
    ],
  },
  {
    id: 'c003',
    participantName: 'Sabrina Ahmed',
    participantPhoto: '/avatars/sabrina.jpg',
    participantId: 'p003',
    lastMessage: 'Is there any update on my matches?',
    lastMessageAt: '2026-02-16T20:00:00Z',
    unreadCount: 2,
    messages: [
      {
        id: 'msg009',
        senderId: 'p003',
        senderName: 'Sabrina Ahmed',
        content: 'Hi! I completed my profile last month. When can I expect to receive matches?',
        sentAt: '2026-02-15T10:00:00Z',
        isAdmin: false,
      },
      {
        id: 'msg010',
        senderId: 'admin',
        senderName: 'Matchmaker',
        content: 'Hi Sabrina! We are actively working on finding the best matches for you. Given your profile, we are looking for someone in the tech industry who shares your values.',
        sentAt: '2026-02-15T11:30:00Z',
        isAdmin: true,
      },
      {
        id: 'msg011',
        senderId: 'p003',
        senderName: 'Sabrina Ahmed',
        content: 'That sounds perfect. Thank you!',
        sentAt: '2026-02-15T12:00:00Z',
        isAdmin: false,
      },
      {
        id: 'msg012',
        senderId: 'p003',
        senderName: 'Sabrina Ahmed',
        content: 'Is there any update on my matches?',
        sentAt: '2026-02-16T20:00:00Z',
        isAdmin: false,
      },
    ],
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay001',
    userId: 'p001',
    userName: 'Nadia Rahman',
    amount: 5000,
    currency: 'BDT',
    method: 'bkash',
    status: 'completed',
    type: 'signup',
    date: '2026-01-15T10:00:00Z',
    reference: 'BK2601150001',
  },
  {
    id: 'pay002',
    userId: 'p002',
    userName: 'Arif Hossain',
    amount: 10000,
    currency: 'BDT',
    method: 'card',
    status: 'completed',
    type: 'premium',
    date: '2026-01-10T14:30:00Z',
    reference: 'CD2601100002',
  },
  {
    id: 'pay003',
    userId: 'p003',
    userName: 'Sabrina Ahmed',
    amount: 5000,
    currency: 'BDT',
    method: 'nagad',
    status: 'completed',
    type: 'signup',
    date: '2026-01-20T09:15:00Z',
    reference: 'NG2601200003',
  },
  {
    id: 'pay004',
    userId: 'p014',
    userName: 'Nahid Hasan',
    amount: 25000,
    currency: 'BDT',
    method: 'bank',
    status: 'completed',
    type: 'success_fee',
    date: '2026-02-16T11:00:00Z',
    reference: 'BNK2602160004',
  },
  {
    id: 'pay005',
    userId: 'p016',
    userName: 'Mahmudul Haque',
    amount: 5000,
    currency: 'BDT',
    method: 'bkash',
    status: 'pending',
    type: 'signup',
    date: '2026-02-16T09:20:00Z',
    reference: 'BK2602160005',
  },
  {
    id: 'pay006',
    userId: 'p012',
    userName: 'Tanvir Ahmed',
    amount: 100,
    currency: 'USD',
    method: 'card',
    status: 'completed',
    type: 'premium',
    date: '2026-01-22T16:45:00Z',
    reference: 'CD2601220006',
  },
  {
    id: 'pay007',
    userId: 'p008',
    userName: 'Imran Khan',
    amount: 50,
    currency: 'GBP',
    method: 'card',
    status: 'completed',
    type: 'signup',
    date: '2026-01-05T18:00:00Z',
    reference: 'CD2601050007',
  },
  {
    id: 'pay008',
    userId: 'p018',
    userName: 'Karim Uddin',
    amount: 5000,
    currency: 'BDT',
    method: 'bkash',
    status: 'refunded',
    type: 'signup',
    date: '2025-11-20T12:00:00Z',
    reference: 'BK2511200008',
  },
];

// Admin Metrics
export const mockMetrics: AdminMetrics = {
  totalProfiles: 156,
  totalProfilesTrend: 12,
  pendingVerifications: 3,
  pendingVerificationsTrend: -2,
  activeMatches: 47,
  activeMatchesTrend: 8,
  successRate: 34,
  successRateTrend: 5,
  revenue: 485000,
  revenueTrend: 15,
  newSignupsThisWeek: 8,
  introductionsSent: 23,
  meetingsScheduled: 12,
};

// Recent Activity for Dashboard
export interface Activity {
  id: string;
  type: 'signup' | 'verification' | 'match' | 'introduction' | 'payment' | 'message';
  description: string;
  timestamp: string;
  profileId?: string;
  profileName?: string;
}

export const mockRecentActivity: Activity[] = [
  {
    id: 'a001',
    type: 'signup',
    description: 'New profile registered',
    timestamp: '2026-02-17T09:00:00Z',
    profileId: 'p016',
    profileName: 'Mahmudul Haque',
  },
  {
    id: 'a002',
    type: 'message',
    description: 'New message received',
    timestamp: '2026-02-17T09:30:00Z',
    profileId: 'p001',
    profileName: 'Nadia Rahman',
  },
  {
    id: 'a003',
    type: 'verification',
    description: 'Verification document submitted',
    timestamp: '2026-02-16T09:15:00Z',
    profileId: 'p016',
    profileName: 'Mahmudul Haque',
  },
  {
    id: 'a004',
    type: 'introduction',
    description: 'Introduction sent',
    timestamp: '2026-02-16T14:00:00Z',
    profileId: 'p003',
    profileName: 'Sabrina Ahmed',
  },
  {
    id: 'a005',
    type: 'match',
    description: 'Mutual interest confirmed',
    timestamp: '2026-02-15T10:00:00Z',
    profileId: 'p010',
    profileName: 'Jannatul Ferdous',
  },
  {
    id: 'a006',
    type: 'payment',
    description: 'Success fee received',
    timestamp: '2026-02-16T11:00:00Z',
    profileId: 'p014',
    profileName: 'Nahid Hasan',
  },
  {
    id: 'a007',
    type: 'signup',
    description: 'New profile registered',
    timestamp: '2026-02-15T14:20:00Z',
    profileId: 'p009',
    profileName: 'Mim Chowdhury',
  },
  {
    id: 'a008',
    type: 'introduction',
    description: 'Introduction accepted',
    timestamp: '2026-02-15T10:00:00Z',
    profileId: 'p010',
    profileName: 'Jannatul Ferdous',
  },
];
