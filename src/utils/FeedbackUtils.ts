import Sound from 'react-native-sound';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Enable playback in silence mode
Sound.setCategory('Playback');

// Sound effects configuration
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// Sound effects
let colorSound: Sound | null = null;
let unlockSound: Sound | null = null;
let buttonSound: Sound | null = null;
let successSound: Sound | null = null;

// Initialize sounds
export const initializeSounds = () => {
  try {
    // Color selection sound
    colorSound = new Sound('color_select.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load color sound:', error);
      }
    });

    // Unlock sound
    unlockSound = new Sound('unlock.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load unlock sound:', error);
      }
    });

    // Button press sound
    buttonSound = new Sound('button_press.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load button sound:', error);
      }
    });

    // Success sound
    successSound = new Sound('success.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load success sound:', error);
      }
    });
  } catch (error) {
    console.log('Error initializing sounds:', error);
  }
};

// Play sound effects
export const playColorSound = () => {
  if (colorSound) {
    colorSound.play((success) => {
      if (!success) {
        console.log('Failed to play color sound');
      }
    });
  }
};

export const playUnlockSound = () => {
  if (unlockSound) {
    unlockSound.play((success) => {
      if (!success) {
        console.log('Failed to play unlock sound');
      }
    });
  }
};

export const playButtonSound = () => {
  if (buttonSound) {
    buttonSound.play((success) => {
      if (!success) {
        console.log('Failed to play button sound');
      }
    });
  }
};

export const playSuccessSound = () => {
  if (successSound) {
    successSound.play((success) => {
      if (!success) {
        console.log('Failed to play success sound');
      }
    });
  }
};

// Haptic feedback functions
export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  try {
    ReactNativeHapticFeedback.trigger(type, hapticOptions);
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};

export const triggerColorHaptic = () => {
  triggerHapticFeedback('light');
};

export const triggerUnlockHaptic = () => {
  triggerHapticFeedback('medium');
};

export const triggerButtonHaptic = () => {
  triggerHapticFeedback('light');
};

export const triggerSuccessHaptic = () => {
  triggerHapticFeedback('medium');
};

// Cleanup sounds
export const cleanupSounds = () => {
  if (colorSound) {
    colorSound.release();
    colorSound = null;
  }
  if (unlockSound) {
    unlockSound.release();
    unlockSound = null;
  }
  if (buttonSound) {
    buttonSound.release();
    buttonSound = null;
  }
  if (successSound) {
    successSound.release();
    successSound = null;
  }
}; 