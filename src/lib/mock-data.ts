// Mock data for the user portal
// Using realistic Bangladeshi names and contexts

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  education: string;
  headline: string;
  about: string;
  photoUrl: string;
  photos: string[];
  isVerified: boolean;
  isPremium: boolean;
  profileCompletion: number;
  religion: string;
  familyType: string;
  height: string;
  values: string[];
  interests: string[];
  lifestyle: {
    routine: string;
    socialStyle: string;
    diet: string;
  };
  familyBackground: {
    fatherOccupation: string;
    motherOccupation: string;
    siblings: string;
  };
  partnerPreferences: {
    ageRange: string;
    educationMin: string;
    locationPreference: string;
  };
}

export interface Match {
  id: string;
  profile: UserProfile;
  compatibilityScore: number;
  compatibilityBreakdown: {
    values: number;
    lifestyle: number;
    family: number;
    personality: number;
  };
  whyMatched: {
    area: string;
    description: string;
    icon: string;
  }[];
  matchedAt: string;
  status: 'new' | 'viewed' | 'interested' | 'passed';
}

export interface Introduction {
  id: string;
  matchId: string;
  matchName: string;
  matchPhoto: string;
  status: 'pending' | 'accepted' | 'meeting_scheduled' | 'completed' | 'declined';
  message: string;
  createdAt: string;
  updatedAt: string;
  meetingDetails?: {
    date: string;
    time: string;
    location: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isFromMatchmaker: boolean;
}

export interface Notification {
  id: string;
  type: 'match' | 'introduction' | 'message' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

// Current user profile
export const currentUser: UserProfile = {
  id: 'user-001',
  name: 'Nadia Rahman',
  age: 28,
  location: 'Dhaka, Gulshan',
  occupation: 'Software Engineer at Grameenphone',
  education: 'BSc in Computer Science, BUET',
  headline: 'Career-focused, family-oriented, and looking for a meaningful connection',
  about: 'I am a passionate software engineer who loves solving complex problems. In my free time, I enjoy reading, traveling to new places, and trying out new recipes. I believe in maintaining a healthy work-life balance and value deep, meaningful conversations. Looking for someone who shares similar values and is ready for a committed relationship.',
  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  photos: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop',
  ],
  isVerified: true,
  isPremium: false,
  profileCompletion: 85,
  religion: 'Islam (Practicing)',
  familyType: 'Nuclear Family',
  height: "5'5\"",
  values: ['Family-oriented', 'Career-focused', 'Progressive thinking', 'Honest communication'],
  interests: ['Reading', 'Cooking', 'Travel', 'Photography', 'Yoga'],
  lifestyle: {
    routine: 'Early bird',
    socialStyle: 'Ambivert',
    diet: 'Halal, occasionally vegetarian',
  },
  familyBackground: {
    fatherOccupation: 'Retired Bank Manager',
    motherOccupation: 'Homemaker',
    siblings: '1 elder brother (married)',
  },
  partnerPreferences: {
    ageRange: '28-35',
    educationMin: "Bachelor's degree",
    locationPreference: 'Dhaka preferred',
  },
};

// Match profiles
export const matchProfiles: UserProfile[] = [
  {
    id: 'profile-001',
    name: 'Tariq Ahmed',
    age: 31,
    location: 'Dhaka, Banani',
    occupation: 'Investment Analyst at Standard Chartered',
    education: 'MBA, IBA Dhaka',
    headline: 'Ambitious yet grounded, seeking a partner for life\'s journey',
    about: 'Finance professional with a passion for understanding markets and building wealth responsibly. I enjoy weekend cricket, exploring new restaurants, and staying fit. Family is everything to me, and I\'m looking for someone who values both personal growth and strong family bonds.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: true,
    profileCompletion: 100,
    religion: 'Islam (Moderate)',
    familyType: 'Nuclear Family',
    height: "5'10\"",
    values: ['Ambitious', 'Family-oriented', 'Health-conscious', 'Financially responsible'],
    interests: ['Cricket', 'Finance', 'Fitness', 'Travel', 'Food exploration'],
    lifestyle: {
      routine: 'Early bird',
      socialStyle: 'Ambivert',
      diet: 'Halal',
    },
    familyBackground: {
      fatherOccupation: 'Businessman (Garments)',
      motherOccupation: 'School Principal (Retired)',
      siblings: '1 younger sister (unmarried)',
    },
    partnerPreferences: {
      ageRange: '25-30',
      educationMin: "Bachelor's degree",
      locationPreference: 'Dhaka',
    },
  },
  {
    id: 'profile-002',
    name: 'Imran Hossain',
    age: 29,
    location: 'Dhaka, Dhanmondi',
    occupation: 'Product Manager at Pathao',
    education: 'BSc in Engineering, KUET',
    headline: 'Tech enthusiast who believes in work-life balance',
    about: 'Building products that make people\'s lives easier. When I\'m not at work, you\'ll find me hiking, playing guitar, or trying to perfect my biryani recipe. I value authenticity, humor, and kindness above all else.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: false,
    profileCompletion: 92,
    religion: 'Islam (Cultural)',
    familyType: 'Extended Family',
    height: "5'9\"",
    values: ['Creative', 'Empathetic', 'Work-life balance', 'Authentic'],
    interests: ['Tech', 'Music', 'Hiking', 'Cooking', 'Board games'],
    lifestyle: {
      routine: 'Night owl',
      socialStyle: 'Extrovert',
      diet: 'Halal, loves to cook',
    },
    familyBackground: {
      fatherOccupation: 'Civil Engineer',
      motherOccupation: 'Doctor (Practicing)',
      siblings: '2 younger brothers',
    },
    partnerPreferences: {
      ageRange: '24-29',
      educationMin: "Bachelor's degree",
      locationPreference: 'Flexible',
    },
  },
  {
    id: 'profile-003',
    name: 'Rafiq Uddin',
    age: 33,
    location: 'Chittagong',
    occupation: 'Senior Doctor at CMC Hospital',
    education: 'MBBS, Dhaka Medical College',
    headline: 'Dedicated healer seeking a compassionate partner',
    about: 'Medicine is my calling, but I know there\'s more to life. I\'m looking for someone who understands the demands of a medical career while sharing moments of joy and peace together. I enjoy reading, long drives, and spending time with family.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: true,
    profileCompletion: 95,
    religion: 'Islam (Practicing)',
    familyType: 'Nuclear Family',
    height: "5'11\"",
    values: ['Compassionate', 'Dedicated', 'Family-first', 'Patient'],
    interests: ['Medicine', 'Reading', 'Long drives', 'Gardening'],
    lifestyle: {
      routine: 'Variable (shift-based)',
      socialStyle: 'Introvert',
      diet: 'Halal',
    },
    familyBackground: {
      fatherOccupation: 'Retired Government Officer',
      motherOccupation: 'Homemaker',
      siblings: '1 elder sister (married), 1 younger brother',
    },
    partnerPreferences: {
      ageRange: '26-31',
      educationMin: "Bachelor's degree",
      locationPreference: 'Chittagong or Dhaka',
    },
  },
  {
    id: 'profile-004',
    name: 'Kamal Hasan',
    age: 30,
    location: 'Dhaka, Uttara',
    occupation: 'Architect at Bengal Design Studio',
    education: 'B.Arch, BUET',
    headline: 'Creative soul with traditional values',
    about: 'I design spaces that inspire and comfort. Architecture taught me the importance of foundation—both in buildings and relationships. I\'m artistic, thoughtful, and believe in creating a beautiful life together with the right person.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: false,
    profileCompletion: 88,
    religion: 'Islam (Moderate)',
    familyType: 'Nuclear Family',
    height: "5'8\"",
    values: ['Creative', 'Thoughtful', 'Detail-oriented', 'Traditional'],
    interests: ['Architecture', 'Art', 'Photography', 'Calligraphy', 'Travel'],
    lifestyle: {
      routine: 'Flexible',
      socialStyle: 'Ambivert',
      diet: 'Halal',
    },
    familyBackground: {
      fatherOccupation: 'Professor (Retired)',
      motherOccupation: 'Artist',
      siblings: 'Only child',
    },
    partnerPreferences: {
      ageRange: '25-30',
      educationMin: "Bachelor's degree",
      locationPreference: 'Dhaka',
    },
  },
  {
    id: 'profile-005',
    name: 'Faisal Rahman',
    age: 32,
    location: 'London, UK (From Sylhet)',
    occupation: 'Data Scientist at Deloitte',
    education: 'MSc in Data Science, Imperial College London',
    headline: 'Global citizen with roots in Bangladesh',
    about: 'Living in London but my heart is in Bangladesh. Working in AI and data science, fascinated by how technology can solve real problems. Planning to return home eventually to contribute to the country. Looking for someone who shares this vision.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: true,
    profileCompletion: 100,
    religion: 'Islam (Cultural)',
    familyType: 'Nuclear Family',
    height: "5'10\"",
    values: ['Ambitious', 'Patriotic', 'Intellectual', 'Open-minded'],
    interests: ['AI', 'Startups', 'Football', 'Travel', 'Politics'],
    lifestyle: {
      routine: 'Early bird',
      socialStyle: 'Extrovert',
      diet: 'Halal',
    },
    familyBackground: {
      fatherOccupation: 'Tea Estate Owner',
      motherOccupation: 'Homemaker',
      siblings: '2 elder sisters (both married)',
    },
    partnerPreferences: {
      ageRange: '25-30',
      educationMin: "Master's degree preferred",
      locationPreference: 'Open to relocation',
    },
  },
  {
    id: 'profile-006',
    name: 'Arif Mahmud',
    age: 28,
    location: 'Dhaka, Mirpur',
    occupation: 'Entrepreneur (E-commerce)',
    education: 'BBA, NSU',
    headline: 'Building businesses, seeking a life partner',
    about: 'Started my own e-commerce business two years ago and loving the journey. Entrepreneurship taught me resilience, patience, and the value of a supportive partner. I\'m looking for someone who believes in taking calculated risks and building something meaningful together.',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=600&fit=crop',
    ],
    isVerified: true,
    isPremium: false,
    profileCompletion: 82,
    religion: 'Islam (Moderate)',
    familyType: 'Joint Family',
    height: "5'7\"",
    values: ['Entrepreneurial', 'Risk-taker', 'Supportive', 'Growth-minded'],
    interests: ['Business', 'Technology', 'Cricket', 'Movies', 'Networking'],
    lifestyle: {
      routine: 'Night owl',
      socialStyle: 'Extrovert',
      diet: 'Halal',
    },
    familyBackground: {
      fatherOccupation: 'Small Business Owner',
      motherOccupation: 'Homemaker',
      siblings: '1 younger sister',
    },
    partnerPreferences: {
      ageRange: '24-28',
      educationMin: "Bachelor's degree",
      locationPreference: 'Dhaka',
    },
  },
];

