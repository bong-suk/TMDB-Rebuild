import "./App.css";
import { MovieListProvider } from "./contexts/MovieListContext.jsx";
import AppRoutes from "./routes";
function App() {
  return (
    <>
      <MovieListProvider>
        <AppRoutes />
      </MovieListProvider>
    </>
  );
}

export default App;
