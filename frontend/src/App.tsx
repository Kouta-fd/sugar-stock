import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/user-login`} element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