// Generate matches with compatibility data
export const matches: Match[] = [
  {
    id: 'match-001',
    profile: matchProfiles[0],
    compatibilityScore: 92,
    compatibilityBreakdown: {
      values: 95,
      lifestyle: 88,
      family: 94,
      personality: 90,
    },
    whyMatched: [
      {
        area: 'Shared Values',
        description: 'Both prioritize family while maintaining career ambitions',
        icon: 'heart',
      },
      {
        area: 'Lifestyle Match',
        description: 'Early birds who value health and fitness',
        icon: 'sun',
      },
      {
        area: 'Education Alignment',
        description: 'Similar educational backgrounds with analytical mindsets',
        icon: 'graduation-cap',
      },
    ],
    matchedAt: '2026-02-15T10:30:00Z',
    status: 'new',
  },
  {
    id: 'match-002',
    profile: matchProfiles[1],
    compatibilityScore: 87,
    compatibilityBreakdown: {
      values: 85,
      lifestyle: 90,
      family: 82,
      personality: 92,
    },
    whyMatched: [
      {
        area: 'Tech Connection',
        description: 'Both work in tech and understand the industry demands',
        icon: 'laptop',
      },
      {
        area: 'Creative Spirits',
        description: 'Shared love for cooking and trying new things',
        icon: 'chef-hat',
      },
      {
        area: 'Communication Style',
        description: 'Value authenticity and honest conversations',
        icon: 'message-circle',
      },
    ],
    matchedAt: '2026-02-14T14:00:00Z',
    status: 'viewed',
  },
  {
    id: 'match-003',
    profile: matchProfiles[2],
    compatibilityScore: 84,
    compatibilityBreakdown: {
      values: 90,
      lifestyle: 75,
      family: 88,
      personality: 82,
    },
    whyMatched: [
      {
        area: 'Religious Alignment',
        description: 'Both value practicing faith in daily life',
        icon: 'heart-handshake',
      },
      {
        area: 'Family Values',
        description: 'Strong family bonds and traditional values',
        icon: 'home',
      },
      {
        area: 'Intellectual Match',
        description: 'Shared love for reading and learning',
        icon: 'book-open',
      },
    ],
    matchedAt: '2026-02-13T09:15:00Z',
    status: 'interested',
  },
  {
    id: 'match-004',
    profile: matchProfiles[3],
    compatibilityScore: 81,
    compatibilityBreakdown: {
      values: 82,
      lifestyle: 85,
      family: 78,
      personality: 80,
    },
    whyMatched: [
      {
        area: 'Creative Minds',
        description: 'Appreciation for art and aesthetic sensibilities',
        icon: 'palette',
      },
      {
        area: 'Travel Enthusiasts',
        description: 'Both love exploring new places',
        icon: 'plane',
      },
      {
        area: 'Work Ethic',
        description: 'Dedicated professionals with attention to detail',
        icon: 'briefcase',
      },
    ],
    matchedAt: '2026-02-12T16:45:00Z',
    status: 'new',
  },
  {
    id: 'match-005',
    profile: matchProfiles[4],
    compatibilityScore: 89,
    compatibilityBreakdown: {
      values: 88,
      lifestyle: 92,
      family: 85,
      personality: 90,
    },
    whyMatched: [
      {
        area: 'Tech & Data',
        description: 'Both work with technology and analytical thinking',
        icon: 'cpu',
      },
      {
        area: 'Global Perspective',
        description: 'Open to international experiences while rooted in culture',
        icon: 'globe',
      },
      {
        area: 'Ambitious Goals',
        description: 'Career-driven with plans for impact',
        icon: 'target',
      },
    ],
    matchedAt: '2026-02-11T11:00:00Z',
    status: 'viewed',
  },
  {
    id: 'match-006',
    profile: matchProfiles[5],
    compatibilityScore: 78,
    compatibilityBreakdown: {
      values: 80,
      lifestyle: 72,
      family: 82,
      personality: 78,
    },
    whyMatched: [
      {
        area: 'Entrepreneurial Spirit',
        description: 'Both appreciate innovation and taking initiative',
        icon: 'rocket',
      },
      {
        area: 'Growth Mindset',
        description: 'Commitment to personal and professional development',
        icon: 'trending-up',
      },
      {
        area: 'Supportive Nature',
        description: 'Value being supportive partners',
        icon: 'users',
      },
    ],
    matchedAt: '2026-02-10T08:30:00Z',
    status: 'new',
  },
];

