import { Outlet } from "react-router";

import { Header } from "../../shared/components/layout/Header";
import { Footer } from "../../shared/components/layout/Footer";

import "./MainLayout.css";

export function MainLayout() {
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="main-content" className="app-layout__content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
