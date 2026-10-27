/**
 * Safe LocalStorage Utilities for StoiLab 10
 */

export const STORAGE_KEYS = {
  PROGRESS: 'stoilab_progress_v1',
  QUIZ_HISTORY: 'stoilab_quiz_history_v1',
  GAMIFICATION: 'stoilab_gamification_v1',
  LAB_STATE: 'stoilab_lab_state_v1',
  USER_SETTINGS: 'stoilab_user_settings_v1',
};

export const getItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[StoiLab] Failed to read ${key} from localStorage:`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[StoiLab] Failed to save ${key} to localStorage:`, error);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[StoiLab] Failed to remove ${key} from localStorage:`, error);
  }
};