// Introductions
export const introductions: Introduction[] = [
  {
    id: 'intro-001',
    matchId: 'match-003',
    matchName: 'Rafiq Uddin',
    matchPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    status: 'meeting_scheduled',
    message: 'Based on your mutual interest and excellent compatibility, I\'d like to introduce you both. Rafiq is a dedicated physician who values family deeply. I believe you two would have wonderful conversations.',
    createdAt: '2026-02-13T12:00:00Z',
    updatedAt: '2026-02-16T14:00:00Z',
    meetingDetails: {
      date: '2026-02-20',
      time: '5:00 PM',
      location: 'The Coffee Bean, Gulshan 2',
    },
  },
  {
    id: 'intro-002',
    matchId: 'match-001',
    matchName: 'Tariq Ahmed',
    matchPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    status: 'accepted',
    message: 'I\'m delighted to introduce you to Tariq. With a 92% compatibility score, you share remarkable alignment in values and lifestyle. He\'s expressed genuine interest in getting to know you better.',
    createdAt: '2026-02-15T11:00:00Z',
    updatedAt: '2026-02-16T09:00:00Z',
  },
  {
    id: 'intro-003',
    matchId: 'match-005',
    matchName: 'Faisal Rahman',
    matchPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    status: 'pending',
    message: 'Faisal is currently based in London but has strong ties to Bangladesh. Your shared background in technology and similar life goals make this a promising connection.',
    createdAt: '2026-02-16T10:00:00Z',
    updatedAt: '2026-02-16T10:00:00Z',
  },
];

