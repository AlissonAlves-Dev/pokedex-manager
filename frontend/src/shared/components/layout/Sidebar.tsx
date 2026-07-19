import { NavLink } from "react-router";

import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav aria-label="Navegação principal">
        <ul className="app-sidebar__list">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "app-sidebar__link app-sidebar__link--active"
                  : "app-sidebar__link"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pokemon"
              className={({ isActive }) =>
                isActive
                  ? "app-sidebar__link app-sidebar__link--active"
                  : "app-sidebar__link"
              }
            >
              Pokémon
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
