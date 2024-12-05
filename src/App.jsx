import "./App.css";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";
import AppRoutes from "./routes";
import Navbar from "./components/Layout.jsx";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <MovieListProvider>
        <AppRoutes />
      </MovieListProvider>
    </>
  );
}

export default App;
