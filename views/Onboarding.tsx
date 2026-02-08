import React, { useState, useEffect } from 'react';
import { AppView, ViewProps, ThemeMode, TextSize } from '../types';
import { BigButton } from '../components/BigButton';
import { Check, User, Eye, ArrowRight } from 'lucide-react';
import { speak } from '../services/tts';

export const Onboarding: React.FC<ViewProps> = ({ setView, settings, updateSettings }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const welcomeText = "Welcome to Clarity Connect. Let's set up your display.";
    speak(welcomeText, settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
      const prompts = [
        "", // step 0 done
        "Choose a background color that is easy on your eyes.",
        "Choose a text size that is easy to read.",
        "Setup complete."
      ];
      speak(prompts[step + 1], settings);
    } else {
      speak("Setup complete. Taking you to the home screen.", settings);
      setView(AppView.HOME);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-6 animate-fade-in">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="mb-8">Setup Step {step + 1} of 3</h1>

        {step === 0 && (
          <div className="w-full space-y-6">
            <h2 className="mb-4">Who is setting this up?</h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              <BigButton
                label="I am the User"
                icon={<User size={48} />}
                onClick={handleNext}
                settings={settings}
                variant="primary"
                fullWidth
              />
              <BigButton
                label="I am a Family Member"
                subLabel="Helping with setup"
                icon={<User size={48} />}
                onClick={handleNext}
                settings={settings}
                variant="secondary"
                fullWidth
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="w-full space-y-6">
            <h2 className="mb-4">Select Background</h2>
            <div className="grid grid-cols-1 gap-4 w-full">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`p-6 border-4 rounded-xl text-black bg-white flex items-center justify-between ${settings.theme === 'light' ? 'border-blue-600 ring-4 ring-blue-300' : 'border-gray-300'}`}
              >
                <span>Light Mode</span>
                {settings.theme === 'light' && <Check size={32} />}
              </button>
              <button
                onClick={() => updateSettings({ theme: 'cream' })}
                className={`p-6 border-4 rounded-xl text-black bg-[#FFFDD0] flex items-center justify-between ${settings.theme === 'cream' ? 'border-blue-600 ring-4 ring-blue-300' : 'border-gray-300'}`}
              >
                <span>Cream Mode (Eye Friendly)</span>
                {settings.theme === 'cream' && <Check size={32} />}
              </button>
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`p-6 border-4 rounded-xl text-white bg-gray-900 flex items-center justify-between ${settings.theme === 'dark' ? 'border-blue-600 ring-4 ring-blue-300' : 'border-gray-600'}`}
              >
                <span>Dark Mode</span>
                {settings.theme === 'dark' && <Check size={32} />}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full space-y-6">
            <h2 className="mb-4">Select Text Size</h2>
            <div className="flex flex-col gap-4 w-full">
              {(['large', 'extra-large', 'huge'] as TextSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ textSize: size })}
                  className={`
                    p-6 border-4 rounded-xl w-full text-center
                    ${settings.textSize === size ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}
                    ${settings.theme === 'dark' && settings.textSize !== size ? 'bg-gray-800 text-white border-gray-600' : ''}
                    ${settings.theme === 'dark' && settings.textSize === size ? 'bg-blue-900 text-white' : ''}
                  `}
                >
                   <span className={
                     size === 'large' ? 'text-2xl' : size === 'extra-large' ? 'text-3xl' : 'text-4xl'
                   }>
                     {size === 'large' ? 'Large Text' : size === 'extra-large' ? 'Extra Large' : 'Huge Text'}
                   </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {step > 0 && (
        <BigButton
          label="Next Step"
          icon={<ArrowRight size={48} />}
          onClick={handleNext}
          settings={settings}
          variant="primary"
          fullWidth
        />
      )}
    </div>
  );
};
