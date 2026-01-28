/**
 * Local Storage Utilities
 *
 * Handles persistence of test sessions and results for:
 * - Pause and resume functionality
 * - Storing completed results
 */

import { TestSession, TestResults } from '../types';

const STORAGE_KEYS = {
  CURRENT_SESSION: 'big5_current_session',
  COMPLETED_RESULTS: 'big5_completed_results',
  SESSION_HISTORY: 'big5_session_history',
} as const;

/**
 * Save the current test session (for pause/resume).
 */
export function saveSession(session: TestSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
}

/**
 * Load the current test session.
 */
export function loadSession(): TestSession | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load session:', error);
    return null;
  }
}

/**
 * Clear the current session (when test is completed or abandoned).
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

/**
 * Save completed test results.
 */
export function saveResults(results: TestResults): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED_RESULTS,
      JSON.stringify(results),
    );

    // Also add to history
    const history = loadResultsHistory();
    history.push(results);
    localStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save results:', error);
  }
}

/**
 * Load the most recent completed results.
 */
export function loadResults(): TestResults | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_RESULTS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load results:', error);
    return null;
  }
}

/**
 * Load all historical results.
 */
export function loadResultsHistory(): TestResults[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SESSION_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load results history:', error);
    return [];
  }
}

/**
 * Clear all stored data.
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_RESULTS);
    localStorage.removeItem(STORAGE_KEYS.SESSION_HISTORY);
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}

/**
 * Check if there's a session in progress.
 */
export function hasActiveSession(): boolean {
  const session = loadSession();
  return session !== null && session.currentQuestionIndex < 120;
}

/**
 * Check if there are completed results available.
 */
export function hasCompletedResults(): boolean {
  const results = loadResults();
  return results !== null;
}
