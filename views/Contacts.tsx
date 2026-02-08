import React, { useEffect } from 'react';
import { AppView, ViewProps } from '../types';
import { MOCK_CONTACTS } from '../constants';
import { speak } from '../services/tts';
import { ArrowLeft, User } from 'lucide-react';
import { BigButton } from '../components/BigButton';

export const Contacts: React.FC<ViewProps & { onCall: (id: string) => void }> = ({ setView, settings, onCall }) => {
  
  useEffect(() => {
    speak("Who would you like to call?", settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => setView(AppView.HOME)}
          className={`p-4 border-4 rounded-xl ${settings.theme === 'dark' ? 'border-white text-white' : 'border-black text-black'}`}
          aria-label="Go Back"
        >
          <ArrowLeft size={32} />
        </button>
        <h1>Contacts</h1>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-4 pb-32">
        {MOCK_CONTACTS.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onCall(contact.id)}
            className={`
              flex items-center gap-6 p-4 border-4 rounded-2xl w-full text-left
              transition-transform active:scale-95
              ${contact.isEmergency ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 
                settings.theme === 'dark' ? 'border-white bg-gray-800' : 'border-black bg-white'}
            `}
          >
            <img 
              src={contact.image} 
              alt={contact.relationship} 
              className="w-24 h-24 rounded-full object-cover border-2 border-current"
            />
            <div className="flex flex-col">
              <span className="text-[1.2em] font-extrabold uppercase tracking-wide">
                {contact.relationship}
              </span>
              <span className="opacity-80 font-normal">
                {contact.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
