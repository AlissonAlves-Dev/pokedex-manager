import { useTheme } from "../../../../app/providers/theme/UseTheme";

import "./ThemeToggle.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";
  const actionTitle = isDarkTheme ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Alternar entre tema claro e escuro"
      aria-pressed={isDarkTheme}
      title={actionTitle}
      onClick={toggleTheme}
    >
      <svg
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        {isDarkTheme ? (
          <>
            <circle cx="12" cy="12" r="4" />

            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.42 1.42" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m4.93 19.07 1.42-1.42" />
            <path d="m17.66 6.34 1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        )}
      </svg>
    </button>
  );
}
