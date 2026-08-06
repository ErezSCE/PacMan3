import React, { useEffect, useState } from 'react';
import audioManager from '../audio/AudioManager';

/**
 * Simple mute toggle button.
 * Shows "Mute" when audio is unmuted and "Unmute" when muted.
 * Clicking the button toggles the mute state via AudioManager.
 */
export const MuteToggle: React.FC = () => {
  const [muted, setMuted] = useState<boolean>(audioManager.isMuted());

  // Keep local state in sync if mute is changed elsewhere
  useEffect(() => {
    const interval = setInterval(() => {
      const current = audioManager.isMuted();
      setMuted(current);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const newMute = !muted;
    audioManager.setMute(newMute);
    setMuted(newMute);
  };

  return (
    <button onClick={handleToggle} aria-label="Toggle mute" type="button">
      {muted ? 'Unmute' : 'Mute'}
    </button>
  );
};
