
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import FileManagerPage from './components/FileManagerPage';
import { AppState } from './types';
import { ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.LANDING);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSecureScreen, setIsSecureScreen] = useState(true);

  useEffect(() => {
    const checkScreenSecurity = () => {
      // Basic check for "Main Screen" - in a real browser we check screen coordinates and extended status
      const isExtended = (window.screen as any).isExtended;
      const isSecondary = window.screenX > window.screen.width || window.screenX < 0;
      
      // If the window is on a secondary monitor or extended screen, we flag it
      if (isExtended || isSecondary) {
        setIsSecureScreen(false);
      } else {
        setIsSecureScreen(true);
      }
    };

    const interval = setInterval(checkScreenSecurity, 1000);
    window.addEventListener('resize', checkScreenSecurity);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkScreenSecurity);
    };
  }, []);

  const handleLaunch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(AppState.FILE_MANAGER);
      setIsTransitioning(false);
    }, 800);
  };

  const handleBack = () => {
    setCurrentScreen(AppState.LANDING);
  };

  return (
    <div className={`min-h-screen bg-[#f4f1ea] transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {!isSecureScreen && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-12 text-center">
          <ShieldAlert size={120} className="text-red-600 mb-8 animate-pulse" />
          <h1 className="marker text-6xl text-white mb-4">SECURITY BREACH</h1>
          <p className="shadows text-3xl text-gray-400 italic">
            "Xavier OS is only viewable on the primary secure display. Remote views and secondary monitors are blocked."
          </p>
          <button 
            onClick={() => setIsSecureScreen(true)}
            className="mt-12 marker-btn bg-white text-black hover:bg-gray-200"
          >
            RE-AUTHENTICATE DISPLAY
          </button>
        </div>
      )}

      {currentScreen === AppState.LANDING ? (
        <LandingPage onLaunch={handleLaunch} />
      ) : (
        <FileManagerPage onBack={handleBack} />
      )}
      
      {/* Global Overlay for transition effect */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
           <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 border-8 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
              <span className="marker text-gray-800 text-4xl">INDEXING STORAGE...</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
