import "./App.css";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";
import AppRoutes from "./routes";
import Navbar from "./components/Layout.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <MovieListProvider>
        <AppRoutes />
      </MovieListProvider>
    </>
  );
}

export default App;
