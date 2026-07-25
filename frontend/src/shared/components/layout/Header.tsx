import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

import "./Header.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function handleToggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="app-header">
      <div className="app-header__content">
        <Link
          className="app-header__brand"
          to="/"
          aria-label="Ir para a página inicial"
          onClick={handleCloseMenu}
        >
          <span className="app-header__title">PokéDex Manager</span>

          <span className="app-header__subtitle">Explore o mundo Pokémon</span>
        </Link>

        <button
          ref={menuButtonRef}
          className="app-header__menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={
            isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
          }
          onClick={handleToggleMenu}
        >
          <span className="app-header__menu-icon" aria-hidden="true">
            <span className="app-header__menu-line" />
            <span className="app-header__menu-line" />
            <span className="app-header__menu-line" />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={
            isMenuOpen
              ? "app-header__navigation app-header__navigation--open"
              : "app-header__navigation"
          }
          aria-label="Navegação principal"
        >
          <ul className="app-header__navigation-list">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "app-header__navigation-link app-header__navigation-link--active"
                    : "app-header__navigation-link"
                }
                to="/"
                end
                onClick={handleCloseMenu}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "app-header__navigation-link app-header__navigation-link--active"
                    : "app-header__navigation-link"
                }
                to="/pokemon"
                onClick={handleCloseMenu}
              >
                Pokémon
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
