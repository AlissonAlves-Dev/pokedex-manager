import { Outlet } from "react-router";

import { Header } from "../../shared/components/layout/Header";
import { Sidebar } from "../../shared/components/layout/Sidebar";
import { Footer } from "../../shared/components/layout/Footer";

export function MainLayout() {
  return (
    <>
      <Header />

      <div>
        <Sidebar />

        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
