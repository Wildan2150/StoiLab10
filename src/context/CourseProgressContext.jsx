import { useState, useEffect, useMemo, useCallback } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { COURSE_CHAPTERS } from '../data/courseChapters';
import { BADGES } from '../data/badges';
import { CourseProgressContext } from './CourseContextInstance';

const DEFAULT_PROGRESS = {
  completedChapters: [],
  currentChapter: 'ch1',
  milestoneProgress: {
    '1.1': true // First introductory checkpoint checked by default for a warm welcome
  }
};

const DEFAULT_GAMIFICATION = {
  xp: 50,
  badges: [],
  currentRank: 'Peneliti Pemula'
};

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  showHints: true
};

export function CourseProgressProvider({ children }) {
  const [progress, setProgress] = useState(() =>
    getItem(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS)
  );

  const [gamification, setGamification] = useState(() =>
    getItem(STORAGE_KEYS.GAMIFICATION, DEFAULT_GAMIFICATION)
  );

  const [userSettings, setUserSettings] = useState(() =>
    getItem(STORAGE_KEYS.USER_SETTINGS, DEFAULT_SETTINGS)
  );

  // Sync to localStorage
  useEffect(() => {
    setItem(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  useEffect(() => {
    setItem(STORAGE_KEYS.GAMIFICATION, gamification);
  }, [gamification]);

  useEffect(() => {
    setItem(STORAGE_KEYS.USER_SETTINGS, userSettings);
  }, [userSettings]);

  // Actions
  const setCurrentChapter = useCallback((chapterId) => {
    setProgress((prev) => ({
      ...prev,
      currentChapter: chapterId
    }));
  }, []);

  const toggleMilestone = useCallback((milestoneId) => {
    setProgress((prev) => {
      const nextMilestones = {
        ...prev.milestoneProgress,
        [milestoneId]: !prev.milestoneProgress[milestoneId]
      };

      // If completing milestone, award 15 XP
      if (!prev.milestoneProgress[milestoneId]) {
        setGamification((g) => ({
          ...g,
          xp: g.xp + 15
        }));
      }

      return {
        ...prev,
        milestoneProgress: nextMilestones
      };
    });
  }, []);

  const completeChapter = useCallback((chapterId) => {
    setProgress((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId]
      };
    });

    setGamification((prev) => ({
      ...prev,
      xp: prev.xp + 50
    }));
  }, []);

  const addXP = useCallback((amount) => {
    setGamification((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  }, []);

  const unlockBadge = useCallback((badgeId) => {
    setGamification((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      const foundBadge = BADGES.find((b) => b.id === badgeId);
      const bonusXP = foundBadge ? foundBadge.xpReward : 50;
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
        xp: prev.xp + bonusXP
      };
    });
  }, []);

  const updateUserSettings = useCallback((newSettings) => {
    setUserSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    setGamification(DEFAULT_GAMIFICATION);
  }, []);

  // Compute overall percentage progress
  const overallProgressPercentage = useMemo(() => {
    const totalSections = COURSE_CHAPTERS.reduce(
      (sum, ch) => sum + ch.sections.length,
      0
    );
    const completedCount = Object.values(progress.milestoneProgress).filter(Boolean).length;
    if (totalSections === 0) return 0;
    return Math.min(Math.round((completedCount / totalSections) * 100), 100);
  }, [progress.milestoneProgress]);

  const value = useMemo(
    () => ({
      progress,
      gamification,
      userSettings,
      overallProgressPercentage,
      setCurrentChapter,
      toggleMilestone,
      completeChapter,
      addXP,
      unlockBadge,
      updateUserSettings,
      resetProgress
    }),
    [
      progress,
      gamification,
      userSettings,
      overallProgressPercentage,
      setCurrentChapter,
      toggleMilestone,
      completeChapter,
      addXP,
      unlockBadge,
      updateUserSettings,
      resetProgress
    ]
  );

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}