// Messages with matchmaker
export const messages: Message[] = [
  {
    id: 'msg-001',
    senderId: 'matchmaker',
    senderName: 'Sabrina Chowdhury',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    content: 'Assalamu Alaikum Nadia! Welcome to our matchmaking service. I\'m Sabrina, and I\'ll be personally guiding your journey to find the perfect match. I\'ve reviewed your profile and I\'m impressed by your background!',
    timestamp: '2026-02-10T09:00:00Z',
    isFromMatchmaker: true,
  },
  {
    id: 'msg-002',
    senderId: 'user-001',
    senderName: 'Nadia Rahman',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Wa Alaikum Assalam! Thank you so much, Sabrina. I\'m really excited to start this journey. I\'ve tried other platforms before but this feels more personal already.',
    timestamp: '2026-02-10T09:30:00Z',
    isFromMatchmaker: false,
  },
  {
    id: 'msg-003',
    senderId: 'matchmaker',
    senderName: 'Sabrina Chowdhury',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    content: 'That\'s exactly our goal! I noticed you\'ve mentioned career-oriented and family-focused as key values. I\'ve already identified some excellent matches that align with these priorities. I\'ll be sending your first curated matches soon.',
    timestamp: '2026-02-10T10:00:00Z',
    isFromMatchmaker: true,
  },
  {
    id: 'msg-004',
    senderId: 'user-001',
    senderName: 'Nadia Rahman',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'That sounds wonderful! Quick question - how does the introduction process work once I express interest in someone?',
    timestamp: '2026-02-10T10:15:00Z',
    isFromMatchmaker: false,
  },
  {
    id: 'msg-005',
    senderId: 'matchmaker',
    senderName: 'Sabrina Chowdhury',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    content: 'Great question! When you express interest, I reach out to the other party. If they\'re also interested, I facilitate a formal introduction with context about why you\'re well-matched. Then, if both of you are comfortable, we can arrange a first meeting - either virtual or in person at a comfortable location.',
    timestamp: '2026-02-10T10:30:00Z',
    isFromMatchmaker: true,
  },
  {
    id: 'msg-006',
    senderId: 'matchmaker',
    senderName: 'Sabrina Chowdhury',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    content: 'Exciting news! 🎉 I\'ve just sent you 6 curated matches. One standout is Tariq Ahmed - 92% compatibility! He\'s an investment analyst who shares your values around family and career balance. Take your time reviewing and let me know your thoughts!',
    timestamp: '2026-02-15T11:00:00Z',
    isFromMatchmaker: true,
  },
  {
    id: 'msg-007',
    senderId: 'user-001',
    senderName: 'Nadia Rahman',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Just reviewed the matches - thank you! I\'m particularly interested in Tariq and Dr. Rafiq. Their profiles really resonated with me.',
    timestamp: '2026-02-15T14:00:00Z',
    isFromMatchmaker: false,
  },
  {
    id: 'msg-008',
    senderId: 'matchmaker',
    senderName: 'Sabrina Chowdhury',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    content: 'Excellent choices! Dr. Rafiq has also expressed interest in your profile. I\'ll proceed with the formal introduction. As for Tariq, I\'ll reach out to him today and keep you updated. This is so exciting!',
    timestamp: '2026-02-15T14:30:00Z',
    isFromMatchmaker: true,
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'match',
    title: 'New Match!',
    description: 'You have a new match with 92% compatibility',
    timestamp: '2026-02-15T10:30:00Z',
    isRead: false,
    link: '/matches/match-001',
  },
  {
    id: 'notif-002',
    type: 'introduction',
    title: 'Introduction Accepted',
    description: 'Tariq has accepted the introduction',
    timestamp: '2026-02-16T09:00:00Z',
    isRead: false,
    link: '/introductions',
  },
  {
    id: 'notif-003',
    type: 'introduction',
    title: 'Meeting Scheduled',
    description: 'Your meeting with Rafiq is confirmed for Feb 20',
    timestamp: '2026-02-16T14:00:00Z',
    isRead: true,
    link: '/introductions',
  },
  {
    id: 'notif-004',
    type: 'message',
    title: 'New Message',
    description: 'Sabrina sent you a message',
    timestamp: '2026-02-15T14:30:00Z',
    isRead: true,
    link: '/messages',
  },
];

