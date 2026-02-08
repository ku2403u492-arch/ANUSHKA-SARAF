import React, { useEffect } from 'react';
import { AppView, ViewProps } from '../types';
import { MOCK_CONTACTS } from '../constants';
import { speak } from '../services/tts';
import { PhoneOff, Volume2 } from 'lucide-react';
import { BigButton } from '../components/BigButton';

interface CallingProps extends ViewProps {
  contactId: string | null;
}

export const Calling: React.FC<CallingProps> = ({ setView, settings, contactId }) => {
  const contact = MOCK_CONTACTS.find(c => c.id === contactId) || MOCK_CONTACTS[0];

  useEffect(() => {
    if (contact) {
      speak(`Calling ${contact.relationship} ${contact.name}`, settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  return (
    <div className="flex flex-col h-full p-4 items-center justify-between pb-32">
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-6">
        <img 
          src={contact.image} 
          alt={contact.name} 
          className="w-48 h-48 rounded-full border-8 border-current object-cover animate-pulse"
        />
        <div className="text-center">
          <h2 className="opacity-70 text-[0.8em]">Calling...</h2>
          <h1 className="text-[1.5em] leading-tight">{contact.relationship}</h1>
          <h3 className="text-[1em] font-normal">{contact.name}</h3>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <BigButton
          label="Speaker"
          icon={<Volume2 size={48} />}
          onClick={() => speak("Speaker mode on", settings)}
          settings={settings}
          variant="secondary"
        />
        <BigButton
          label="End Call"
          icon={<PhoneOff size={48} />}
          onClick={() => {
            speak("Call ended", settings);
            setView(AppView.HOME);
          }}
          settings={settings}
          variant="danger"
        />
      </div>
    </div>
  );
};
