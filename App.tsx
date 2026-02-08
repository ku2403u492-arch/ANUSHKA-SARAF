import React, { useState, useEffect } from 'react';
import { AppView, AppSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { speak } from './services/tts';

// Views
import { Onboarding } from './views/Onboarding';
import { Home } from './views/Home';
import { Contacts } from './views/Contacts';
import { Calling } from './views/Calling';
import { VoiceMessage } from './views/VoiceMessage';
import { Emergency } from './views/Emergency';

// Icons
import { AlertTriangle, Home as HomeIcon } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<AppView>(AppView.ONBOARDING);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Helper to construct dynamic Tailwind classes based on settings
  const getContainerClasses = () => {
    let classes = "h-full w-full overflow-hidden flex flex-col transition-colors duration-300 ";
    
    // Theme
    if (settings.theme === 'dark') classes += "bg-gray-900 text-white ";
    else if (settings.theme === 'cream') classes += "bg-[#FFFDD0] text-black ";
    else classes += "bg-white text-black ";

    // Font Weight
    if (settings.fontWeight === 'bold') classes += "font-bold ";
    else if (settings.fontWeight === 'extrabold') classes += "font-extrabold ";
    else classes += "font-normal ";

    // Text Size (Handled via style on root for scaling, but utility classes help)
    return classes;
  };

  // Calculate base font size for rem scaling
  const getBaseFontSize = () => {
    switch (settings.textSize) {
      case 'huge': return '24px';
      case 'extra-large': return '20px';
      case 'large': 
      default: return '16px';
    }
  };

  const commonProps = {
    setView,
    settings,
    updateSettings,
    playFeedback: (text: string) => speak(text, settings),
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.ONBOARDING:
        return <Onboarding {...commonProps} />;
      case AppView.HOME:
        return <Home {...commonProps} />;
      case AppView.CONTACTS:
        return <Contacts {...commonProps} onCall={(id) => {
            setActiveContactId(id);
            setView(AppView.CALLING);
        }} />;
      case AppView.CALLING:
        return <Calling {...commonProps} contactId={activeContactId} />;
      case AppView.VOICE_MESSAGE:
        return <VoiceMessage {...commonProps} />;
      case AppView.EMERGENCY:
        return <Emergency {...commonProps} />;
      default:
        return <Home {...commonProps} />;
    }
  };

  return (
    <div 
      className={getContainerClasses()} 
      style={{ fontSize: getBaseFontSize() }}
    >
      {/* Safe Area Top */}
      <div className="h-4 shrink-0" />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {renderView()}
      </main>

      {/* Persistent Footer (Only show if not onboarding and not emergency) */}
      {currentView !== AppView.ONBOARDING && currentView !== AppView.EMERGENCY && (
        <div className={`
           absolute bottom-0 left-0 right-0 p-4 pb-6 flex gap-4 z-40
           ${settings.theme === 'dark' ? 'bg-gray-900/90' : settings.theme === 'cream' ? 'bg-[#FFFDD0]/90' : 'bg-white/90'}
        `}>
          {currentView !== AppView.HOME && (
             <button
             onClick={() => {
                speak("Going Home", settings);
                setView(AppView.HOME);
             }}
             className={`
               flex-1 p-4 rounded-xl border-4 font-bold flex items-center justify-center gap-2
               ${settings.theme === 'dark' ? 'bg-gray-800 border-white text-white' : 'bg-gray-100 border-gray-800 text-black'}
             `}
           >
             <HomeIcon size={32} />
             <span>Home</span>
           </button>
          )}

          <button
            onClick={() => {
                speak("Emergency button pressed", settings);
                setView(AppView.EMERGENCY);
            }}
            className="flex-1 bg-red-600 text-white p-4 rounded-xl border-4 border-red-900 font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <AlertTriangle size={32} />
            <span>SOS</span>
          </button>
        </div>
      )}
    </div>
  );
}
