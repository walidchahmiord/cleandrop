import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Ambient nature sound URL (royalty-free)
const AMBIENT_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3';

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [audio] = useState(() => {
    if (typeof window !== 'undefined') {
      const audioElement = new Audio(AMBIENT_SOUND_URL);
      audioElement.loop = true;
      audioElement.volume = 0.3;
      return audioElement;
    }
    return null;
  });

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
