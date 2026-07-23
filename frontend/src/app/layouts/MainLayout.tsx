import { Outlet } from "react-router";

import { Header } from "../../shared/components/layout/Header";
import { Sidebar } from "../../shared/components/layout/Sidebar";
import { Footer } from "../../shared/components/layout/Footer";

import "./MainLayout.css";

export function MainLayout() {
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <Header />

      <div className="app-layout__body">
        <Sidebar />

        <main id="main-content" className="app-layout__content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
