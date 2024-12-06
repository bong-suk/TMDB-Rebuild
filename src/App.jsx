import "./App.css";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <MovieListProvider>
        <AppRoutes />
      </MovieListProvider>
    </>
  );
}

export default App;
