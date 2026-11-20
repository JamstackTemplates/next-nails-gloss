'use client';

import { useTheme, type Theme } from 'jamstacks';

const LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

function deviceTheme(): 'light' | 'dark' {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function nextTheme(theme: Theme, device: 'light' | 'dark'): Theme {
  const opposite = device === 'dark' ? 'light' : 'dark';
  if (theme === 'system') return opposite;
  return theme === opposite ? device : 'system';
}

/**
 * Tri-state Light / Dark / System theme toggle powered by jamstacks' ThemeProvider. The icon is a
 * single drop of lacquer: empty for light, full for dark, half-poured for system.
 */
export function BottleThemeToggle() {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();
  const name = `Theme: ${LABELS[theme]}`;

  return (
    <button
      type="button"
      aria-label={name}
      title={name}
      disabled={!mounted}
      data-theme-preference={theme}
      onClick={() => setTheme(nextTheme(theme, theme === 'system' ? resolvedTheme : deviceTheme()))}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink disabled:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="theme-drop">
            <path d="M12 3.5C9.2 8 6.5 11 6.5 14.6a5.5 5.5 0 0 0 11 0C17.5 11 14.8 8 12 3.5Z" />
          </clipPath>
        </defs>
        {theme === 'dark' ? (
          <rect width="24" height="24" fill="currentColor" clipPath="url(#theme-drop)" />
        ) : theme === 'system' ? (
          <rect x="0" y="13" width="24" height="11" fill="currentColor" clipPath="url(#theme-drop)" />
        ) : null}
        <path
          d="M12 3.5C9.2 8 6.5 11 6.5 14.6a5.5 5.5 0 0 0 11 0C17.5 11 14.8 8 12 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
