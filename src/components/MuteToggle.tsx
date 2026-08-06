import React, { useEffect, useState } from 'react';
import audioManager from '../audio/AudioManager';

/**
 * Simple mute toggle button.
 * Shows "Mute" when audio is unmuted and "Unmute" when muted.
 * Clicking the button toggles the mute state via AudioManager.
 */
export const MuteToggle: React.FC = () => {
  const [muted, setMuted] = useState<boolean>(false);

  // Sync initial mute state and subscribe to future changes
  useEffect(() => {
    // Ensure UI reflects current mute state even if it changed before mount
    setMuted(audioManager.isMuted());
    const unsubscribe = audioManager.subscribeMute((newMuted) => {
      setMuted(newMuted);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    // Toggle mute via AudioManager; UI will update via subscription
    audioManager.setMute(!muted);
  };

  return (
    <button onClick={handleToggle} aria-label="Toggle mute" type="button">
      {muted ? 'Unmute' : 'Mute'}
    </button>
  );
};