// Dashboard stats
export const dashboardStats = {
  totalMatches: 6,
  newMatches: 3,
  pendingIntroductions: 1,
  activeIntroductions: 2,
  messagesUnread: 1,
};

// Mock testimonials for landing page
export const mockTestimonials = [
  {
    id: "t1",
    names: "Nadia & Farhan",
    story: "We never expected an online platform to truly understand what we were looking for. The matchmaker took the time to understand our values and introduced us thoughtfully. We knew from the first conversation.",
    marriedDate: "December 2025",
  },
  {
    id: "t2",
    names: "Ayesha & Rafiq",
    story: "My parents were searching on my behalf while I was working abroad. The mediated introduction process gave my family confidence, and I trusted their judgment. Alhamdulillah, it worked out beautifully.",
    marriedDate: "March 2025",
  },
  {
    id: "t3",
    names: "Sabrina & Imran",
    story: "After disappointing experiences on other matrimony sites, this felt different. The curated approach meant every match was worth considering. Quality over quantity truly works.",
    marriedDate: "August 2025",
  },
];

// Mock FAQs for FAQ page
export const mockFAQs = [
  {
    question: "How does the matching process work?",
    answer: "Our AI analyzes compatibility across five dimensions � values, lifestyle, family expectations, personality, and practical factors. A human matchmaker then reviews these suggestions and curates the best matches for you.",
  },
  {
    question: "How many matches will I receive?",
    answer: "You'll typically receive 3-5 curated matches at a time. Quality is our priority � we'd rather send you fewer, highly compatible matches than overwhelm you with options.",
  },
  {
    question: "What happens after I express interest?",
    answer: "When both parties express mutual interest, our matchmaker facilitates a personalized introduction. They'll share compatibility highlights and suggest conversation starters to help break the ice.",
  },
  {
    question: "Can my family be involved in the process?",
    answer: "Absolutely. Family members can create profiles on behalf of seekers, and we offer family viewing options so parents can review approved matches. The matchmaker can also coordinate with families directly.",
  },
  {
    question: "How is my privacy protected?",
    answer: "Your profile is never openly browsable. Only curated matches see your information, and contact details are only shared after mutual interest through our matchmaker. All documents are stored securely and never displayed publicly.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, and major credit/debit cards. All payments are processed securely through our payment partners.",
  },
];
