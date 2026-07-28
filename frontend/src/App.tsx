import { ThemeProvider } from "./app/providers/theme/ThemeProvider";
import { AppRouter } from "./app/routes/AppRouter";

export function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}
