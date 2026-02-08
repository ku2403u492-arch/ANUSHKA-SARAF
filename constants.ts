import { Contact, AppSettings } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'cream',
  fontWeight: 'bold',
  textSize: 'extra-large',
  voiceFeedback: true,
  voiceSpeed: 0.9,
};

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Martha',
    relationship: 'Daughter',
    image: 'https://picsum.photos/200/200?random=1',
    isEmergency: true,
  },
  {
    id: '2',
    name: 'Robert',
    relationship: 'Son',
    image: 'https://picsum.photos/200/200?random=2',
  },
  {
    id: '3',
    name: 'Dr. Smith',
    relationship: 'Doctor',
    image: 'https://picsum.photos/200/200?random=3',
    isEmergency: true,
  },
  {
    id: '4',
    name: 'Sarah',
    relationship: 'Neighbor',
    image: 'https://picsum.photos/200/200?random=4',
  },
];
