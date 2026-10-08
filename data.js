/* Static data used by the NP pinning flow (copy taken verbatim from Figma). */
window.NPDATA = {
  cities: [
    { name: 'New Delhi' }, { name: 'Gurugram' }, { name: 'Noida' },
    { name: 'Mumbai', locked: true }, { name: 'Pune' }, { name: 'Bangalore' },
    { name: 'Ahmedabad' }, { name: 'Hyderabad' }
  ],
  localities: [
    { name: 'DLF Phase 1' }, { name: 'Sector 49' }, { name: 'Sohna Road' },
    { name: 'Golf Course Road', locked: true }, { name: 'MG Road' }, { name: 'Cyber City' },
    { name: 'Sector 56' }, { name: 'Udyog Vihar' }
  ],
  projects: [
    { id: 'escape', name: 'Unitech Escape', locality: 'Sector 49', city: 'Gurgaon', pinned: true },
    { id: 'harmony', name: 'Unitech Harmony', locality: 'Sector 49', city: 'Gurgaon' },
    { id: 'sky', name: 'Unitech Sky', locality: 'Boyalahalli', city: 'Gurgaon' }
  ],
  projectDetails: {
    config: '2, 3 BHK Apartments', mConfig: '2, 3 BHK apartments', price: '₹1.5 – 2.5 Cr',
    address: 'Nirvana Country, Sector 49, Dwarka Expressway, Gurugram'
  },
  recos: [
    { img: true, competition: 'No competition yet', dev: true },
    { img: false, competition: 'Low competition', dev: true },
    { img: true, competition: 'Crowded', dev: false },
    { img: false, competition: 'No competition yet', dev: true },
    { img: true, competition: 'Moderate competition', dev: true },
    { img: false, competition: 'Low competition', dev: false }
  ],
  mRecos: [
    { name: 'Godrej Meridien', config: '2, 3 BHK Apartments', loc: 'Sector 106, Dwarka Expressway', img: true, competition: 'No competition yet', dev: true },
    { name: 'DLF Crest', config: '2, 3 BHK Apartments', loc: 'Golf Course Road, Gurugram', img: false, competition: 'Low competition', dev: true },
    { name: 'Lodha Bellezza', config: '3, 4 BHK Apartments', loc: 'Sector 71, Gurugram', img: false, competition: 'Crowded', dev: false }
  ],
  pinnings: [
    { name: 'Bestech Sanskriti', loc: 'Sector 92, Gurugram', start: '01-06-26', ends: '12 days', status: 'Active', by: 'Jitesh Kumar', dur: '90 days', end: '21-12-2026', left: '12 days left' },
    { name: 'Emaar Digihub', loc: 'Sector 62, Gurugram', start: '15-09-26', ends: '46 days', status: 'Active', by: 'Jitesh Kumar', dur: '30 days', end: '21-12-2026', left: '30 days left', mStart: '15-09-2026' },
    { name: 'Godrej Aria', loc: 'Sector 79, Gurugram', start: '01-06-26', ends: '4 days', status: 'Ending soon', by: 'Jitesh Kumar', dur: '90 days', end: '01-10-2026', left: '4 days left', mStart: '01-07-26' },
    { name: 'M3M Capital', loc: 'Sector 113, Gurugram', start: '—', ends: '—', status: 'Pending approval', by: '—', dur: '60 days', end: '—' }
  ],
  configs: [
    { id: 'c1', bhk: '2 BHK', area: 1500, label: '2 BHK Apartment · 1,500 sq.ft', total: 15000000, rate: 10000 },
    { id: 'c2', bhk: '2 BHK', area: 1800, label: '2 BHK Apartment · 1,800 sq.ft', total: 17800000, rate: 9889 },
    { id: 'c3', bhk: '3 BHK', area: 2000, label: '3 BHK Apartment · 2,000 sq.ft', total: 20500000, rate: 10250 },
    { id: 'c4', bhk: '3 BHK', area: 2400, label: '3 BHK Apartment · 2,400 sq.ft', total: 25000000, rate: 10417 }
  ],
  team: [
    { id: 'jk', initials: 'JK', name: 'Jitesh Kumar', meta: 'You · Admin · 4 pinnings', photo: true },
    { id: 'aj', initials: 'AJ', name: 'Aakriti Jain', meta: 'Sub-broker · 4 pinnings' },
    { id: 'rm', initials: 'RM', name: 'Rohit Mehra', meta: 'Sub-broker · 2 pinnings' }
  ],
  /* Demo phone numbers that trigger the designed sub-broker validation states */
  demoPhones: { inTeam: '9811111111', linked: '9822222222', ok: '9899897898' },
  takenEmail: 'ramlal@turboprop.com',
  propertyTypes: ['Apartment', 'Independent floor', 'Independent house', 'Villa', 'Duplex', 'Plot'],
  bhks: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK']
};
