import { AppSettings } from '../types';

let synth: SpeechSynthesis | null = null;

if (typeof window !== 'undefined') {
  synth = window.speechSynthesis;
}

export const speak = (text: string, settings: AppSettings) => {
  if (!synth || !settings.voiceFeedback) return;

  // Cancel existing speech to avoid overlap
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Attempt to find a clear, local voice if possible, otherwise default
  const voices = synth.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.localService) || voices[0];
  
  if (preferredVoice) utterance.voice = preferredVoice;
  
  utterance.rate = settings.voiceSpeed;
  utterance.pitch = 1.0;
  
  synth.speak(utterance);
};

export const stopSpeech = () => {
  if (synth) synth.cancel();
};
