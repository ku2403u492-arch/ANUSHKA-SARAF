export enum AppView {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  CONTACTS = 'CONTACTS',
  CALLING = 'CALLING',
  VOICE_MESSAGE = 'VOICE_MESSAGE',
  EMERGENCY = 'EMERGENCY',
  SUCCESS = 'SUCCESS' // Generic success screen
}

export type ThemeMode = 'light' | 'dark' | 'cream';
export type FontWeight = 'normal' | 'bold' | 'extrabold';
export type TextSize = 'large' | 'extra-large' | 'huge';

export interface AppSettings {
  theme: ThemeMode;
  fontWeight: FontWeight;
  textSize: TextSize;
  voiceFeedback: boolean; // Spoken system feedback
  voiceSpeed: number; // 0.8 (Slow) to 1.0 (Normal)
}

export interface Contact {
  id: string;
  name: string;
  relationship: string; // e.g., "Son", "Doctor"
  image: string;
  isEmergency?: boolean;
}

export interface ViewProps {
  setView: (view: AppView) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  playFeedback: (text: string) => void;
}
