export interface Match {
  id: string;
  title: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  venue: string;
  stadium: string;
  status: 'coming-soon' | 'upcoming' | 'completed';
  banner: string;
  categories: SeatCategory[];
}

export interface SeatCategory {
  id: string;
  name: string;
  price: number;
  available: number;
  total: number;
  blocks: string[];
}

export const matchesData: Match[] = [
  {
    id: '1',
    title: 'Bangladesh vs India - 1st ODI',
    team1: 'Bangladesh',
    team2: 'India',
    date: '2025-11-15',
    time: '14:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'upcoming',
    banner: '/placeholder.svg',
    categories: [
      {
        id: 'eastern-upper',
        name: 'Eastern Gallery Upper',
        price: 500,
        available: 120,
        total: 200,
        blocks: ['I', 'J', 'K', 'L', 'M', 'N']
      },
      {
        id: 'eastern-lower',
        name: 'Eastern Gallery Lower',
        price: 800,
        available: 80,
        total: 150,
        blocks: ['I', 'J', 'K', 'L', 'M', 'N']
      },
      {
        id: 'northern-upper',
        name: 'Northern Gallery Upper',
        price: 600,
        available: 90,
        total: 150,
        blocks: ['O', 'P', 'Q']
      },
      {
        id: 'shaheed-upper',
        name: 'Shaheed Abu Sayed Stand Upper',
        price: 1000,
        available: 50,
        total: 100,
        blocks: ['F', 'G', 'H']
      },
      {
        id: 'club-house-n',
        name: 'Club House (N) Shaheed Jewel Stand',
        price: 1500,
        available: 30,
        total: 80,
        blocks: ['T', 'U', 'V']
      },
      {
        id: 'grand-stand',
        name: 'Grand Stand Upper - Pavilion Building',
        price: 2000,
        available: 20,
        total: 60,
        blocks: ['Pavilion']
      }
    ]
  },
  {
    id: '2',
    title: 'Bangladesh vs Sri Lanka - T20',
    team1: 'Bangladesh',
    team2: 'Sri Lanka',
    date: '2025-11-20',
    time: '18:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'upcoming',
    banner: '/placeholder.svg',
    categories: [
      {
        id: 'eastern-upper',
        name: 'Eastern Gallery Upper',
        price: 400,
        available: 150,
        total: 200,
        blocks: ['I', 'J', 'K', 'L', 'M', 'N']
      },
      {
        id: 'northern-upper',
        name: 'Northern Gallery Upper',
        price: 500,
        available: 120,
        total: 150,
        blocks: ['O', 'P', 'Q']
      }
    ]
  },
  {
    id: '3',
    title: 'Bangladesh vs Pakistan - Test Match',
    team1: 'Bangladesh',
    team2: 'Pakistan',
    date: '2025-11-25',
    time: '10:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'upcoming',
    banner: '/placeholder.svg',
    categories: [
      {
        id: 'eastern-upper',
        name: 'Eastern Gallery Upper',
        price: 300,
        available: 180,
        total: 200,
        blocks: ['I', 'J', 'K', 'L', 'M', 'N']
      }
    ]
  },
  {
    id: '4',
    title: 'Bangladesh vs Australia - ODI Series',
    team1: 'Bangladesh',
    team2: 'Australia',
    date: '2025-12-01',
    time: '14:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'coming-soon',
    banner: '/placeholder.svg',
    categories: []
  },
  {
    id: '5',
    title: 'Bangladesh vs England - Test Series',
    team1: 'Bangladesh',
    team2: 'England',
    date: '2025-12-10',
    time: '10:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'coming-soon',
    banner: '/placeholder.svg',
    categories: []
  },
  {
    id: '6',
    title: 'Bangladesh vs New Zealand - T20',
    team1: 'Bangladesh',
    team2: 'New Zealand',
    date: '2025-12-15',
    time: '18:00',
    venue: 'Shere Bangla National Stadium',
    stadium: 'Mirpur, Dhaka',
    status: 'coming-soon',
    banner: '/placeholder.svg',
    categories: []
  }
];
