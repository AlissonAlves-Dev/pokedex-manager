import { Link } from "react-router";

import "./Header.css";

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__content">
        <Link
          className="app-header__brand"
          to="/"
          aria-label="Ir para a página inicial"
        >
          <span className="app-header__title">PokéDex Manager</span>

          <span className="app-header__subtitle">Explore o mundo Pokémon</span>
        </Link>
      </div>
    </header>
  );
}
