import { NavLink } from "react-router";

export function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "navigation-link active" : "navigation-link"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pokemon"
              className={({ isActive }) =>
                isActive ? "navigation-link active" : "navigation-link"
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
